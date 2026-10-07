const express = require('express');
const BlogPost = require('../models/BlogPost');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await BlogPost.find().select('-_id').lean();
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(posts);
});

router.get('/:id', async (req, res) => {
  const post = await BlogPost.findOne({ id: req.params.id }).select('-_id').lean();
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

router.post('/', requireAuth, async (req, res) => {
  const id = req.body.id || `post-${Date.now()}`;
  const created = await BlogPost.create({ ...req.body, id });
  res.status(201).json(created.toObject({ transform: (doc, ret) => { delete ret._id; return ret; } }));
});

router.put('/:id', requireAuth, async (req, res) => {
  const updated = await BlogPost.findOneAndUpdate(
    { id: req.params.id },
    { ...req.body, id: req.params.id },
    { new: true }
  ).select('-_id').lean();
  if (!updated) return res.status(404).json({ message: 'Post not found' });
  res.json(updated);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const deleted = await BlogPost.findOneAndDelete({ id: req.params.id });
  if (!deleted) return res.status(404).json({ message: 'Post not found' });
  res.status(204).send();
});

module.exports = router;
