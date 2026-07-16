import { useEffect, useState, useRef } from 'react';
import { analytics } from '../utils/analytics';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServicePillar {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  accentColor: string;
  services: string[];
}

export const Services = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const pillars: ServicePillar[] = [
    {
      id: 1,
      title: 'Quantum Engineering',
      description: 'Software architecture and engineering systems built for scale, performance, and resilience.',
      icon: '⚙️',
      color: '#635BFF',
      accentColor: 'from-blue-500 to-purple-600',
      services: [
        'Landing Page Development',
        'Company Website Development',
        'Custom Web App Development',
        'Mobile App Development',
        'Basic Online Store Development',
        'System Integration',
        'Web Hosting Solutions',
        'Website Maintenance & Support',
      ],
    },
    {
      id: 2,
      title: 'Digital Craftsmanship',
      description: 'AI automation, performance optimization, and intelligent workflows that multiply your team\'s impact.',
      icon: '✨',
      color: '#00FFFF',
      accentColor: 'from-cyan-400 to-blue-500',
      services: [
        'Paid Advertising Campaigns',
        'Email Marketing Campaigns',
        'Social Media Management',
        'Marketing Strategy Consultation',
        'SEO Strategy Consultation',
        'Product Launch Strategy',
        'Automated Document Processing',
        'AI-Powered Data Analytics',
      ],
    },
    {
      id: 3,
      title: 'Liquid Intelligence',
      description: 'Data architecture, analytics systems, and insights that transform raw information into competitive advantage.',
      icon: '💧',
      color: '#00FF88',
      accentColor: 'from-emerald-400 to-green-600',
      services: [
        'Analytics Dashboard Development',
        'Recommendation Engine Development',
        'AI-Powered Data Analytics',
        'SEO Audit',
        'Competitor Analysis',
        'Market Research & Positioning',
        'Funnel Optimization Audit',
        'Email Performance Analysis',
      ],
    },
  ];

  useEffect(() => {
    analytics.trackComponentView('services');

    // Stagger in the cards on scroll
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.service-card');
      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          duration: 1,
          opacity: 0,
          y: 40,
          delay: index * 0.15,
          ease: 'power3.out',
        });
      });
    }
  }, []);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    
    // Animate carousel scroll
    if (carouselRef.current) {
      const scrollAmount = index * 350;
      gsap.to(carouselRef.current, {
        scrollLeft: scrollAmount,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section className="w-full py-32 px-6 bg-black/30">
      <div ref={containerRef} className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="mb-24 text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-[-0.02em]">
            THE PILLARS OF<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400">
              TRANSFORMATION
            </span>
          </h2>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            Three interdependent systems designed to amplify your competitive advantage
          </p>
        </div>

        {/* 3 Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 mb-20">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="service-card group relative cursor-pointer transition-all duration-300"
              onClick={() => handleTabChange(idx)}
              onMouseEnter={() => setHoveredId(pillar.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Glow effect background */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
                style={{
                  background: pillar.color,
                }}
              />

              {/* Card border with neon glow */}
              <div
                className={`relative p-10 rounded-2xl backdrop-blur border transition-all duration-300 h-full ${
                  activeTab === idx
                    ? 'border-opacity-100 shadow-2xl ring-1'
                    : 'border-opacity-30'
                }`}
                style={{
                  borderColor: pillar.color,
                  ringColor: activeTab === idx ? `${pillar.color}40` : 'transparent',
                  boxShadow:
                    activeTab === idx
                      ? `0 0 30px ${pillar.color}40, inset 0 0 20px ${pillar.color}20`
                      : hoveredId === pillar.id
                      ? `0 0 20px ${pillar.color}20`
                      : 'none',
                  background: 'rgba(0, 0, 0, 0.4)',
                }}
              >
                {/* Icon */}
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 tracking-[-0.01em]">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-base font-light mb-6">
                  {pillar.description}
                </p>

                {/* Service count badge */}
                <div className="inline-block px-3 py-1 rounded-full text-sm font-medium" style={{
                  background: `${pillar.color}20`,
                  color: pillar.color,
                  border: `1px solid ${pillar.color}40`,
                }}>
                  {pillar.services.length} Services
                </div>

                {/* Accent line on hover */}
                <div
                  className="mt-6 h-1 w-0 rounded-full group-hover:w-12 transition-all duration-500"
                  style={{ background: pillar.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Services Carousel - Shows services for active tab */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">
              {pillars[activeTab].title} Services
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => handleTabChange((activeTab - 1 + pillars.length) % pillars.length)}
                className="p-3 rounded-lg border border-gray-700 hover:border-gray-500 hover:bg-gray-900/50 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-gray-300" />
              </button>
              <button
                onClick={() => handleTabChange((activeTab + 1) % pillars.length)}
                className="p-3 rounded-lg border border-gray-700 hover:border-gray-500 hover:bg-gray-900/50 transition-all"
              >
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>

          {/* Carousel Grid */}
          <div
            ref={carouselRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-cols-max overflow-x-auto pb-4"
            style={{
              gridAutoFlow: 'column',
              gridTemplateRows: 'repeat(2, 1fr)',
            }}
          >
            {pillars[activeTab].services.map((service, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-xl border border-gray-700 hover:border-gray-500 bg-gray-900/40 hover:bg-gray-900/60 transition-all min-w-[280px]"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                    style={{ background: pillars[activeTab].color }}
                  />
                  <p className="text-gray-200 font-medium group-hover:text-white transition-colors">
                    {service}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration callout */}
        <div className="mt-24 p-8 rounded-2xl border border-gray-700 bg-gradient-to-r from-gray-900/50 to-black/50 text-center">
          <p className="text-gray-300 text-lg">
            These pillars work in <span className="text-cyan-400 font-semibold">unified synchronization</span> —
            not as isolated services, but as an <span className="text-emerald-400 font-semibold">integrated ecosystem</span> designed for maximum impact.
          </p>
        </div>
      </div>
    </section>
  );
};
