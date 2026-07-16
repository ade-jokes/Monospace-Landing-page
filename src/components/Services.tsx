import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronLeft, ChevronRight, Clock, Layers, DollarSign, FileText } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InteractiveCard from "./InteractiveCard";
import { api } from "../utils/api";
import { analytics } from "../utils/analytics";
import { register3DTilt } from "../utils/tiltEffect";

gsap.registerPlugin(ScrollTrigger);

// All 48 services as requested
interface ServiceItem {
  id?: number;
  title: string;
  duration: string;
  tag: string;
  plusBadge?: string;
  category: string;
  price: string;
  contract: string;
  accent: string;
  desc: string;
}

const servicesData: ServiceItem[] = [
  {
    title: "Landing Page Development",
    duration: "3-7 days",
    tag: "Quick Start",
    plusBadge: "+1",
    category: "Engineering",
    price: "Essential",
    contract: "Fixed-Price",
    accent: "#00C853", // Vibrant Green
    desc: "High-converting, mobile-responsive single-page websites tailored to turn visitors into leads with premium load times."
  },
  {
    title: "Company Website Development",
    duration: "14-28 days",
    tag: "Website",
    plusBadge: "+1",
    category: "Engineering",
    price: "Growth",
    contract: "Fixed-Price",
    accent: "#0EA5E9", // Cyan
    desc: "A bespoke multipage digital experience designed to reflect your brand's authority, fully optimized for search and speed."
  },
  {
    title: "Paid Advertising Campaigns",
    duration: "7-14 days",
    tag: "Paid Ads",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Growth",
    contract: "Retainer",
    accent: "#635BFF", // Stripe Indigo
    desc: "Data-driven, highly optimized search and social ads to lower your cost-per-acquisition and scale revenue."
  },
  {
    title: "Custom Web App Development",
    duration: "30-90 days",
    tag: "Custom",
    plusBadge: "+1",
    category: "Engineering",
    price: "Enterprise",
    contract: "Fixed-Price",
    accent: "#FF2E93", // Bright Magenta
    desc: "Interactive, secure web tools and client portals built using advanced front-end modules and robust APIs."
  },
  {
    title: "Email Marketing Campaigns",
    duration: "30-365 days",
    tag: "Email Marketing",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Growth",
    contract: "Retainer",
    accent: "#F59E0B", // Warm Gold
    desc: "Automated, segmented email drip series and custom newsletters that nurture leads and convert prospects."
  },
  {
    title: "Mobile App Development",
    duration: "45-90 days",
    tag: "Mobile",
    plusBadge: "+1",
    category: "Engineering",
    price: "Enterprise",
    contract: "Fixed-Price",
    accent: "#0EA5E9",
    desc: "Native iOS and Android application codebases featuring offline support, custom interfaces, and smooth performance."
  },
  {
    title: "Basic Online Store Development",
    duration: "30-60 days",
    tag: "E-commerce",
    plusBadge: "+1",
    category: "Engineering",
    price: "Growth",
    contract: "Fixed-Price",
    accent: "#00C853",
    desc: "A fully integrated online boutique complete with automated inventory, secure payments, and custom checkout flows."
  },
  {
    title: "AI-Powered Data Analytics",
    duration: "28-56 days",
    tag: "AI",
    plusBadge: "+2",
    category: "AI & Data",
    price: "Enterprise",
    contract: "Fixed-Price",
    accent: "#635BFF",
    desc: "Machine learning algorithms and predictive models designed to uncover hidden trends in complex business operations."
  },
  {
    title: "Social Media Management",
    duration: "30-365 days",
    tag: "Social Media",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Growth",
    contract: "Retainer",
    accent: "#F59E0B",
    desc: "Consistent content production, platform monitoring, and proactive audience engagement to build organic loyalty."
  },
  {
    title: "Website Maintenance & Support",
    duration: "30-365 days",
    tag: "Maintenance",
    plusBadge: "+1",
    category: "Engineering",
    price: "Essential",
    contract: "Retainer",
    accent: "#0EA5E9",
    desc: "Regular updates, vulnerability scanning, security patches, and instant bug troubleshooting to keep your site pristine."
  },
  {
    title: "Logo design",
    duration: "7-30 days",
    tag: "logo",
    plusBadge: "+2",
    category: "Design & Branding",
    price: "Essential",
    contract: "Fixed-Price",
    accent: "#FF2E93",
    desc: "Timeless vector logo concepts and variations crafted specifically to define your modern enterprise visual anchor."
  },
  {
    title: "Brand Style Guide Development",
    duration: "10-21 days",
    tag: "Brand Identity",
    plusBadge: "+2",
    category: "Design & Branding",
    price: "Growth",
    contract: "Fixed-Price",
    accent: "#635BFF",
    desc: "Comprehensive guides covering precise color palettes, font pairings, layout rules, and tone guidelines for all channels."
  },
  {
    title: "Automated Document Processing Development",
    duration: "7-21 days",
    tag: "AI",
    plusBadge: "+2",
    category: "AI & Data",
    price: "Growth",
    contract: "Fixed-Price",
    accent: "#00C853",
    desc: "Intelligent systems that parse PDFs, contracts, and invoices automatically using modern optical character recognition."
  },
  {
    title: "Analytics Dashboard Development",
    duration: "21-35 days",
    tag: "Dashboards",
    plusBadge: "+1",
    category: "AI & Data",
    price: "Growth",
    contract: "Fixed-Price",
    accent: "#0EA5E9",
    desc: "Stunning, real-time data visualization consoles feeding key marketing metrics and financial KPIs to your leadership team."
  },
  {
    title: "Web Hosting Solutions",
    duration: "90-365 days",
    tag: "Hosting",
    plusBadge: "+1",
    category: "Engineering",
    price: "Essential",
    contract: "Retainer",
    accent: "#F59E0B",
    desc: "Ultra-secure, fully managed virtual private servers with 99.9% uptime, auto-scaling, and global CDN caching."
  },
  {
    title: "System Integration",
    duration: "30-60 days",
    tag: "Integration",
    plusBadge: "+1",
    category: "Engineering",
    price: "Enterprise",
    contract: "Fixed-Price",
    accent: "#FF2E93",
    desc: "Connecting disjointed platforms, CRM instances, inventory systems, and accounting tools via clean middleware pipelines."
  },
  {
    title: "Marketing Strategy Consultation",
    duration: "14-28 days",
    tag: "Strategy",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Essential",
    contract: "Fixed-Price",
    accent: "#635BFF",
    desc: "Customized multi-channel expansion blueprints built around your target user persona and unit economics."
  },
  {
    title: "SEO Strategy Consultation",
    duration: "14-28 days",
    tag: "SEO",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Essential",
    contract: "Fixed-Price",
    accent: "#00C853",
    desc: "An in-depth technical optimization blueprint focused on search engine indexing, target keyword maps, and link architecture."
  },
  {
    title: "Product Launch Strategy",
    duration: "14-28 days",
    tag: "Product Launch",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Growth",
    contract: "Fixed-Price",
    accent: "#0EA5E9",
    desc: "A highly coordinated marketing playbook to ensure maximum visual impact, PR coverage, and user signups on launch day."
  },
  {
    title: "Recommendation Engine Development",
    duration: "28-56 days",
    tag: "AI",
    plusBadge: "+2",
    category: "AI & Data",
    price: "Enterprise",
    contract: "Fixed-Price",
    accent: "#FF2E93",
    desc: "Intelligent collaborative filtering algorithms that suggest products or content dynamically to improve engagement."
  },
  {
    title: "SEO Audit",
    duration: "3-7 days",
    tag: "Essential",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Essential",
    contract: "Fixed-Price",
    accent: "#F59E0B",
    desc: "Rapid identification of crawl issues, broken paths, page speed bottlenecks, and semantic content improvements."
  },
  {
    title: "Customer Segmentation with AI",
    duration: "21-28 days",
    tag: "AI",
    plusBadge: "+2",
    category: "AI & Data",
    price: "Enterprise",
    contract: "Fixed-Price",
    accent: "#635BFF",
    desc: "Unsupervised machine learning cluster analysis that segments your users by purchase frequency and behavior."
  },
  {
    title: "Website Audit",
    duration: "3-7 days",
    tag: "Essential",
    plusBadge: "+1",
    category: "Engineering",
    price: "Essential",
    contract: "Fixed-Price",
    accent: "#00C853",
    desc: "Rigorous performance audit detailing accessibility standards, code errors, script efficiency, and mobile UX flaws."
  },
  {
    title: "Social Media Audit",
    duration: "3-7 days",
    tag: "Social Media",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Essential",
    contract: "Fixed-Price",
    accent: "#0EA5E9",
    desc: "A forensic analysis of historic engagement levels, platform metrics, posting frequency, and competitor performance."
  },
  {
    title: "Email Marketing Audit",
    duration: "3-7 days",
    tag: "Email Marketing",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Essential",
    contract: "Fixed-Price",
    accent: "#FF2E93",
    desc: "A complete diagnosis of spam rates, template rendering quality, CTR breakdowns, and contact list health."
  },
  {
    title: "Chatbot Development",
    duration: "14-28 days",
    tag: "Chatbot",
    plusBadge: "+2",
    category: "AI & Data",
    price: "Growth",
    contract: "Fixed-Price",
    accent: "#F59E0B",
    desc: "Responsive rule-based or context-aware chat solutions helping to automate standard customer service flows."
  },
  {
    title: "Automated Chatbot Development",
    duration: "21-35 days",
    tag: "Chatbot",
    plusBadge: "+2",
    category: "AI & Data",
    price: "Enterprise",
    contract: "Fixed-Price",
    accent: "#635BFF",
    desc: "Fully integrated LLM chatbot solutions connected to your proprietary knowledge base to resolve complex user queries."
  },
  {
    title: "Sentiment Analysis & Feedback Bot Development",
    duration: "14-21 days",
    tag: "AI",
    plusBadge: "+2",
    category: "AI & Data",
    price: "Enterprise",
    contract: "Fixed-Price",
    accent: "#00C853",
    desc: "Intelligent analytics systems scanning support transcripts to score positive or negative user sentiment in real-time."
  },
  {
    title: "Brand Positioning & Messaging",
    duration: "14-28 days",
    tag: "Branding",
    plusBadge: "+1",
    category: "Design & Branding",
    price: "Growth",
    contract: "Fixed-Price",
    accent: "#0EA5E9",
    desc: "Defining your distinct value proposition, messaging hierarchy, and copy tone to dominate competitive market sectors."
  },
  {
    title: "Smart Lead Scoring",
    duration: "14-28 days",
    tag: "Lead Scoring",
    plusBadge: "+2",
    category: "AI & Data",
    price: "Enterprise",
    contract: "Fixed-Price",
    accent: "#FF2E93",
    desc: "AI scoring models evaluating prospect profile attributes to prioritize sales calls and maximize conversion rates."
  },
  {
    title: "Conversion Rate Optimization",
    duration: "14-365 days",
    tag: "CRO",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Growth",
    contract: "Retainer",
    accent: "#F59E0B",
    desc: "Iterative landing page testing and checkout funnels optimized continuously to turn traffic into purchases."
  },
  {
    title: "User Experience (UX) Design",
    duration: "14-28 days",
    tag: "UX",
    plusBadge: "+1",
    category: "Design & Branding",
    price: "Growth",
    contract: "Fixed-Price",
    accent: "#635BFF",
    desc: "Wireframing, user-flow maps, interactive prototypes, and usability testing to ensure product design is highly intuitive."
  },
  {
    title: "API Integration Services",
    duration: "30-60 days",
    tag: "Integration",
    plusBadge: "+1",
    category: "Engineering",
    price: "Growth",
    contract: "Fixed-Price",
    accent: "#00C853",
    desc: "Secure, reliable backend API connections linking internal dashboards with external database servers and payment networks."
  },
  {
    title: "Customer Insights Analysis",
    duration: "30-Ongoing days",
    tag: "Customer Insights",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Growth",
    contract: "Retainer",
    accent: "#0EA5E9",
    desc: "Recurring deep-dive studies into customer satisfaction scores, churn habits, and multi-channel review logs."
  },
  {
    title: "A/B Testing and Reporting",
    duration: "14-Ongoing days",
    tag: "Optimization",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Growth",
    contract: "Retainer",
    accent: "#FF2E93",
    desc: "Rigorous scientific experiments comparing product variations, headlines, or button layouts to yield higher conversions."
  },
  {
    title: "Content Marketing Strategy",
    duration: "30-365 days",
    tag: "Content",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Growth",
    contract: "Retainer",
    accent: "#F59E0B",
    desc: "High-value blog content clusters, case studies, and lead magnets mapped out to build organic trust over time."
  },
  {
    title: "Customer Engagement Strategy",
    duration: "14-28 days",
    tag: "Customer Engagement",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Growth",
    contract: "Fixed-Price",
    accent: "#635BFF",
    desc: "Strategic user-onboarding playbooks and gamified rewards designed to increase daily active usage metrics."
  },
  {
    title: "Influencer Outreach & Partnerships",
    duration: "21-45 days",
    tag: "Influencer",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Growth",
    contract: "Fixed-Price",
    accent: "#00C853",
    desc: "Identifying and contracting key opinion leaders across Africa to authentically review and promote your company's product."
  },
  {
    title: "Content Creation & Management",
    duration: "30-Ongoing days",
    tag: "Content",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Growth",
    contract: "Retainer",
    accent: "#0EA5E9",
    desc: "Regular high-quality article writing, graphic design, and video shorts production keeping your feed highly active."
  },
  {
    title: "Social Media Campaign Development",
    duration: "21-45 days",
    tag: "Social Media",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Growth",
    contract: "Fixed-Price",
    accent: "#FF2E93",
    desc: "High-impact, custom viral or brand campaigns built to launch new collections and drive heavy social referral loops."
  },
  {
    title: "Lead Scoring & Management",
    duration: "30-Ongoing days",
    tag: "Lead Generation",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Growth",
    contract: "Retainer",
    accent: "#F59E0B",
    desc: "Integrating lead ingestion platforms and automating handoffs to sales representatives with full history logs."
  },
  {
    title: "Multilingual Website Development",
    duration: "30-90 days",
    tag: "Multilingual",
    plusBadge: "+1",
    category: "Engineering",
    price: "Enterprise",
    contract: "Fixed-Price",
    accent: "#635BFF",
    desc: "Localized web development supporting dynamic translations, region-specific media, and geo-targeted routing."
  },
  {
    title: "AI/ML Integration Services",
    duration: "28-42 days",
    tag: "AI",
    plusBadge: "+2",
    category: "AI & Data",
    price: "Enterprise",
    contract: "Fixed-Price",
    accent: "#00C853",
    desc: "Injecting powerful AI/ML models into preexisting pipelines, covering regression, classification, or dynamic content."
  },
  {
    title: "Data Warehousing Setup",
    duration: "30-90 days",
    tag: "Data Management",
    plusBadge: "+1",
    category: "AI & Data",
    price: "Enterprise",
    contract: "Fixed-Price",
    accent: "#0EA5E9",
    desc: "Aggregating your complex user, marketing, and transactional data into central cloud schemas for consolidated insights."
  },
  {
    title: "Performance Optimization Services",
    duration: "14-Ongoing days",
    tag: "Performance",
    plusBadge: "+1",
    category: "Engineering",
    price: "Growth",
    contract: "Fixed-Price",
    accent: "#FF2E93",
    desc: "Eliminating legacy slow scripts, compressing network media, and optimizing database indices to ensure maximum site speed."
  },
  {
    title: "Security Audit & Implementation",
    duration: "14-28 days",
    tag: "Security",
    plusBadge: "+1",
    category: "Engineering",
    price: "Enterprise",
    contract: "Fixed-Price",
    accent: "#F59E0B",
    desc: "Rigorous white-hat vulnerability penetration testing, server hardening, and strict SSL/CORS configurations."
  },
  {
    title: "Custom Database Development",
    duration: "30-60 days",
    tag: "Database",
    plusBadge: "+1",
    category: "Engineering",
    price: "Enterprise",
    contract: "Fixed-Price",
    accent: "#635BFF",
    desc: "Highly robust relational or NoSQL database architectures engineered specifically for low latency reads and writes."
  },
  {
    title: "Content Audit",
    duration: "3-7 days",
    tag: "Essential",
    plusBadge: "+1",
    category: "Marketing & Growth",
    price: "Essential",
    contract: "Fixed-Price",
    accent: "#00C853",
    desc: "A thorough qualitative review of all published web content to locate dead channels, outdated claims, or copy improvements."
  }
];

