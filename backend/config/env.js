import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  groqApiKey: process.env.GROQ_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  msg91AuthKey: process.env.MSG91_AUTH_KEY,
  msg91TemplateId: process.env.MSG91_TEMPLATE_ID,
  msg91SenderId: process.env.MSG91_SENDER_ID || 'MSGIND',
};

export const validateEnv = () => {
  const warnings = [];
  
  if (!config.groqApiKey) warnings.push('GROQ_API_KEY not set');
  if (!config.geminiApiKey) warnings.push('GEMINI_API_KEY not set');
  if (!config.msg91AuthKey) warnings.push('MSG91_AUTH_KEY not set');
  if (!config.msg91TemplateId) warnings.push('MSG91_TEMPLATE_ID not set');
  
  if (warnings.length > 0) {
    console.warn('⚠️  Environment warnings:', warnings.join(', '));
  }
};
