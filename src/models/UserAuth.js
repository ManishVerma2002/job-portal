const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    password: { type: String, required: true }, 
    lastLogin: { type: Date },                 
    loginAttempts: { type: Number, default: 0 }, 
    accountLocked: { type: Boolean, default: false },
    lockUntil: { type: Date },                  // optional unlock time
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auth", authSchema);
