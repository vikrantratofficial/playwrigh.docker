const { Schema, model } = require('mongoose');

const blogPostSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: String,
    excerpt: String,
    date: String,
    tags: [String],
    content: String,
  },
  { versionKey: false }
);

module.exports = model('BlogPost', blogPostSchema);
