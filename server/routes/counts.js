import express from 'express';
import Count from '../models/Count.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Helpers
function todayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// Create/update today count for current user
router.post('/me/today', auth, async (req, res) => {
  try {
    const { value } = req.body;
    if (typeof value !== 'number' || value < 0) return res.status(400).json({ message: 'Invalid value' });
    const date = todayKey();
    const doc = await Count.findOneAndUpdate(
      { user: req.user.id, date },
      { $inc: { value } },
      { upsert: true, new: true }
    );
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all counts for current user (newest first)
router.get('/me', auth, async (req, res) => {
  try {
    const items = await Count.find({ user: req.user.id }).sort({ date: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Public: leaderboard for today (top N)
router.get('/leaderboard/today', async (req, res) => {
  try {
    const limit = Number(req.query.limit || 10);
    const date = todayKey();
    const rows = await Count.aggregate([
      { $match: { date } },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      { $unwind: '$userInfo' },
      {
        $project: {
          _id: 0,
          userId: '$userInfo._id',
          name: '$userInfo.name',
          value: 1
        }
      },
      { $sort: { value: -1 } },
      { $limit: limit }
    ]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
