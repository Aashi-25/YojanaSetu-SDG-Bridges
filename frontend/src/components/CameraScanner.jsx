import { motion } from 'framer-motion';
import { Camera, Upload } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const CameraScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setScanning(true);
    setResult(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const base64Image = event.target.result;
        
        const response = await axios.post('/api/scan', {
          image: base64Image,
        });

        if (response.data.success) {
          setResult(response.data.data);
        }
      } catch (error) {
        console.error('Scan error:', error);
        setResult({ error: 'Failed to scan document' });
      } finally {
        setScanning(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card p-8 text-center"
    >
      <div className="mb-6">
        <Camera size={64} className="mx-auto text-saffron mb-4" />
        <h2 className="text-2xl font-bold mb-2">Document Scanner</h2>
        <p className="text-gray-600">
          Upload Aadhaar, Ration Card, or other ID to auto-fill details
        </p>
      </div>

      <label className="inline-block">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          className="hidden"
        />
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="btn-primary cursor-pointer flex items-center gap-2 text-lg"
        >
          <Upload size={24} />
          {scanning ? 'Scanning...' : 'Scan Document'}
        </motion.div>
      </label>

      {scanning && (
        <div className="mt-6">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-saffron border-t-transparent mx-auto"></div>
          <p className="text-gray-600 mt-2">Analyzing document...</p>
        </div>
      )}

      {result && !result.error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-50 rounded-xl border-2 border-green-200"
        >
          <h3 className="font-bold text-green-800 mb-2">✓ Document Scanned</h3>
          <div className="text-left space-y-1">
            {result.name && (
              <p>
                <span className="font-semibold">Name:</span> {result.name}
              </p>
            )}
            {result.age && (
              <p>
                <span className="font-semibold">Age:</span> {result.age}
              </p>
            )}
          </div>
        </motion.div>
      )}

      {result?.error && (
        <div className="mt-6 p-4 bg-red-50 rounded-xl border-2 border-red-200 text-red-700">
          {result.error}
        </div>
      )}
    </motion.div>
  );
};

export default CameraScanner;
