const express = require('express');
const router = express.Router();
const webpush = require('web-push');
const PushSubscription = require('../models/PushSubscription');
const User = require('../models/User');

// Configure web-push
// Keys will be injected via process.env on Vercel
const publicVapidKey = process.env.VITE_VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

if (publicVapidKey && privateVapidKey) {
  webpush.setVapidDetails(
    'mailto:inquiryrbcimport@gmail.com',
    publicVapidKey,
    privateVapidKey
  );
} else {
  console.warn('VAPID keys not configured, web push will fail');
}

// 1. Subscribe a client
router.post('/subscribe', async (req, res) => {
  try {
    const { subscription, email } = req.body;

    if (!subscription || !email) {
      return res.status(400).json({ error: 'Subscription and email are required.' });
    }

    // Upsert the subscription (one per endpoint to prevent duplicates)
    await PushSubscription.findOneAndUpdate(
      { endpoint: subscription.endpoint },
      {
        userEmail: email.toLowerCase().trim(),
        endpoint: subscription.endpoint,
        keys: subscription.keys,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.status(201).json({ success: true, message: 'Subscribed successfully.' });
  } catch (error) {
    console.error('Error saving subscription:', error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// 2. Trigger push (Called via Vercel Cron)
router.get('/trigger', async (req, res) => {
  try {
    // Optional: Protect cron route using Authorization header or secret
    const authHeader = req.headers.authorization;
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return res.status(401).json({ error: 'Unauthorized cron request' });
    }

    const subscriptions = await PushSubscription.find({});
    let successCount = 0;
    let failCount = 0;

    // Determine greeting based on server UTC time (Vercel uses UTC)
    // Actually, Vercel cron triggers exactly when configured, but we can detect it.
    const hour = new Date().getUTCHours();
    // Assuming IST is UTC+5:30. 
    // 9 AM IST = 3:30 AM UTC
    // 2 PM IST = 8:30 AM UTC
    // 7 PM IST = 1:30 PM UTC
    let greeting = 'Hello';
    if (hour >= 2 && hour < 6) greeting = 'Good Morning'; // approx 9 AM IST
    else if (hour >= 7 && hour < 11) greeting = 'Good Afternoon'; // approx 2 PM IST
    else greeting = 'Good Evening';

    const pushPayload = JSON.stringify({
      title: `${greeting}!`,
      body: `Don't forget to complete your RBC Academy progress today! Click to resume your learning.`,
      url: 'https://equcationsystem-self.vercel.app',
      icon: '/logo_emblem.png'
    });

    // Send in parallel
    const pushPromises = subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: sub.keys },
          pushPayload
        );
        successCount++;
      } catch (err) {
        failCount++;
        // If Gone (410) or Not Found (404), delete it
        if (err.statusCode === 404 || err.statusCode === 410) {
          await PushSubscription.deleteOne({ _id: sub._id });
        }
      }
    });

    await Promise.all(pushPromises);

    res.status(200).json({ success: true, sent: successCount, failed: failCount });
  } catch (error) {
    console.error('Cron push error:', error);
    res.status(500).json({ error: 'Failed to send pushes' });
  }
});

module.exports = router;
