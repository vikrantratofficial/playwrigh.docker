const { Schema, model } = require('mongoose');

const contactSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: String,
    email: String,
    projectType: String,
    message: String,
    receivedAt: String,
  },
  { versionKey: false }
);

module.exports = model('Contact', contactSchema);
