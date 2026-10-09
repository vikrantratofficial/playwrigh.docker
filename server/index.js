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
const PORT = process.env.PORT || 10000;

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://playwrigh-docker.vercel.app',
  'https://vikrantsdet.com',
  'https://www.vikrantsdet.com',
];

app.set('trust proxy', 1);
app.use(cors({
  origin(origin, callback) {
    // Allow non-browser requests (curl, server-to-server, health checks) with no Origin header.
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
}));
app.use(express.json({ limit: '50kb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
//command
app.get('/', (req, res) => {
    res.send('Playwright Docker Server is running!');
});

app.use('/api/projects', projectsRouter);
app.use('/api/blog', blogRouter);
app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);
app.use('/api/analytics', analyticsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Catch-all error handler — must stay last, and must keep 4 args so Express
// treats it as error middleware. Never send err.message/err.stack to the
// client regardless of NODE_ENV; log full detail server-side only.
app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({ message: 'Something went wrong. Please try again later.' });
});

connectMongo()
  .then(() => {
    // app.listen(PORT, () => {
    //   console.log(`API server running on http://localhost:${PORT}`);
    // });
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`API server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB, server not started:', err.message);
    process.exit(1);
  });
