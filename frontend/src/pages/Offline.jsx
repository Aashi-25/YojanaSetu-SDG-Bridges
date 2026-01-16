import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileDown, Send, User, Phone as PhoneIcon, Briefcase } from 'lucide-react';
import axios from 'axios';
import jsPDF from 'jspdf';

const schemes = [
  { id: 'pm-kisan', name: 'PM Kisan Samman Nidhi' },
  { id: 'pm-jay', name: 'Ayushman Bharat (PM-JAY)' },
  { id: 'ujjwala', name: 'PM Ujjwala Yojana' },
];

const Offline = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    scheme: '',
  });
  const [smsStatus, setSmsStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateYojanaCard = () => {
    if (!formData.name || !formData.scheme) {
      alert('Please fill in Name and Scheme');
      return;
    }

    const doc = new jsPDF();

    // Header with tricolor theme
    doc.setFillColor(255, 153, 51); // Saffron
    doc.rect(0, 0, 210, 30, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('YojanaSetu', 105, 20, { align: 'center' });

    // Card content
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text('Yojana Enrollment Card', 105, 50, { align: 'center' });

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    
    doc.text('Beneficiary Name:', 20, 80);
    doc.setFont('helvetica', 'bold');
    doc.text(formData.name, 80, 80);

    doc.setFont('helvetica', 'normal');
    doc.text('Mobile Number:', 20, 100);
    doc.setFont('helvetica', 'bold');
    doc.text(formData.mobile || 'N/A', 80, 100);

    doc.setFont('helvetica', 'normal');
    doc.text('Scheme Enrolled:', 20, 120);
    doc.setFont('helvetica', 'bold');
    doc.text(formData.scheme, 80, 120);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.text('Date: ' + new Date().toLocaleDateString(), 20, 140);

    // Footer with green band
    doc.setFillColor(19, 136, 8); // India Green
    doc.rect(0, 270, 210, 27, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text('Bridge to Government Schemes | www.yojanasetu.gov.in', 105, 285, { align: 'center' });

    doc.save(`YojanaCard_${formData.name.replace(/\s/g, '_')}.pdf`);
  };

  const handleSendSMS = async () => {
    if (!formData.mobile || !formData.name || !formData.scheme) {
      setSmsStatus('❌ Please fill all fields');
      return;
    }

    if (formData.mobile.replace(/\D/g, '').length !== 10) {
      setSmsStatus('❌ Invalid mobile number');
      return;
    }

    setSending(true);
    setSmsStatus('');

    try {
      const response = await axios.post('/api/send-sms', {
        mobile: formData.mobile,
        name: formData.name,
        schemeName: formData.scheme,
      });

      if (response.data.success) {
        setSmsStatus(response.data.mock ? '✓ Demo: SMS queued successfully' : '✓ SMS sent successfully!');
      }
    } catch (error) {
      setSmsStatus('❌ Failed to send SMS');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-3">
          <span className="text-indiaGreen">Sahayak Mode</span>
        </h1>
        <p className="text-xl text-gray-600">
          Volunteer Dashboard for Offline Enrollment
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-8"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Briefcase className="text-saffron" />
          Beneficiary Enrollment
        </h2>

        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <User size={18} />
              Beneficiary Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter full name"
              className="input-field"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <PhoneIcon size={18} />
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
                setFormData({ ...formData, mobile: cleaned });
              }}
              placeholder="10-digit mobile number"
              className="input-field"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Briefcase size={18} />
              Select Scheme
            </label>
            <select
              name="scheme"
              value={formData.scheme}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="">-- Choose a Scheme --</option>
              {schemes.map((scheme) => (
                <option key={scheme.id} value={scheme.name}>
                  {scheme.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={generateYojanaCard}
              className="btn-primary flex items-center justify-center gap-2 text-lg"
            >
              <FileDown size={24} />
              Print Yojana Card
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSendSMS}
              disabled={sending}
              className="btn-secondary flex items-center justify-center gap-2 text-lg"
            >
              <Send size={24} />
              {sending ? 'Sending...' : 'Send SMS'}
            </motion.button>
          </div>

          {smsStatus && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className={`p-4 rounded-xl text-center font-semibold ${
                smsStatus.includes('✓')
                  ? 'bg-green-50 text-green-700 border-2 border-green-200'
                  : 'bg-red-50 text-red-700 border-2 border-red-200'
              }`}
            >
              {smsStatus}
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 glass-card p-6"
      >
        <h3 className="text-xl font-bold mb-4 text-indiaGreen">How to Use:</h3>
        <ol className="space-y-2 text-gray-700">
          <li>1. Fill beneficiary details (Name, Mobile, Scheme)</li>
          <li>2. <strong>Print Yojana Card:</strong> Download PDF enrollment card</li>
          <li>3. <strong>Send SMS:</strong> Send scheme details to beneficiary's phone</li>
          <li>4. Card can be shown at government offices for verification</li>
        </ol>
      </motion.div>
    </div>
  );
};

export default Offline;
