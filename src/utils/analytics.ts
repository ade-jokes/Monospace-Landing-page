/**
 * Analytics tracking utility
 * Sends events to the backend for tracking
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const analytics = {
  /**
   * Track a custom event
   */
  async trackEvent(event: string, data?: Record<string, any>) {
    try {
      await fetch(`${API_BASE_URL}/analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, data }),
      });
    } catch (error) {
      console.debug('Analytics tracking failed:', error);
    }
  },

  /**
   * Track page view
   */
  async trackPageView(section: string) {
    this.trackEvent('page_view', { section, timestamp: new Date().toISOString() });
  },

  /**
   * Track button click
   */
  async trackButtonClick(buttonName: string, section?: string) {
    this.trackEvent('button_click', { buttonName, section });
  },

  /**
   * Track scroll interaction
   */
  async trackScroll(section: string, scrollPercentage: number) {
    this.trackEvent('scroll', { section, scrollPercentage });
  },

  /**
   * Track form interaction
   */
  async trackFormInteraction(formName: string, action: string) {
    this.trackEvent('form_interaction', { formName, action });
  },

  /**
   * Track component visibility
   */
  async trackComponentView(componentName: string) {
    this.trackEvent('component_viewed', { componentName });
  },

  /**
   * Track animation trigger
   */
  async trackAnimationTrigger(animationName: string) {
    this.trackEvent('animation_triggered', { animationName });
  },

  /**
   * Track error
   */
  async trackError(errorName: string, errorMessage: string) {
    this.trackEvent('error', { errorName, errorMessage });
  },

  /**
   * Track AI interaction
   */
  async trackAIInteraction(action: string, details?: Record<string, any>) {
    this.trackEvent('ai_interaction', { action, ...details });
  },
};
