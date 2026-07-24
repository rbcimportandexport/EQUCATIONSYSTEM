const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const useJsonDb = () => process.env.USE_JSON_DB === 'true';
const jsonDbPath = path.join(__dirname, '../db.json');

const getJsonUsers = () => {
  if (!fs.existsSync(jsonDbPath)) {
    fs.writeFileSync(jsonDbPath, JSON.stringify([]));
  }
  try {
    return JSON.parse(fs.readFileSync(jsonDbPath, 'utf8'));
  } catch {
    return [];
  }
};

const saveJsonUsers = (users) => {
  fs.writeFileSync(jsonDbPath, JSON.stringify(users, null, 2));
};

const db = {
  findUserByEmail: async (email) => {
    if (useJsonDb()) {
      const users = getJsonUsers();
      return users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }
    return await User.findOne({ email: email.toLowerCase() });
  },

  findUserById: async (id) => {
    if (useJsonDb()) {
      const users = getJsonUsers();
      return users.find(u => u.id === id);
    }
    return await User.findById(id);
  },

  createUser: async (userData) => {
    if (useJsonDb()) {
      const users = getJsonUsers();
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        phone: userData.phone || '',
        country: userData.country || 'India',
        role: userData.role || 'student',
        isActive: true,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      saveJsonUsers(users);
      return newUser;
    }
    return await User.create(userData);
  },

  updateUser: async (id, updateData) => {
    if (useJsonDb()) {
      const users = getJsonUsers();
      const idx = users.findIndex(u => u.id === id);
      if (idx === -1) return null;
      
      if (updateData.password) {
        const salt = await bcrypt.genSalt(12);
        updateData.password = await bcrypt.hash(updateData.password, salt);
      }
      
      users[idx] = { ...users[idx], ...updateData };
      saveJsonUsers(users);
      return users[idx];
    }
    
    const mongooseUser = await User.findById(id);
    if (!mongooseUser) return null;
    Object.assign(mongooseUser, updateData);
    await mongooseUser.save({ validateBeforeSave: false });
    return mongooseUser;
  },

  comparePassword: async (plainText, user) => {
    if (user.matchPassword) {
      return await user.matchPassword(plainText);
    }
    return await bcrypt.compare(plainText, user.password);
  },

  toPublicJSON: (user) => {
    if (!user) return null;
    return {
      id: user.id || user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      country: user.country,
      role: user.role,
      isActive: user.isActive !== undefined ? user.isActive : true
    };
  },

  // ─── Custom Video Operations ───────────────────────────────────────────────
  saveCustomVideo: async (videoData) => {
    if (useJsonDb()) {
      const jsonVideosPath = path.join(__dirname, '../videos.json');
      if (!fs.existsSync(jsonVideosPath)) {
        fs.writeFileSync(jsonVideosPath, JSON.stringify([]));
      }
      let videos = [];
      try {
        videos = JSON.parse(fs.readFileSync(jsonVideosPath, 'utf8'));
      } catch {
        videos = [];
      }
      
      const idx = videos.findIndex(v => v.lessonId === videoData.lessonId);
      const newVideo = {
        id: Date.now().toString(),
        lessonId: videoData.lessonId,
        moduleId: videoData.moduleId,
        title: videoData.title,
        videoData: videoData.videoData,
        thumbnailData: videoData.thumbnailData,
        duration: videoData.duration || 120,
        uploadedAt: new Date().toISOString()
      };

      if (idx !== -1) {
        videos[idx] = newVideo;
      } else {
        videos.push(newVideo);
      }
      fs.writeFileSync(jsonVideosPath, JSON.stringify(videos, null, 2));
      return newVideo;
    }

    const Video = require('../models/Video');
    // Upsert the custom video document based on lessonId
    return await Video.findOneAndUpdate(
      { lessonId: videoData.lessonId },
      videoData,
      { new: true, upsert: true }
    );
  },

  getCustomVideos: async () => {
    if (useJsonDb()) {
      const jsonVideosPath = path.join(__dirname, '../videos.json');
      if (!fs.existsSync(jsonVideosPath)) return [];
      try {
        return JSON.parse(fs.readFileSync(jsonVideosPath, 'utf8'));
      } catch {
        return [];
      }
    }
    const Video = require('../models/Video');
    return await Video.find({});
  },

  getCustomVideoByLesson: async (lessonId) => {
    if (useJsonDb()) {
      const jsonVideosPath = path.join(__dirname, '../videos.json');
      if (!fs.existsSync(jsonVideosPath)) return null;
      try {
        const videos = JSON.parse(fs.readFileSync(jsonVideosPath, 'utf8'));
        return videos.find(v => v.lessonId === lessonId) || null;
      } catch {
        return null;
      }
    }
    const Video = require('../models/Video');
    return await Video.findOne({ lessonId });
  }
};

module.exports = db;
