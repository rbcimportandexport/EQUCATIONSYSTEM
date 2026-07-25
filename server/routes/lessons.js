const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');

// ─── GET /api/lessons ─────────────────────────────────────────────────────────
// Retrieve all lessons from MongoDB Atlas
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find({}).sort({ order: 1 });
    res.json({
      success: true,
      data: lessons
    });
  } catch (error) {
    console.error('Fetch lessons error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch lessons' });
  }
});

// ─── POST /api/lessons/save ───────────────────────────────────────────────────
// Create or update a lesson in MongoDB Atlas (upsert based on ID)
router.post('/save', async (req, res) => {
  try {
    const lessonData = req.body;
    if (!lessonData.id || !lessonData.moduleId || !lessonData.title) {
      return res.status(400).json({
        success: false,
        message: 'id, moduleId, and title are required fields.'
      });
    }

    const savedLesson = await Lesson.findOneAndUpdate(
      { id: lessonData.id },
      { ...lessonData, updatedAt: Date.now() },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: 'Lesson successfully saved to MongoDB Atlas!',
      data: savedLesson
    });
  } catch (error) {
    console.error('Save lesson error:', error);
    res.status(500).json({ success: false, message: 'Failed to save lesson to database' });
  }
});

// ─── DELETE /api/lessons/:id ──────────────────────────────────────────────────
// Delete a lesson from MongoDB Atlas by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Lesson.findOneAndDelete({ id: req.params.id });
    res.json({
      success: true,
      message: 'Lesson deleted successfully from MongoDB Atlas!',
      data: result
    });
  } catch (error) {
    console.error('Delete lesson error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete lesson' });
  }
});

module.exports = router;
