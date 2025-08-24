import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
  },
  { timestamps: true }
);

userSchema.index({ name: 1, phone: 1 }, { unique: true });

export default mongoose.model('User', userSchema);
