const express = require('express');
const Project = require('../models/Project');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const projects = await Project.find().select('-_id').lean();
  res.json(projects);
});

router.get('/:id', async (req, res) => {
  const project = await Project.findOne({ id: req.params.id }).select('-_id').lean();
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
});

router.post('/', requireAuth, async (req, res) => {
  const id = req.body.id || `project-${Date.now()}`;
  const created = await Project.create({ ...req.body, id });
  res.status(201).json(created.toObject({ transform: (doc, ret) => { delete ret._id; return ret; } }));
});

router.put('/:id', requireAuth, async (req, res) => {
  const updated = await Project.findOneAndUpdate(
    { id: req.params.id },
    { ...req.body, id: req.params.id },
    { new: true }
  ).select('-_id').lean();
  if (!updated) return res.status(404).json({ message: 'Project not found' });
  res.json(updated);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const deleted = await Project.findOneAndDelete({ id: req.params.id });
  if (!deleted) return res.status(404).json({ message: 'Project not found' });
  res.status(204).send();
});

module.exports = router;
