const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ChatMessage = require('../models/ChatMessage');
const User = require('../models/User');

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

    const senderObj = toObjectId(senderId);
    const receiverObj = toObjectId(receiverId);

    const messages = await ChatMessage.find({
      $or: [
        { senderId: senderObj, receiverId: receiverObj },
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

    const receiverObj = toObjectId(receiverId);
    const messages = await ChatMessage.find({ receiverId: receiverObj });
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

module.exports = router;
