import Groq from 'groq-sdk';
import { config } from '../config/env.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const groq = new Groq({ apiKey: config.groqApiKey });

// Load schemes data
const schemesPath = path.join(__dirname, '../data/schemes.json');
const schemes = JSON.parse(fs.readFileSync(schemesPath, 'utf-8'));

export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!groq || !config.groqApiKey || config.groqApiKey.includes('placeholder')) {
      // Mock mode - return intelligent fallback response
      const mockReply = `🙏 Hello! I'm here to help you find government schemes.

Available Schemes:
• PM Kisan Samman Nidhi - ₹6,000/year for Small/Marginal Farmers
• Ayushman Bharat (PM-JAY) - ₹5 Lakh health cover for BPL Families
• PM Ujjwala Yojana - Free LPG Connection for Women (BPL)

All schemes require Aadhaar card. Visit your nearest Sahayak Kendra for enrollment.

(Demo Mode: Connect Groq API for AI-powered responses)`;
      
      return res.json({ reply: mockReply, schemes });
    }

    // Create context from schemes
    const schemesContext = JSON.stringify(schemes, null, 2);

    const systemPrompt = `You are a helpful assistant for YojanaSetu, a platform connecting Indian rural citizens with government schemes. 
Here are the available schemes:
${schemesContext}

Answer questions about these schemes in a friendly, simple manner. Focus on eligibility, benefits, and required documents. 
Use Hindi-English mix (Hinglish) when appropriate for better understanding.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      model: 'llama3-8b-8192',
      temperature: 0.7,
      max_tokens: 1024,
    });

    const reply = completion.choices[0]?.message?.content || 'Sorry, I could not process your request.';

    res.json({ reply, schemes });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to process chat request',
      details: error.message 
    });
  }
};
