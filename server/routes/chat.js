const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ChatMessage = require('../models/ChatMessage');
const User = require('../models/User');
const webpush = require('web-push');
const PushSubscription = require('../models/PushSubscription');

const publicVapidKey = process.env.VITE_VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

if (publicVapidKey && privateVapidKey) {
  webpush.setVapidDetails(
    'mailto:inquiryrbcimport@gmail.com',
    publicVapidKey,
    privateVapidKey
  );
} else {
  console.warn('VAPID keys not configured in chat.js');
}

// Helper to convert to ObjectId safely
const toObjectId = (id) => {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch (err) {
    return id;
  }
};

// GET /api/chat/messages
// Retrieve messages exchanged between senderId and receiverId
router.get('/messages', async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    if (!senderId || !receiverId) {
      return res.status(400).json({ success: false, message: 'senderId and receiverId are required' });
    }

    const senderStr = String(senderId);
    const receiverStr = String(receiverId);
    const senderObj = toObjectId(senderId);
    const receiverObj = toObjectId(receiverId);

    const messages = await ChatMessage.find({
      $or: [
        { senderId: senderStr, receiverId: receiverStr },
        { senderId: senderObj, receiverId: receiverObj },
        { senderId: receiverStr, receiverId: senderStr },
        { senderId: receiverObj, receiverId: senderObj }
      ]
    }).sort({ createdAt: 1 });

    res.json({
      success: true,
      messages
    });
  } catch (error) {
    console.error('Fetch chat messages error:', error);
    res.status(500).json({ success: false, message: 'Server error. Could not retrieve messages.' });
  }
});

// GET /api/chat/notifications
// Get list of sender IDs who have sent messages to the specified receiver
router.get('/notifications', async (req, res) => {
  try {
    const { receiverId } = req.query;
    if (!receiverId) {
      return res.status(400).json({ success: false, message: 'receiverId is required' });
    }

    const receiverStr = String(receiverId);
    const receiverObj = toObjectId(receiverId);

    const messages = await ChatMessage.find({
      $or: [
        { receiverId: receiverStr },
        { receiverId: receiverObj }
      ],
      isRead: false
    });
    const senderIds = [...new Set(messages.map(m => m.senderId.toString()))];

    res.json({
      success: true,
      senderIds
    });
  } catch (error) {
    console.error('Fetch chat notifications error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// POST /api/chat/send
// Send a new message
router.post('/send', async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;
    if (!senderId || !receiverId || !text || !text.trim()) {
      return res.status(400).json({ success: false, message: 'senderId, receiverId, and non-empty text are required' });
    }

    const newMessage = new ChatMessage({
      senderId,
      receiverId,
      text: text.trim()
    });

    await newMessage.save();

    // Trigger Push Notification asynchronously
    try {
      // Find the receiver user to get their email
      const receiverObj = toObjectId(receiverId);
      const receiver = await User.findById(receiverObj) || await User.findOne({ email: receiverId });
      
      if (receiver && receiver.email) {
        // Find their push subscription
        const sub = await PushSubscription.findOne({ userEmail: receiver.email.toLowerCase().trim() });
        if (sub) {
          // Find sender name for notification
          const senderObj = toObjectId(senderId);
          const sender = await User.findById(senderObj) || await User.findOne({ email: senderId });
          const senderName = sender ? sender.name : 'Someone';
          
          const pushPayload = JSON.stringify({
            title: `New message from ${senderName}`,
            body: text.trim().length > 50 ? text.trim().substring(0, 50) + '...' : text.trim(),
            url: '/chat',
            icon: '/logo_emblem.png'
          });

          await webpush.sendNotification(
            { endpoint: sub.endpoint, keys: sub.keys },
            pushPayload
          ).catch(async (err) => {
            if (err.statusCode === 404 || err.statusCode === 410) {
              await PushSubscription.deleteOne({ _id: sub._id });
            }
          });
        }
      }
    } catch (pushErr) {
      console.error('Failed to send chat push notification:', pushErr);
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      chatMessage: newMessage
    });
  } catch (error) {
    console.error('Send chat message error:', error);
    res.status(500).json({ success: false, message: 'Server error. Could not send message.' });
  }
});


// POST /api/chat/read
// Mark all messages from sender to receiver as read
router.post('/read', async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    if (!senderId || !receiverId) {
      return res.status(400).json({ success: false, message: 'senderId and receiverId are required' });
    }

    const senderStr = String(senderId);
    const receiverStr = String(receiverId);
    const senderObj = toObjectId(senderId);
    const receiverObj = toObjectId(receiverId);

    await ChatMessage.updateMany(
      {
        $or: [
          { senderId: senderStr, receiverId: receiverStr },
          { senderId: senderObj, receiverId: receiverObj }
        ],
        isRead: false
      },
      { $set: { isRead: true } }
    );

    res.json({ success: true, message: 'Messages marked as read' });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
