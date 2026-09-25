const { Schema, model } = require('mongoose');

const adminSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: String,
    passwordHash: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = model('Admin', adminSchema);
