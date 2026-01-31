import express from 'express';
import cors from 'cors';
import { config, validateEnv } from './config/env.js';
import apiRoutes from './routes/apiRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'YojanaSetu Backend API',
    version: '1.0.0',
    endpoints: {
      chat: 'POST /api/chat',
      scan: 'POST /api/scan',
      sms: 'POST /api/send-sms',
      health: 'GET /api/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`\n🚀 YojanaSetu Backend running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api\n`);
  validateEnv();
});
