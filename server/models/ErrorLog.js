const { Schema, model } = require('mongoose');

const errorLogSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    ip: String,
    country: String,
    message: String,
    stack: String,
    path: String,
    userAgent: String,
    sessionId: String,
    timestamp: String,
  },
  { versionKey: false }
);

module.exports = model('ErrorLog', errorLogSchema);
