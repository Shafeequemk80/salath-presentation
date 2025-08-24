import express from 'express';
import User from '../models/User.js';
import Count from '../models/Count.js';

const router = express.Router();

// NOTE: Public endpoints (no backend auth) because admin login is frontend-only per spec.

// List all users (basic fields)
router.get('/users', async (_req, res) => {
  try {
    const users = await User.find({}, { name: 1, phone: 1, address: 1, createdAt: 1 }).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get counts for specific user
router.get('/users/:userId/counts', async (req, res) => {
  try {
    const items = await Count.find({ user: req.params.userId }).sort({ date: -1 });

    // calculate total of all counts
    const totalCount = items.reduce((sum, item) => sum + (item.value || 0), 0);

    res.json({
      totalCount,   // 👈 total of all days
      items         // 👈 daily records
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



export default router;
