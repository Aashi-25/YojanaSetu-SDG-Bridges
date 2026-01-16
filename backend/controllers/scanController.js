import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env.js';

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

export const analyzeDoc = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    if (!genAI || !config.geminiApiKey || config.geminiApiKey.includes('placeholder')) {
      // Mock mode - return demo extracted data
      return res.json({
        success: true,
        data: {
          name: 'Ram Kumar Sharma',
          age: '45',
          note: 'Demo Mode: Connect Gemini API for real OCR'
        },
        mock: true
      });
    }

    // Remove data URL prefix if present
    const base64Image = image.replace(/^data:image\/\w+;base64,/, '');

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `Analyze this identity document (Aadhaar card, ration card, or similar Indian government ID) and extract:
1. Full Name
2. Age (or Date of Birth to calculate age)

Return the information in JSON format:
{
  "name": "extracted name",
  "age": "extracted age or calculated from DOB"
}

If you cannot extract the information, return null for that field.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    // Try to parse JSON from response
    let extractedData;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/);
      extractedData = JSON.parse(jsonMatch ? jsonMatch[1] || jsonMatch[0] : text);
    } catch (parseError) {
      // Fallback: try to extract name and age from plain text
      extractedData = {
        name: null,
        age: null,
        rawText: text
      };
    }

    res.json({
      success: true,
      data: extractedData
    });
  } catch (error) {
    console.error('Scan error:', error);
    res.status(500).json({
      error: 'Failed to analyze document',
      details: error.message
    });
  }
};
