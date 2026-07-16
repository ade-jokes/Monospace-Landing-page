import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// In-memory storage (replace with database in production)
const submissions = [];
const analytics = [];

// Routes

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 2. Form submission endpoint
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, msg } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const submission = {
      id: Date.now(),
      name,
      email,
      msg,
      timestamp: new Date().toISOString(),
    };

    submissions.push(submission);

    // Log analytics event
    analytics.push({
      event: 'form_submitted',
      timestamp: new Date().toISOString(),
      data: { email },
    });

    res.json({
      success: true,
      message: 'Thank you for reaching out! We will get back to you soon.',
      submissionId: submission.id,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process submission' });
  }
});

// 3. Services data endpoint
app.get('/api/services', (req, res) => {
  const services = [
    {
      id: 1,
      title: "Landing Page Development",
      duration: "3-7 days",
      tag: "Quick Start",
      category: "Engineering",
      price: "Essential",
      contract: "Fixed-Price",
      accent: "#00C853",
      desc: "High-converting, mobile-responsive single-page websites tailored to turn visitors into leads with premium load times."
    },
    {
      id: 2,
      title: "Company Website Development",
      duration: "14-28 days",
      tag: "Website",
      category: "Engineering",
      price: "Growth",
      contract: "Fixed-Price",
      accent: "#0EA5E9",
      desc: "A bespoke multipage digital experience designed to reflect your brand's authority, fully optimized for search and speed."
    },
    {
      id: 3,
      title: "Paid Advertising Campaigns",
      duration: "7-14 days",
      tag: "Paid Ads",
      category: "Marketing & Growth",
      price: "Growth",
      contract: "Retainer",
      accent: "#635BFF",
      desc: "Data-driven, highly optimized search and social ads to lower your cost-per-acquisition and scale revenue."
    },
    {
      id: 4,
      title: "Custom Web App Development",
      duration: "30-90 days",
      tag: "Custom",
      category: "Engineering",
      price: "Enterprise",
      contract: "Fixed-Price",
      accent: "#FF2E93",
      desc: "Interactive, secure web tools and client portals built using advanced front-end modules and robust APIs."
    },
    {
      id: 5,
      title: "Email Marketing Campaigns",
      duration: "30-365 days",
      tag: "Email Marketing",
      category: "Marketing & Growth",
      price: "Growth",
      contract: "Retainer",
      accent: "#F59E0B",
      desc: "Automated, segmented email drip series and custom newsletters that nurture leads and convert prospects."
    },
    {
      id: 6,
      title: "Mobile App Development",
      duration: "45-90 days",
      tag: "Mobile",
      category: "Engineering",
      price: "Enterprise",
      contract: "Fixed-Price",
      accent: "#0EA5E9",
      desc: "Native iOS and Android application codebases featuring offline support, custom interfaces, and smooth performance."
    },
  ];

  // Log analytics
  analytics.push({
    event: 'services_viewed',
    timestamp: new Date().toISOString(),
  });

  res.json(services);
});

// 4. Case studies endpoint
app.get('/api/case-studies', (req, res) => {
  const caseStudies = [
    {
      id: 1,
      client: "PAGA",
      accent: "#00C853",
      headline: "346% increase in in-app sales.",
      description: "Performance marketing campaign delivering 38.94% user activity growth and 43.59% reduction in Facebook CPC across a 90-day campaign.",
      metric: "43%",
      metricLabel: "Lower cost per click",
      shadowColor: "rgba(0, 200, 83, 0.15)"
    },
    {
      id: 2,
      client: "AMAZON PRIME VIDEO",
      accent: "#0EA5E9",
      headline: "Gangs of Lagos — Pan-African launch experience.",
      description: "Built an interactive web experience with personalised social sharing and content moderation for the movie launch across Africa.",
      metric: "🌍",
      metricLabel: "Pan-African reach",
      shadowColor: "rgba(14, 165, 233, 0.15)"
    },
    {
      id: 3,
      client: "NILE UNIVERSITY",
      accent: "#F59E0B",
      headline: "Full marketing analytics infrastructure.",
      description: "Dashboards, reporting, and performance analytics integrating Google Analytics and Facebook Ads into one unified view.",
      metric: "3",
      metricLabel: "Data sources unified",
      shadowColor: "rgba(245, 159, 11, 0.15)"
    },
  ];

  analytics.push({
    event: 'case_studies_viewed',
    timestamp: new Date().toISOString(),
  });

  res.json(caseStudies);
});

// 5. Testimonials endpoint
app.get('/api/testimonials', (req, res) => {
  const testimonials = [
    {
      id: 1,
      quote: 'The campaigns Monospace Digital ran increased our platform activity by 38.94% while reducing our Facebook advertising cost by 43.59%. They think like business partners, not just vendors.',
      client: 'Client',
      company: 'Paga',
      location: 'Lagos, Nigeria',
      accent: '#00C853'
    }
  ];

  analytics.push({
    event: 'testimonials_viewed',
    timestamp: new Date().toISOString(),
  });

  res.json(testimonials);
});

// 6. Gemini AI chat endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const model = genai.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    analytics.push({
      event: 'ai_chat',
      timestamp: new Date().toISOString(),
      data: { promptLength: prompt.length },
    });

    res.json({ response: text });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ error: 'Failed to process AI request' });
  }
});

// 7. Analytics endpoint
app.post('/api/analytics', (req, res) => {
  try {
    const { event, data } = req.body;

    const analyticsEvent = {
      event,
      timestamp: new Date().toISOString(),
      data,
      userAgent: req.headers['user-agent'],
    };

    analytics.push(analyticsEvent);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log analytics' });
  }
});

// 8. Get all submissions (admin endpoint - should be protected)
app.get('/api/admin/submissions', (req, res) => {
  res.json({ submissions, count: submissions.length });
});

// 9. Get analytics summary
app.get('/api/admin/analytics', (req, res) => {
  const summary = {
    totalEvents: analytics.length,
    eventsByType: {},
    lastUpdated: new Date().toISOString(),
  };

  analytics.forEach(event => {
    if (!summary.eventsByType[event.event]) {
      summary.eventsByType[event.event] = 0;
    }
    summary.eventsByType[event.event]++;
  });

  res.json(summary);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Monospace Server running on http://localhost:${PORT}`);
  console.log(`📊 Analytics endpoint: http://localhost:${PORT}/api/admin/analytics`);
  console.log(`📨 Submissions endpoint: http://localhost:${PORT}/api/admin/submissions`);
});
