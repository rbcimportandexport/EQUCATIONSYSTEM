require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');

const ATLAS_URI = 'mongodb+srv://inquiryrbcimport_db_user:fHtMYCe7zhYWeviv@cluster0.fz1axed.mongodb.net/education_system?retryWrites=true&w=majority';

async function clearUsers() {
  const uri = process.env.MONGODB_URI || ATLAS_URI;
  console.log('Connecting to MongoDB Atlas...');
  
  try {
    await mongoose.connect(uri);
    console.log('Connected successfully!');
    
    console.log('Deleting all users from MongoDB Atlas collection...');
    const result = await User.deleteMany({});
    console.log(`Deleted successfully! Total documents removed: ${result.deletedCount}`);
    
    console.log('Re-seeding default RBC Admin user...');
    await User.create({
      name: 'RBC Admin',
      email: 'inquiryrbcimport@gmail.com',
      password: 'RBC2026',
      role: 'admin',
      phone: '+919876543210',
      country: 'India',
      progressPercentage: 100
    });
    console.log('RBC Admin successfully re-seeded!');
    
  } catch (error) {
    console.error('Error during clearing/seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

clearUsers();
