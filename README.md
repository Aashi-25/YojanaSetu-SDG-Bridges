# YojanaSetu 🇮🇳

**Bridge Between Indian Government Schemes and Rural Citizens**

A hackathon project connecting rural citizens with government schemes through AI-powered chat, document scanning, SMS notifications, and offline volunteer assistance.

---

## 🚀 Tech Stack

### Backend
- **Node.js + Express** - RESTful API
- **Groq SDK** - Llama3 for intelligent chat
- **Google Generative AI** - Gemini Vision for document scanning
- **MSG91 API** - SMS notifications (India-specific)
- **Modular Architecture** - Separated controllers, routes, config

### Frontend
- **React + Vite** - Fast development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Modern icons
- **React-Leaflet** - Interactive maps
- **jsPDF** - PDF generation for Yojana Cards

---

## 📁 Project Structure

```
YojanaSetu/
├── backend/
│   ├── config/          # Environment config
│   ├── controllers/     # Business logic
│   │   ├── chatController.js
│   │   ├── scanController.js
│   │   └── smsController.js
│   ├── routes/          # API routes
│   ├── data/            # Schemes data
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Home & Offline pages
│   │   └── App.jsx
│   └── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment Variables

Create `backend/.env` from the template:

```bash
cp backend/.env.example backend/.env
```

Add your API keys:
- **GROQ_API_KEY**: Get from [console.groq.com](https://console.groq.com)
- **GEMINI_API_KEY**: Get from [makersuite.google.com](https://makersuite.google.com)
- **MSG91_AUTH_KEY**: Get from [msg91.com](https://msg91.com)
- **MSG91_TEMPLATE_ID**: Create a Flow template in MSG91

### 3. Run the Project

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
App runs on `http://localhost:3000`

---

## 🎯 Features

### Urban Mode (Home)
- **AI Chat**: Ask about schemes in English/Hindi using Llama3
- **Voice Input**: Simulated voice search
- **Scheme Cards**: View schemes with SDG alignment
- **Send to Phone**: SMS scheme details via MSG91
- **Document Scanner**: Upload Aadhaar/Ration Card for auto-fill (Gemini Vision)
- **Map Locator**: Find nearby Sahayak Kendras

### Sahayak Mode (Offline)
- **Volunteer Dashboard**: Enroll beneficiaries offline
- **Print Yojana Card**: Generate PDF enrollment cards with tricolor branding
- **Send SMS**: Notify beneficiaries about enrollment
- **Touch-Friendly UI**: Designed for tablets/mobile devices

---

## 🎨 Design System

**"Tricolor Modern"**
- **Saffron** (#FF9933) - Primary actions
- **Green** (#138808) - Secondary actions
- **Off-White** (#F8FAFC) - Background
- **Font**: Outfit (Google Fonts)
- **Style**: Glassmorphism cards, large buttons, clear iconography

---

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | AI-powered scheme queries |
| `/api/scan` | POST | Document OCR analysis |
| `/api/send-sms` | POST | Send SMS via MSG91 |
| `/api/health` | GET | Health check |

---

## 🛠️ Development Notes

- **Mock Mode**: SMS API falls back to mock responses if MSG91 credentials are missing
- **ES Modules**: Backend uses `"type": "module"` in package.json
- **Proxy**: Vite proxies `/api` requests to backend
- **Windows Compatible**: Uses PowerShell-friendly commands

---

## 📦 Schemes Included

1. **PM Kisan Samman Nidhi** - ₹6,000/year for farmers (SDG 1: No Poverty)
2. **Ayushman Bharat (PM-JAY)** - ₹5 Lakh health cover (SDG 3: Good Health)
3. **PM Ujjwala Yojana** - Free LPG for women (SDG 7: Clean Energy)

---

## 🚨 Demo Mode

For hackathon demos without full API setup:
- Backend works without API keys (returns mock data)
- SMS sends return `{ success: true, mock: true }`
- Document scanner needs GEMINI_API_KEY for full functionality

---

## 📝 License

MIT License - Built for Social Impact Hackathon

---

## 👥 Contributors

Built with ❤️ for bridging the digital divide in rural India
