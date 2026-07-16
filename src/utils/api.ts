/**
 * API client for communicating with the backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  // Contact form submission
  async submitContact(data: { name: string; email: string; msg: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      console.error('Contact submission error:', error);
      throw error;
    }
  },

  // Fetch services
  async getServices() {
    try {
      const response = await fetch(`${API_BASE_URL}/services`);
      return response.json();
    } catch (error) {
      console.error('Services fetch error:', error);
      throw error;
    }
  },

  // Fetch case studies
  async getCaseStudies() {
    try {
      const response = await fetch(`${API_BASE_URL}/case-studies`);
      return response.json();
    } catch (error) {
      console.error('Case studies fetch error:', error);
      throw error;
    }
  },

  // Fetch testimonials
  async getTestimonials() {
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials`);
      return response.json();
    } catch (error) {
      console.error('Testimonials fetch error:', error);
      throw error;
    }
  },

  // AI Chat endpoint
  async chatWithAI(prompt: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      return response.json();
    } catch (error) {
      console.error('AI chat error:', error);
      throw error;
    }
  },

  // Health check
  async health() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'OFFLINE' };
    }
  },
};
