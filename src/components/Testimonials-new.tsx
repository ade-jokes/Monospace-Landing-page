import React, { useEffect, useState } from "react";
import { ScrollReveal } from "./SharedAnimations";
import { api } from "../utils/api";
import { analytics } from "../utils/analytics";

interface Testimonial {
  id?: number;
  quote: string;
  client: string;
  company: string;
  location: string;
  accent?: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await api.getTestimonials();
        setTestimonials(data);
        await analytics.trackComponentView("testimonials");
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        // Fallback to default testimonial
        setTestimonials([{
          quote: 'The campaigns Monospace Digital ran increased our platform activity by 38.94% while reducing our Facebook advertising cost by 43.59%. They think like business partners, not just vendors.',
          client: 'Client',
          company: 'Paga',
          location: 'Lagos, Nigeria',
          accent: '#00C853'
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Use first testimonial
  const testimonial = testimonials[0];

  if (loading || !testimonial) {
    return null;
  }

  return (
    <section className="bg-[#F6F9FC] py-[140px] px-6 text-center">
      <div className="max-w-[700px] mx-auto">
        <ScrollReveal>
          {/* Large quote mark */}
          <div
            className="text-[#00C853] select-none mb-[8px] leading-[0.8]"
            style={{ fontSize: "80px", fontFamily: "Georgia, serif" }}
          >
            "
          </div>

          {/* Quote text */}
          <blockquote className="text-[21px] font-medium text-[#0A2540] leading-[1.68] italic tracking-tight">
            {testimonial.quote}
          </blockquote>

          {/* Attribution */}
          <div className="text-[13px] text-[#425466] tracking-[0.1em] uppercase font-bold mt-[28px]">
            — {testimonial.client} · {testimonial.company} · {testimonial.location}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
