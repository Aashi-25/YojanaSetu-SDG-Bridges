import axios from 'axios';
import { config } from '../config/env.js';

export const sendSMS = async (req, res) => {
  try {
    const { mobile, name, schemeName } = req.body;

    if (!mobile) {
      return res.status(400).json({ error: 'Mobile number is required' });
    }

    // Validate and format mobile number
    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      return res.status(400).json({ error: 'Invalid mobile number. Must be 10 digits.' });
    }

    if (!config.msg91AuthKey || !config.msg91TemplateId) {
      console.warn('MSG91 credentials not configured, using mock mode');
      return res.json({
        success: true,
        mock: true,
        message: 'SMS would be sent in production',
        details: { mobile: cleanMobile, name, schemeName }
      });
    }

    // MSG91 Flow API v5 request
    const payload = {
      template_id: config.msg91TemplateId,
      sender: config.msg91SenderId,
      short_url: "0",
      recipients: [
        {
          mobiles: "91" + cleanMobile,
          name: name || "User",
          scheme: schemeName || "Scheme"
        }
      ]
    };

    const response = await axios.post(
      'https://control.msg91.com/api/v5/flow',
      payload,
      {
        headers: {
          'authkey': config.msg91AuthKey,
          'content-type': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      message: 'SMS sent successfully',
      messageId: response.data.message_id || response.data.request_id
    });

  } catch (error) {
    console.error('SMS sending error:', error.response?.data || error.message);
    
    // Mock fallback for demo purposes
    res.json({
      success: true,
      mock: true,
      message: 'SMS service temporarily unavailable. Using mock mode for demo.',
      details: { mobile: req.body.mobile, name: req.body.name, schemeName: req.body.schemeName }
    });
  }
};
