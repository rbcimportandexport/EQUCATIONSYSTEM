const mongoose = require('mongoose');

const AccessCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    default: 'RBC9988'
  },
  isActive: {
    type: Boolean,
    default: false
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AccessCode', AccessCodeSchema);
