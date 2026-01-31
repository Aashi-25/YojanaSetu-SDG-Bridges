import { motion } from 'framer-motion';
import { Mic, Send } from 'lucide-react';
import { useState } from 'react';

const Hero = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const simulateVoiceInput = () => {
    setIsListening(true);
    const sampleQueries = [
      'किसान योजना',
      'Health scheme for BPL',
      'Women LPG scheme',
    ];
    const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
    
    setTimeout(() => {
      setQuery(randomQuery);
      setIsListening(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h1 className="text-5xl font-bold mb-4">
        <span className="text-saffron">सरकारी योजनाओं</span> तक
        <br />
        <span className="text-indiaGreen">आपका पुल</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Find Government Schemes That Match Your Needs
      </p>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="glass-card p-2 flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about schemes... (e.g., 'किसान योजना', 'health schemes')"
            className="flex-1 px-4 py-3 bg-transparent outline-none text-lg"
          />
          
          <motion.button
            type="button"
            onClick={simulateVoiceInput}
            whileTap={{ scale: 0.95 }}
            className={`relative p-3 rounded-xl transition-all ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-saffron text-white hover:bg-saffron/90'
            }`}
          >
            {isListening && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
            <Mic size={24} />
          </motion.button>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-indiaGreen text-white rounded-xl hover:bg-indiaGreen/90 transition-all"
          >
            <Send size={24} />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Hero;
