const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  id: {
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
  description: String,
  duration: Number,
  order: {
    type: Number,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lesson', LessonSchema);
