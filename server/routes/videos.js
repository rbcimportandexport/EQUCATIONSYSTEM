const express = require('express');
const router = express.Router();
const db = require('../utils/db');

// ─── GET /api/videos ──────────────────────────────────────────────────────────
// Retrieve list of all uploaded custom videos
router.get('/', async (req, res) => {
  try {
    const videos = await db.getCustomVideos();
    res.json({
      success: true,
      count: videos.length,
      data: videos.map(v => ({
        id: v.id || v._id,
        lessonId: v.lessonId,
        moduleId: v.moduleId,
        title: v.title,
        duration: v.duration,
        uploadedAt: v.uploadedAt,
        // Omit heavy videoData base64 payload to keep list size fast
        hasVideoData: !!v.videoData,
        thumbnailData: v.thumbnailData
      }))
    });
  } catch (error) {
    console.error('Fetch videos error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch videos' });
  }
});

// ─── GET /api/videos/lesson/:lessonId ─────────────────────────────────────────
// Retrieve a specific custom video for a lesson including full payload
router.get('/lesson/:lessonId', async (req, res) => {
  try {
    const video = await db.getCustomVideoByLesson(req.params.lessonId);
    if (!video) {
      return res.status(404).json({ success: false, message: 'No custom video found for this lesson' });
    }
    res.json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Fetch lesson video error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving video' });
  }
});

// ─── POST /api/videos/upload ──────────────────────────────────────────────────
// Upload custom video and thumbnail for a lesson (saves to MongoDB / Fallback JSON)
router.post('/upload', async (req, res) => {
  try {
    const { lessonId, moduleId, title, videoData, thumbnailData, duration } = req.body;

    if (!lessonId || !moduleId || !title || !videoData || !thumbnailData) {
      return res.status(400).json({
        success: false,
        message: 'lessonId, moduleId, title, videoData, and thumbnailData are all required.'
      });
    }

    const savedVideo = await db.saveCustomVideo({
      lessonId,
      moduleId,
      title,
      videoData,
      thumbnailData,
      duration: duration ? parseInt(duration) : 120
    });

    res.json({
      success: true,
      message: 'Video and thumbnail uploaded successfully to MongoDB/Database!',
      data: {
        id: savedVideo.id || savedVideo._id,
        lessonId: savedVideo.lessonId,
        moduleId: savedVideo.moduleId,
        title: savedVideo.title,
        duration: savedVideo.duration
      }
    });

  } catch (error) {
    console.error('Video upload error:', error);
    res.status(500).json({ success: false, message: 'Failed to save video to database' });
  }
});

module.exports = router;
