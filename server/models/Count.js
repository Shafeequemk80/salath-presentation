import mongoose from 'mongoose';

const countSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    value: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

countSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model('Count', countSchema);
