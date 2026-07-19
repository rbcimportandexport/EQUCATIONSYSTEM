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
  }
};

module.exports = db;
