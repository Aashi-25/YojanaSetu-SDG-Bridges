# 🧪 Demo Test Data

Use these inputs during your presentation for consistent results.

---

## 🔍 AI Chat Queries

### Query 1: Hindi/Hinglish
```
किसान योजना
```
**Expected:** PM Kisan Samman Nidhi scheme details

### Query 2: English
```
health scheme for BPL families
```
**Expected:** Ayushman Bharat (PM-JAY) information

### Query 3: Specific Question
```
What documents do I need for PM Kisan?
```
**Expected:** Aadhaar + Land Record

### Query 4: Women-focused
```
free gas connection for women
```
**Expected:** PM Ujjwala Yojana

---

## 📱 Mobile Numbers for SMS Demo

Use these formatted numbers (they won't actually receive SMS in demo mode):

```
9876543210    (Mumbai area)
9123456789    (Delhi area)
9988776655    (Bangalore area)
```

**All pass 10-digit validation ✅**

---

## 👤 Beneficiary Enrollment (Sahayak Mode)

### Sample Beneficiary 1: Farmer
```
Name:    Rajesh Kumar Patel
Mobile:  9876543210
Scheme:  PM Kisan Samman Nidhi
```

### Sample Beneficiary 2: Health
```
Name:    Sunita Devi
Mobile:  9123456789
Scheme:  Ayushman Bharat (PM-JAY)
```

### Sample Beneficiary 3: Women
```
Name:    Meera Bai
Mobile:  9988776655
Scheme:  PM Ujjwala Yojana
```

---

## 🖼️ Document Scanning

### If You Have Sample Images:
- Aadhaar card image (any)
- Ration card image (any)
- PAN card (works but not ideal)

### If No Images Available:
- Just show the upload interface
- Explain: "In demo mode, Gemini Vision is simulated"
- Point out the mock extracted data: "Ram Kumar Sharma, Age 45"

---

## 🗺️ Map Interaction

### Pre-loaded Centers:
1. **Connaught Place Sahayak Kendra**
   - CP, New Delhi
   - Click marker to see popup

2. **Karol Bagh Sahayak Kendra**
   - Karol Bagh, Delhi

3. **Dwarka Sahayak Kendra**
   - Dwarka, New Delhi

**Demo Tip:** Zoom in/out to show interactivity

---

## 🎯 Expected Responses (Demo Mode)

### Chat API Response:
```
🙏 Hello! I'm here to help you find government schemes.

Available Schemes:
• PM Kisan Samman Nidhi - ₹6,000/year for Small/Marginal Farmers
• Ayushman Bharat (PM-JAY) - ₹5 Lakh health cover for BPL Families
• PM Ujjwala Yojana - Free LPG Connection for Women (BPL)

All schemes require Aadhaar card. Visit your nearest Sahayak Kendra for enrollment.

(Demo Mode: Connect Groq API for AI-powered responses)
```

### SMS Response:
```json
{
  "success": true,
  "mock": true,
  "message": "SMS would be sent in production",
  "details": { "mobile": "9876543210", "name": "User", "schemeName": "..." }
}
```

### Document Scan Response:
```json
{
  "success": true,
  "data": {
    "name": "Ram Kumar Sharma",
    "age": "45",
    "note": "Demo Mode: Connect Gemini API for real OCR"
  },
  "mock": true
}
```

---

## 🚨 Troubleshooting During Demo

### If Chat Doesn't Respond:
✅ **This is expected in demo mode!**
> "See the mock response? This shows graceful degradation—the app works without API keys."

### If SMS Shows "Mock Mode":
✅ **This is intentional!**
> "In production, this connects to MSG91's India-specific SMS gateway. For the demo, we're showing the queue mechanism."

### If Map Takes Time to Load:
✅ **Wait 2 seconds, explain:**
> "Leaflet is fetching tiles from OpenStreetMap. This happens once, then it's cached."

### If PDF Downloads Immediately:
✅ **Perfect!**
> "Notice how fast that was? Client-side generation with jsPDF—no server bottleneck."

---

## 💡 Pro Tips

1. **Use Incognito Mode:** Fresh state every time
2. **Have PDF Viewer Ready:** Preview the card immediately
3. **Network Tab Open:** Show API calls to judges
4. **Multiple Tabs:** Pre-load Urban and Sahayak modes
5. **Zoom In:** Make sure text is readable on projector

---

## 🏆 Success Metrics

At the end of the demo, judges should have seen:
- ✅ AI chat working (mock or real)
- ✅ Scheme cards displayed
- ✅ SMS flow triggered
- ✅ Document upload interface
- ✅ Map with markers
- ✅ PDF generated and downloaded
- ✅ Tricolor theme throughout
- ✅ Smooth animations

**You're ready to win this.** 🚀
