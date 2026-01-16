import express from 'express';
import { handleChat } from '../controllers/chatController.js';
import { analyzeDoc } from '../controllers/scanController.js';
import { sendSMS } from '../controllers/smsController.js';

const router = express.Router();

// Chat endpoint - AI-powered scheme queries
router.post('/chat', handleChat);

// Document scanning endpoint - Gemini Vision
router.post('/scan', analyzeDoc);

// SMS notification endpoint - MSG91
router.post('/send-sms', sendSMS);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'YojanaSetu API' });
});

export default router;
