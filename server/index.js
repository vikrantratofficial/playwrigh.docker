require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectMongo } = require('./mongo');

const projectsRouter = require('./routes/projects');
const blogRouter = require('./routes/blog');
const contactRouter = require('./routes/contact');
const authRouter = require('./routes/auth');
const analyticsRouter = require('./routes/analytics');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);
app.use(cors());
app.use(express.json({ limit: '50kb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/projects', projectsRouter);
app.use('/api/blog', blogRouter);
app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);
app.use('/api/analytics', analyticsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

connectMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB, server not started:', err.message);
    process.exit(1);
  });
