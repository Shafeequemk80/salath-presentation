import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET } from '../config.js';

const router = express.Router();

// Signup: name, phone, address
router.post('/signup', async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    if (!name || !phone) return res.status(400).json({ message: 'Name and phone required' });
    const user = await User.create({ name, phone, address });
    const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'User already exists' });
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login: name, phone (no password for demo)
router.post('/login', async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) return res.status(400).json({ message: 'Name and phone required' });
    const user = await User.findOne({ name, phone });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
