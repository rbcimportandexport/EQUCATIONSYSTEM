const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  lessonId: {
    type: String,
    required: true,
    unique: true
  },
  moduleId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  videoData: {
    type: String, // Base64 encoding of high-quality video
    required: true
  },
  thumbnailData: {
    type: String, // Base64 encoding of thumbnail image
    required: true
  },
  duration: {
    type: Number,
    default: 120 // mock duration
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Video', VideoSchema);
