import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Hero from '../components/Hero';
import SchemeCard from '../components/SchemeCard';
import CameraScanner from '../components/CameraScanner';
import MapLocator from '../components/MapLocator';

const Home = () => {
  const [schemes, setSchemes] = useState([]);
  const [chatResponse, setChatResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setChatResponse('');
    
    try {
      const response = await axios.post('/api/chat', { message: query });
      
      if (response.data.schemes) {
        setSchemes(response.data.schemes);
      }
      
      if (response.data.reply) {
        setChatResponse(response.data.reply);
      }
    } catch (error) {
      console.error('Search error:', error);
      setChatResponse('Sorry, I could not process your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Hero onSearch={handleSearch} />

      {loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-saffron border-t-transparent mx-auto mb-4"></div>
          <motion.p 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-gray-600 text-lg font-medium"
          >
            Finding schemes for you...
          </motion.p>
        </motion.div>
      )}

      {chatResponse && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-8"
        >
          <h3 className="text-xl font-bold mb-3 text-saffron">AI Response:</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{chatResponse}</p>
        </motion.div>
      )}

      {schemes.length > 0 && !loading && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Available <span className="text-indiaGreen">Schemes</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map((scheme, index) => (
              <SchemeCard key={scheme.id} scheme={scheme} index={index} />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <CameraScanner />
        <MapLocator />
      </div>
    </div>
  );
};

export default Home;
