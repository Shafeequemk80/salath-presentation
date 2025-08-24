import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import { PORT, MONGODB_URI } from './config.js';

import authRoutes from './routes/auth.js';
import countsRoutes from './routes/counts.js';
import adminRoutes from './routes/admin.js';

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/counts', countsRoutes);
app.use('/api/admin', adminRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Mongo error', err);
    process.exit(1);
  });
