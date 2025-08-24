import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { id, name }
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
