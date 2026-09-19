require('dotenv').config();
const express = require('express');
const cors = require('cors');

const projectsRouter = require('./routes/projects');
const blogRouter = require('./routes/blog');
const contactRouter = require('./routes/contact');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/projects', projectsRouter);
app.use('/api/blog', blogRouter);
app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
