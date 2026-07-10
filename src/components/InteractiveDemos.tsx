import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sliders, BarChart3, Layers, Check, ArrowRight, TrendingUp } from "lucide-react";

interface InteractiveDemosProps {
  theme: "light" | "dark";
}

type DemoTab = "campaign" | "analytics" | "product";

export default function InteractiveDemos({ theme }: InteractiveDemosProps) {
  const [activeTab, setActiveTab] = useState<DemoTab>("campaign");

  // Campaign state
  const [googleBudget, setGoogleBudget] = useState<number>(60); // Percentage assigned to Google (rest goes to Meta)

  // Analytics State
  const [activeChannel, setActiveChannel] = useState<"unified" | "meta" | "google">("unified");

  // Product state
  const [designProgress, setDesignProgress] = useState<number>(75);

  const accentColor = "var(--accent-custom)";
  const ruleColor = "var(--border-custom)";
  const textColorMuted = "text-muted-custom";

  const handleTabChange = (tab: DemoTab) => {
    setActiveTab(tab);
  };

  // Derived campaign metrics based on budget allocation
  const optimizedCpc = (0.24 - (googleBudget / 100) * 0.10).toFixed(2);
  const cpcDecrease = (googleBudget * 0.72).toFixed(1);
  const conversionIncrease = (googleBudget * 0.65).toFixed(1);

  return (
    <section 
      id="capabilities" 
      className="py-32 px-6 sm:px-12 md:px-24 relative overflow-hidden transition-colors duration-500 border-t border-b border-zinc-800/20"
      style={{
        backgroundColor: theme === "dark" ? "#0A0A0B" : "#FAFAFA",
        color: theme === "dark" ? "#FFFFFF" : "#0A0A0A"
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div>
            <span 
              className="font-mono text-sm tracking-widest font-bold block mb-3 uppercase"
              style={{ color: accentColor }}
            >
              SIMULATIONS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              Interactive Value Frameworks
            </h2>
          </div>
          <p className="max-w-md text-[16px] font-normal text-[#CCCCCC]">
            Run real-time scenario modeling to explore how Monospace Digital coordinates software development, data analytics, and performance marketing.
          </p>
        </div>

        {/* WORKSPACE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* TAB CONTROL SIDEBAR (3 Columns) */}
          <div className="lg:col-span-3 flex flex-col space-y-3 justify-start">
            {[
              { id: "campaign", label: "Campaign Optimizer", desc: "ROI & Budget Allocation", icon: Sliders },
              { id: "analytics", label: "Unified Intelligence", desc: "Live Funnel Tracking", icon: BarChart3 },
              { id: "product", label: "Product Architecture", desc: "Blueprint to Interface Morph", icon: Layers },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as DemoTab)}
                  className={`w-full text-left p-5 rounded-sm border transition-all duration-300 flex items-center justify-between group ${
                    isSelected 
                      ? "text-zinc-900 dark:text-white" 
                      : "border-zinc-800/10 dark:border-zinc-800/40 bg-zinc-500/5 dark:bg-zinc-950/10 hover:border-zinc-800/30 text-zinc-500 dark:text-zinc-400"
                  }`}
                  style={{
                    borderColor: isSelected ? accentColor : undefined,
                    backgroundColor: isSelected 
                      ? (theme === "dark" ? "rgba(0, 255, 102, 0.05)" : "rgba(0, 168, 84, 0.03)")
                      : undefined
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <TabIcon 
                      className="w-4 h-4 transition-colors" 
                      style={{ color: isSelected ? accentColor : undefined }} 
                    />
                    <div>
                      <span className={`block text-sm font-semibold tracking-tight ${isSelected ? "text-zinc-900 dark:text-white" : ""}`}>
                        {tab.label}
                      </span>
                      <span className="block text-sm opacity-70 mt-0.5">
                        {tab.desc}
                      </span>
                    </div>
                  </div>
                  <ArrowRight 
                    className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" 
                    style={{ color: accentColor }}
                  />
                </button>
              );
            })}
          </div>

          {/* ACTIVE WORKSPACE AREA (9 Columns) */}
          <div 
            className="lg:col-span-9 border rounded-sm p-6 sm:p-8 flex flex-col justify-between min-h-[460px] relative transition-all duration-300 bg-white dark:bg-zinc-950/20"
            style={{ borderColor: ruleColor }}
          >
            {/* Inner Content Switch */}
            <div className="flex-grow flex flex-col justify-between">
              <AnimatePresence mode="wait">
                
                {/* 1. CAMPAIGN OPTIMIZER TAB */}
                {activeTab === "campaign" && (
                  <motion.div
                    key="campaign"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-lg font-semibold tracking-tight text-white">
                        Ad Spend Allocation Modeling
                      </h4>
                      <p className="text-[16px] mt-1 text-[#CCCCCC]">
                        Simulate reallocating digital advertising budget between marketing platforms. Note how overall acquisition cost dynamically decreases.
                      </p>
                    </div>

                    {/* Interactive Budget Allocator */}
                    <div className="p-5 border rounded-sm space-y-4 bg-zinc-500/5" style={{ borderColor: ruleColor }}>
                      <div className="flex justify-between font-mono text-sm text-[#CCCCCC]">
                        <span>META ADS: {100 - googleBudget}%</span>
                        <span className="font-bold" style={{ color: accentColor }}>ALLOCATION RATIO</span>
                        <span>GOOGLE ADS: {googleBudget}%</span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <input
                          type="range"
                          min="10"
                          max="90"
                          value={googleBudget}
                          onChange={(e) => {
                            setGoogleBudget(Number(e.target.value));
                          }}
                          className="w-full cursor-pointer h-1.5 rounded-sm outline-none bg-zinc-300 dark:bg-zinc-800"
                          style={{ accentColor: accentColor }}
                        />
                      </div>
                    </div>

                    {/* Performance Output Dashboard */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      {/* Metric 1: Optimized CPC */}
                      <div className="p-4 rounded-sm border flex flex-col justify-between bg-zinc-500/5" style={{ borderColor: ruleColor }}>
                        <span className="text-sm uppercase font-mono tracking-wider text-[#AAAAAA]">Projected CPC Cost</span>
                        <div className="my-3 text-2xl font-bold font-mono" style={{ color: accentColor }}>
                          ${optimizedCpc} <span className="text-xs font-normal text-zinc-500">USD</span>
                        </div>
                        <p className="text-sm leading-relaxed text-[#CCCCCC]">
                          Average client cost-per-click acquired across all ad channels.
                        </p>
                      </div>

                      {/* Metric 2: CPC Reduction */}
                      <div className="p-4 rounded-sm border flex flex-col justify-between bg-zinc-500/5" style={{ borderColor: ruleColor }}>
                        <span className="text-sm uppercase font-mono tracking-wider text-[#AAAAAA]">Budget Efficiency Gain</span>
                        <div className="my-3 text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
                          -{cpcDecrease}%
                        </div>
                        <p className="text-sm leading-relaxed text-[#CCCCCC]">
                          Percentage reduction in acquisition cost relative to baseline.
                        </p>
                      </div>

                      {/* Metric 3: Activity Projection */}
                      <div className="p-4 rounded-sm border flex flex-col justify-between bg-zinc-500/5" style={{ borderColor: ruleColor }}>
                        <span className="text-sm uppercase font-mono tracking-wider text-[#AAAAAA]">Conversion Lift</span>
                        <div className="my-3 text-2xl font-bold font-mono flex items-center space-x-1 text-zinc-900 dark:text-zinc-100">
                          <TrendingUp className="w-5 h-5 mr-1" style={{ color: accentColor }} />
                          <span>+{conversionIncrease}%</span>
                        </div>
                        <p className="text-sm leading-relaxed text-[#CCCCCC]">
                          Increase in final customer signups or conversions.
                        </p>
                      </div>

                    </div>
                  </motion.div>
                )}

                {/* 2. UNIFIED INTELLIGENCE (BI) */}
                {activeTab === "analytics" && (
                  <motion.div
                    key="analytics"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-semibold tracking-tight text-white">
                          Unified Business Intelligence Analytics
                        </h4>
                        <p className="text-[16px] mt-1 text-[#CCCCCC]">
                          Explore student acquisition and registration metrics unified across digital advertising pipelines.
                        </p>
                      </div>

                      {/* Channel Selectors */}
                      <div className="flex items-center space-x-1 border p-1 rounded bg-zinc-500/5 text-sm font-mono font-bold" style={{ borderColor: ruleColor }}>
                        {["unified", "meta", "google"].map((ch) => (
                          <button
                            key={ch}
                            onClick={() => { setActiveChannel(ch as any); }}
                            className={`px-3 py-1.5 uppercase rounded-sm transition-all ${
                              activeChannel === ch 
                                ? "bg-zinc-800 dark:bg-zinc-700 text-white" 
                                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                            }`}
                            style={{ color: activeChannel === ch ? accentColor : undefined }}
                          >
                            {ch}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Visual Funnel Bar Graph */}
                    <div className="space-y-3.5 p-5 border rounded-sm bg-zinc-500/5" style={{ borderColor: ruleColor }}>
                      {[
                        { 
                          stage: "Impressions Reached", 
                          unified: 1450000, meta: 820000, google: 630000, 
                          max: 1450000, format: "1.45M" 
                        },
                        { 
                          stage: "Ad Clicks Logged", 
                          unified: 92000, meta: 58000, google: 34000, 
                          max: 1450000, format: "92.0K" 
                        },
                        { 
                          stage: "Applications Started", 
                          unified: 14800, meta: 8900, google: 5900, 
                          max: 1450000, format: "14.8K" 
                        },
                        { 
                          stage: "Enrollments Completed", 
                          unified: 2450, meta: 1350, google: 1100, 
                          max: 1450000, format: "2.45K" 
                        }
                      ].map((item, idx) => {
                        const val = item[activeChannel];
                        const pct = Math.max(8, Math.round((val / item.unified) * 100));
                        
                        return (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-sm font-mono">
                              <span className="font-sans font-medium text-zinc-300">{item.stage}</span>
                              <span className="font-bold" style={{ color: accentColor }}>{item.format}</span>
                            </div>
                            
                            {/* Horizontal Bar */}
                            <div className="h-2.5 w-full bg-zinc-300 dark:bg-zinc-800 rounded-sm overflow-hidden relative">
                              <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 1.0, ease: "easeOut" }}
                                className="h-full rounded-sm"
                                style={{ backgroundColor: accentColor }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* 3. FIGMA BLUEPRINT TACTILE MORPH */}
                {activeTab === "product" && (
                  <motion.div
                    key="product"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-lg font-semibold tracking-tight text-white">
                        Product Interface Design Morphing
                      </h4>
                      <p className="text-[16px] mt-1 text-[#CCCCCC]">
                        Slide the controller to observe the precise transition from raw design layout wireframes to a finished, enterprise-ready digital interface.
                      </p>
                    </div>

                    {/* Draggable Slider Control */}
                    <div className="space-y-3 p-4 border rounded-sm bg-zinc-500/5" style={{ borderColor: ruleColor }}>
                      <div className="flex justify-between font-mono text-sm text-[#CCCCCC]">
                        <span>DESIGN BLUEPRINT (0%)</span>
                        <span className="font-bold" style={{ color: accentColor }}>TRANSITION PROGRESS: {designProgress}%</span>
                        <span>POLISHED INTERFACE (100%)</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={designProgress}
                          onChange={(e) => {
                            setDesignProgress(Number(e.target.value));
                          }}
                          className="w-full cursor-col-resize h-1.5 bg-zinc-300 dark:bg-zinc-800 rounded-sm outline-none"
                          style={{ accentColor: accentColor }}
                        />
                      </div>
                    </div>

                    {/* Morphing Visualization Area */}
                    <div className="h-44 border rounded-sm relative overflow-hidden flex items-center justify-center p-6 bg-zinc-500/5" style={{ borderColor: ruleColor }}>
                      
                      {/* Comparative Box Wrapper */}
                      <div className="relative w-[340px] h-[130px] rounded-md overflow-hidden flex items-center justify-center border border-zinc-800 shadow-xl bg-zinc-950">
                        
                        {/* BLUEPRINT BASE LAYER */}
                        <div 
                          className="absolute inset-0 bg-zinc-950 flex flex-col justify-between p-4 font-mono text-xs"
                          style={{ color: accentColor }}
                        >
                          <div className="flex justify-between text-[8px] border-b border-dashed pb-1.5 border-white/10">
                            <span>STRUCTURE_BLUEPRINT</span>
                            <span>GRID_ALIGNMENT</span>
                          </div>
                          
                          <div className="space-y-2 py-1">
                            <div className="flex items-center space-x-3">
                              <span className="w-2 h-2 rounded-full border border-dashed flex items-center justify-center text-[7px]" style={{ borderColor: accentColor }} />
                              <div className="h-1.5 w-24 border border-dashed" style={{ borderColor: accentColor }} />
                            </div>
                            <div className="h-1.5 w-full border border-dashed" style={{ borderColor: accentColor }} />
                            <div className="h-1.5 w-3/4 border border-dashed" style={{ borderColor: accentColor }} />
                          </div>

                          <div className="flex justify-between text-[7px] border-t border-dashed pt-1.5 border-white/10">
                            <span>RESPONSIVE SCHEMA</span>
                            <span>STATUS: STABLE</span>
                          </div>
                        </div>

                        {/* HIGH FI CARD: Slides on top using clip-path */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-zinc-950 flex flex-col justify-between p-4 shadow-2xl transition-all duration-75"
                          style={{
                            clipPath: `polygon(0 0, ${designProgress}% 0, ${designProgress}% 100%, 0% 100%)`,
                            opacity: designProgress > 2 ? 1 : 0,
                            borderRight: designProgress < 100 ? `1px solid ${accentColor}` : "none"
                          }}
                        >
                          <div className="flex justify-between items-center text-sm text-zinc-500">
                            <span className="flex items-center gap-1 font-semibold" style={{ color: accentColor }}>
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                              Corporate Portal
                            </span>
                            <span className="text-zinc-100 font-bold">$14,200</span>
                          </div>

                          <div className="my-auto p-2 rounded border border-white/5 bg-white/5 backdrop-blur-md flex items-center space-x-3">
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-950 font-bold font-sans text-sm"
                              style={{ 
                                background: `linear-gradient(135deg, ${accentColor}, #00FF66)`,
                              }}
                            >
                              M
                            </div>
                            <div className="space-y-0.5">
                              <span className="block text-sm font-semibold text-white tracking-wide">Finished Growth Analytics</span>
                              <span className="block text-sm text-zinc-400">Consistent typography & precise spacing</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-sm text-zinc-500 font-mono">
                            <span>SECURE FLOW</span>
                            <span className="font-bold" style={{ color: accentColor }}>STABLE PRODUCTION</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Bottom info note */}
            <div className="mt-8 pt-4 border-t flex flex-col sm:flex-row items-center justify-between text-sm text-[#CCCCCC] font-mono gap-4" style={{ borderColor: ruleColor }}>
              <span>* Demonstrations execute in the client, modeling actual enterprise conversion metrics.</span>
              <button 
                onClick={() => { handleTabChange(activeTab); }}
                className="flex items-center space-x-2 font-bold uppercase hover:opacity-80 transition-all text-sm"
                style={{ color: accentColor }}
              >
                <span>Reset Simulation</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
