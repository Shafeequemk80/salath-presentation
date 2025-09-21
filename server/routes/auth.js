import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET } from '../config.js';

const router = express.Router();

// Signup: name, phone, whatsapp, place, mahallu, panchayath, district, state, country

router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      phone,
      whatsapp,
      place,
      mahallu,
      panchayath,
      district,
      state,
      country,
    } = req.body;

    if (!name || !whatsapp) {
      return res.status(400).json({ message: "Name and Whatsapp number required" });
    }

    const user = await User.create({
      name,
      phone,
      whatsapp,
      place,
      mahallu,
      panchayath,
      district,
      state,
      country,
    });

    const token = jwt.sign(
      { id: user._id, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "User already exists" });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// Login: name, phone (no password for demo)
router.post('/login', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: 'phone number required' });
    const user = await User.findOne({ phone });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
