const express = require('express');
const { readJson, writeJson } = require('../utils/jsonStore');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
const FILE = 'blog.json';

router.get('/', (req, res) => {
  const posts = readJson(FILE).sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(posts);
});

router.get('/:id', (req, res) => {
  const posts = readJson(FILE);
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

router.post('/', requireAuth, (req, res) => {
  const posts = readJson(FILE);
  const newPost = { ...req.body, id: req.body.id || `post-${Date.now()}` };
  posts.push(newPost);
  writeJson(FILE, posts);
  res.status(201).json(newPost);
});

router.put('/:id', requireAuth, (req, res) => {
  const posts = readJson(FILE);
  const index = posts.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Post not found' });
  posts[index] = { ...posts[index], ...req.body, id: req.params.id };
  writeJson(FILE, posts);
  res.json(posts[index]);
});

router.delete('/:id', requireAuth, (req, res) => {
  const posts = readJson(FILE);
  const filtered = posts.filter((p) => p.id !== req.params.id);
  if (filtered.length === posts.length) return res.status(404).json({ message: 'Post not found' });
  writeJson(FILE, filtered);
  res.status(204).send();
});

module.exports = router;
