const express = require('express');
const { readJson, writeJson } = require('../utils/jsonStore');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
const FILE = 'projects.json';

router.get('/', (req, res) => {
  const projects = readJson(FILE);
  res.json(projects);
});

router.get('/:id', (req, res) => {
  const projects = readJson(FILE);
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
});

router.post('/', requireAuth, (req, res) => {
  const projects = readJson(FILE);
  const newProject = { ...req.body, id: req.body.id || `project-${Date.now()}` };
  projects.push(newProject);
  writeJson(FILE, projects);
  res.status(201).json(newProject);
});

router.put('/:id', requireAuth, (req, res) => {
  const projects = readJson(FILE);
  const index = projects.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Project not found' });
  projects[index] = { ...projects[index], ...req.body, id: req.params.id };
  writeJson(FILE, projects);
  res.json(projects[index]);
});

router.delete('/:id', requireAuth, (req, res) => {
  const projects = readJson(FILE);
  const filtered = projects.filter((p) => p.id !== req.params.id);
  if (filtered.length === projects.length) return res.status(404).json({ message: 'Project not found' });
  writeJson(FILE, filtered);
  res.status(204).send();
});

module.exports = router;
