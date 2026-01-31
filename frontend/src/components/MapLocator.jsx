import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const sahayakCenters = [
  { id: 1, name: 'Connaught Place Sahayak Kendra', lat: 28.6315, lng: 77.2167, address: 'CP, New Delhi' },
  { id: 2, name: 'Karol Bagh Sahayak Kendra', lat: 28.6519, lng: 77.1900, address: 'Karol Bagh, Delhi' },
  { id: 3, name: 'Dwarka Sahayak Kendra', lat: 28.5921, lng: 77.0460, address: 'Dwarka, New Delhi' },
];

const MapLocator = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
          <MapPin className="text-saffron" size={28} />
        </motion.div>
        <h2 className="text-2xl font-bold">Nearby Sahayak Kendras</h2>
      </div>

      <div className="h-96 rounded-2xl overflow-hidden border-2 border-gray-200">
        <MapContainer
          center={[28.6139, 77.2090]}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {sahayakCenters.map((center) => (
            <Marker key={center.id} position={[center.lat, center.lng]}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold text-saffron">{center.name}</h3>
                  <p className="text-sm text-gray-600">{center.address}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {sahayakCenters.map((center) => (
          <div key={center.id} className="p-3 bg-white/50 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-sm">{center.name}</h4>
            <p className="text-xs text-gray-600">{center.address}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MapLocator;
