import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Users } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isOffline = location.pathname === '/offline';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glass-card mx-4 mt-4 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold">
            <span className="text-saffron">Yojana</span>
            <span className="text-indiaGreen">Setu</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              !isOffline
                ? 'bg-saffron text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Home size={20} />
            <span className="font-medium">Urban Mode</span>
          </Link>

          <Link
            to="/offline"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              isOffline
                ? 'bg-indiaGreen text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users size={20} />
            <span className="font-medium">Sahayak Mode</span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
