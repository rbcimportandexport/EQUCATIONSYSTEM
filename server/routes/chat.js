const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');
const User = require('../models/User');

// GET /api/chat/messages
// Retrieve messages exchanged between senderId and receiverId
router.get('/messages', async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    if (!senderId || !receiverId) {
      return res.status(400).json({ success: false, message: 'senderId and receiverId are required' });
    }

    const messages = await ChatMessage.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
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
