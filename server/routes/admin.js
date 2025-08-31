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




router.get("/dashboard", async (req, res) => {
  try {
    // 1. Total amount of all users
    const totalAmountAgg = await Count.aggregate([
      { $group: { _id: null, total: { $sum: "$value" } } }
    ]);
    const totalAmount = totalAmountAgg.length > 0 ? totalAmountAgg[0].total : 0;

    // 2. Top 4 users with total counts
    const topUsers = await Count.aggregate([
      { $group: { _id: "$user", total: { $sum: "$value" } } },
      { $sort: { total: -1 } },
      { $limit: 4 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 0,
          userId: "$userDetails._id",
          name: "$userDetails.name",
          phone: "$userDetails.phone",
          total: 1
        }
      }
    ]);

    // 3. Analytics graph (daily totals)
    const graphData = await Count.aggregate([
      { $group: { _id: "$date", total: { $sum: "$value" } } },
      { $sort: { _id: 1 } }
    ]);

    // 4. All users with their total counts
    const allUsers = await Count.aggregate([
      { $group: { _id: "$user", total: { $sum: "$value" } } },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 0,
          userId: "$userDetails._id",
          name: "$userDetails.name",
          phone: "$userDetails.phone",
          address: "$userDetails.address",
          total: 1
        }
      },
      { $sort: { total: -1 } }
    ]);

    res.json({
      totalAmount,
      topUsers,
      graphData,
      allUsers
    });
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
