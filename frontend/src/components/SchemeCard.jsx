import { motion } from 'framer-motion';
import { FileText, Users, Phone } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const SchemeCard = ({ scheme, index }) => {
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [mobile, setMobile] = useState('');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendSMS = async () => {
    if (!mobile || mobile.length !== 10) {
      setMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    setSending(true);
    setMessage('');

    try {
      const response = await axios.post('/api/send-sms', {
        mobile,
        name: 'User',
        schemeName: scheme.name,
      });

      if (response.data.success) {
        setMessage(response.data.mock ? '✓ Demo: SMS queued' : '✓ SMS sent successfully!');
        setMobile('');
        setTimeout(() => setShowPhoneInput(false), 2000);
      }
    } catch (error) {
      setMessage('❌ Failed to send SMS');
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-card p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="inline-block px-3 py-1 bg-saffron/20 text-saffron rounded-full text-sm font-semibold mb-2">
            {scheme.category}
          </span>
          <h3 className="text-xl font-bold text-gray-800">{scheme.name}</h3>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-indiaGreen font-semibold text-lg">
          <span>💰</span>
          <span>{scheme.benefit}</span>
        </div>

        <div className="flex items-start gap-2 text-gray-600">
          <Users size={18} className="mt-1 flex-shrink-0" />
          <span>{scheme.eligibility}</span>
        </div>

        <div className="flex items-start gap-2 text-gray-600">
          <FileText size={18} className="mt-1 flex-shrink-0" />
          <span>Required: {scheme.docs.join(', ')}</span>
        </div>

        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
          {scheme.sdg}
        </div>
      </div>

      {!showPhoneInput ? (
        <button
          onClick={() => setShowPhoneInput(true)}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          <Phone size={20} />
          Send to Phone
        </button>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit mobile"
              className="input-field text-sm"
            />
            <button
              onClick={handleSendSMS}
              disabled={sending}
              className="btn-secondary whitespace-nowrap"
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </div>
          {message && (
            <p className={`text-sm ${message.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SchemeCard;
