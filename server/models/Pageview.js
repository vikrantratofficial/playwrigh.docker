const { Schema, model } = require('mongoose');

const pageviewSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    ip: String,
    country: String,
    region: String,
    city: String,
    lat: Number,
    lon: Number,
    path: String,
    referrer: String,
    userAgent: String,
    sessionId: String,
    timestamp: String,
  },
  { versionKey: false }
);

module.exports = model('Pageview', pageviewSchema);
