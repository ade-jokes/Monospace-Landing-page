# Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- Gemini API key (free from [Google AI Studio](https://ai.google.dev))

## Installation & Setup

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Configure Environment Variables

Create `.env.local` (or update existing):
```env
VITE_API_URL=http://localhost:5000/api
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your Gemini API key:
1. Visit https://ai.google.dev
2. Click "Get API Key"
3. Create new project or use existing
4. Copy the API key
5. Paste into `.env.local`

### 3️⃣ Start Development

**Option A: Run both servers (recommended)**
```bash
npm run dev:full
```

**Option B: Run separately in different terminals**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run server
```

### 4️⃣ Open in Browser
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health check: http://localhost:5000/api/health

## 🧪 Testing Features

### Test Form Submission
1. Scroll to "Ready to build your growth engine" section
2. Fill in Name, Email, and Message
3. Click "Start the conversation →"
4. Success message should appear

### Test AI Chat
1. Go to "See it in Action" section
2. Click "AI Assistant" tab
3. Type a question or click preset options
4. AI should respond in real-time

### View Submissions
- http://localhost:5000/api/admin/submissions

### View Analytics
- http://localhost:5000/api/admin/analytics

## 🔧 Troubleshooting

### "Cannot find module" errors
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Or specify different port
PORT=5001 npm run server
```

### AI Chat not responding
1. Check `GEMINI_API_KEY` in `.env.local`
2. Verify key is valid and has quota
3. Check browser console for errors
4. Check backend logs

### Form not submitting
1. Ensure both servers are running
2. Check `VITE_API_URL` in `.env.local`
3. Check browser console for CORS errors
4. Verify backend is responding: `http://localhost:5000/api/health`

## 📊 Build for Production

```bash
# Build frontend
npm run build

# Build outputs to dist/
# Deploy dist/ to static hosting (Vercel, Netlify, etc.)
```

## 📚 Useful Commands

```bash
# Run linter
npm run lint

# Clean build artifacts
npm run clean

# Run setup script
npm run setup
```

## 🎯 What's Working

✅ Landing page with animations  
✅ Form submission to backend  
✅ Gemini AI chatbot integration  
✅ Analytics tracking  
✅ Scroll-triggered animations  
✅ Interactive components  
✅ 3D tilt effects (available on cards)  

## 📖 Documentation

- **Implementation Details**: See `IMPLEMENTATION.md`
- **Backend API**: See `server.js` for all endpoints
- **Utils**: See `src/utils/` for API client and analytics

## 🆘 Need Help?

1. Check console logs
2. Check network tab in DevTools
3. Review `IMPLEMENTATION.md` for phase breakdown
4. Verify environment variables
5. Restart both servers

---

**Happy Coding! 🚀**
