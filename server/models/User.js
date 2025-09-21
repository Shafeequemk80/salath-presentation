import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // പേര്
    phone: { type: String, required: true, trim: true }, // ഫോൺ നമ്പർ
    whatsapp: { type: String, required: true, trim: true }, // വാട്സ്ആപ് നമ്പർ
    place: { type: String, required: true, trim: true }, // സ്ഥലം
    mahallu: { type: String, required: true, trim: true }, // മഹല്ല്
    panchayath: { type: String, required: true, trim: true }, // പഞ്ചായത്ത്‌
    district: { type: String, required: true, trim: true }, // ജില്ല
    state: { type: String, required: true, trim: true }, // സംസ്ഥാനം
    country: { type: String, required: true, trim: true }, // രാജ്യം
  },
  { timestamps: true }
);

// prevent duplicate entries with same name + whatsapp
userSchema.index({ name: 1, whatsapp: 1 }, { unique: true });

export default mongoose.model("User", userSchema);
