const { Schema, model } = require('mongoose');

const projectSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: String,
    summary: String,
    category: String,
    tags: [String],
    role: String,
    duration: String,
    client: String,
    cover: String,
    overview: String,
    approach: [String],
    findings: [String],
    stack: [String],
    metrics: [{ label: String, value: String }],
  },
  { versionKey: false }
);

module.exports = model('Project', projectSchema);
