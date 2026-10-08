const { Schema, model } = require('mongoose');

const loginAttemptSchema = new Schema(
  {
    ip: { type: String, required: true, unique: true },
    attempts: { type: Number, default: 0 },
    lockedUntil: { type: String, default: null },
  },
  { versionKey: false }
);

module.exports = model('LoginAttempt', loginAttemptSchema);
