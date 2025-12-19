const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    registeredDay: { type: Number, index: true },
  },
  { timestamps: { createdAt: "registered_at" } }
);

userSchema.index({ registeredDay: 1, email: 1 });
module.exports = mongoose.model("User", userSchema);