export default function Services() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Use GSAP to animate staggering entry of cards on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card-anim",
        { opacity: 0, x: 80, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.02,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // Use GSAP to smoothly animate horizontal gliding scroll
  const handleScrollClick = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 374; // Card width (350px) + Gap (24px)
    const currentScroll = container.scrollLeft;
    const targetScroll =
      direction === "left"
        ? Math.max(0, currentScroll - cardWidth * 2)
        : Math.min(container.scrollWidth - container.clientWidth, currentScroll + cardWidth * 2);

    gsap.to(container, {
      scrollLeft: targetScroll,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const getGlowColor = (accent: string) => {
    const acc = accent.toLowerCase();
    if (acc === "#00c853") return "rgba(0, 200, 83, 0.12)";
    if (acc === "#0ea5e9") return "rgba(14, 165, 233, 0.12)";
    if (acc === "#635bff") return "rgba(99, 91, 255, 0.15)";
    if (acc === "#ff2e93") return "rgba(255, 46, 147, 0.12)";
    if (acc === "#f59e0b") return "rgba(245, 158, 11, 0.12)";
    return "rgba(0, 200, 83, 0.10)";
  };

  return (
    <section
      id="services"
      className="bg-[#0B0B0F] py-[120px] relative overflow-hidden"
    >
      {/* Absolute ambient lights behind */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none z-0 opacity-40 blur-[130px]"
        style={{
          background: "radial-gradient(circle, rgba(99,91,255,0.08) 0%, rgba(0,200,83,0.04) 100%)"
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Typography-led Header Section with Nav controls aligned */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[12px] font-semibold text-[#00C853] tracking-[0.15em] uppercase mb-3 block">
              Services Directory
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-extrabold text-[#ECECF0] tracking-[-0.03em] leading-[1.1] max-w-[800px]">
              Browse our comprehensive list of digital services.
            </h2>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => handleScrollClick("left")}
              className="w-12 h-12 rounded-[12px] bg-[#131318] hover:bg-[#1C1C24] border border-[rgba(255,255,255,0.06)] text-[#6B7280] hover:text-[#ECECF0] flex items-center justify-center transition-all cursor-pointer hover:border-[rgba(255,255,255,0.12)] active:scale-95"
              title="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScrollClick("right")}
              className="w-12 h-12 rounded-[12px] bg-[#131318] hover:bg-[#1C1C24] border border-[rgba(255,255,255,0.06)] text-[#6B7280] hover:text-[#ECECF0] flex items-center justify-center transition-all cursor-pointer hover:border-[rgba(255,255,255,0.12)] active:scale-95"
              title="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Infinite Horizontal Deck */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing scroll-smooth"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {servicesData.map((service, index) => (
            <div
              key={service.title}
              className="service-card-anim snap-start shrink-0 w-[350px]"
            >
              <InteractiveCard
                accent={service.accent}
                glowColor={getGlowColor(service.accent)}
                className="group relative rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#131318] p-8 overflow-hidden h-[340px] flex flex-col justify-between"
              >
                {/* Top line with primary tag and visual +1/+2 badge resembling prompt styling */}
                <div className="flex items-center justify-between">
                  <span
                    className="inline-block rounded-[100px] px-2.5 py-0.5 text-[11px] font-semibold border"
                    style={{
                      backgroundColor: `${service.accent}14`,
                      borderColor: `${service.accent}33`,
                      color: service.accent,
                    }}
                  >
                    {service.tag}
                  </span>
                  <span className="text-[12px] font-extrabold text-[#6B7280] tracking-wider group-hover:text-[#ECECF0] transition-colors">
                    {service.plusBadge}
                  </span>
                </div>

                {/* Body content */}
                <div className="mt-6 flex-1">
                  <h3 className="text-[19px] font-bold text-[#ECECF0] tracking-tight group-hover:text-[#00C853] transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-[13.5px] text-[#6B7280] leading-[1.6] mt-3 line-clamp-4">
                    {service.desc}
                  </p>
                </div>

                {/* Footer metadata */}
                <div className="border-t border-[rgba(255,255,255,0.04)] pt-4 mt-4 flex items-center justify-between text-[11px] font-semibold text-[#6B7280]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#00C853]" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="uppercase text-[9px] tracking-wider px-1.5 py-0.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded">
                      {service.price}
                    </span>
                    <span className="text-[10px]">
                      {service.contract}
                    </span>
                  </div>
                </div>
              </InteractiveCard>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
