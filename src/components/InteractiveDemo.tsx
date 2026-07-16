import React, { useEffect, useRef, useState } from "react";
import { Play, Send, Check, Sparkles } from "lucide-react";
import { api } from "../utils/api";
import { analytics } from "../utils/analytics";

interface ChatMessage {
  id: number;
  sender: "user" | "ai";
  text: string;
}

interface MovieItem {
  id: "gangs" | "anikulapo" | "thetrade";
  title: string;
  year: string;
  tag: string;
  rating: string;
  desc: string;
  gradient: string;
  accent: string;
}

export default function InteractiveDemo() {
  const [activeScreen, setActiveScreen] = useState<number>(0);
  const [revealed, setRevealed] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cycleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Screen 1 (Dashboard) states
  const [selectedMetric, setSelectedMetric] = useState<"growth" | "cpc" | "sales">("growth");

  // Screen 2 (AI Chat) states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, sender: "user", text: "How did our campaign perform last month?" },
    { id: 2, sender: "ai", text: "Last month, your campaigns generated 2.4M impressions with an outstanding 4.2% CTR — which is 38% above industry average. Let's look at the next steps!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  const presetResponses: Record<string, string> = {
    "What channels are working best?": "In Lagos, Instagram Reels and local news sponsorships are leading with an Acquisition Cost of ₦1,250. TikTok is scaling rapidly for younger demographics, with CPC at just ₦12.",
    "Optimize our conversion rate.": "I recommend streamlining the check-out flow to under 3 steps, adding mobile wallet (Paga/OPay) express checkout, and applying our custom hover-micro-interactions on critical buttons.",
    "Forecast next month's sales.": "Based on current lead volume and ad optimizations, we forecast a 15-22% lift in direct sales for Q3. We should allocate 10% more budget to retargeting."
  };

  // Screen 3 (Web App) states
  const [selectedMovie, setSelectedMovie] = useState<"gangs" | "anikulapo" | "thetrade">("gangs");
  const movies: MovieItem[] = [
    {
      id: "gangs",
      title: "Gangs of Lagos",
      year: "2023 · Action",
      tag: "Trending #1 in Nigeria",
      rating: "⭐ 4.8",
      desc: "A group of friends navigate destiny and survival on the bustling streets of Isale Eko.",
      gradient: "linear-gradient(135deg, #1A0A2E, #0A1A0E)",
      accent: "#00C853"
    },
    {
      id: "anikulapo",
      title: "Aníkúlápó",
      year: "2022 · Fantasy / Drama",
      tag: "Most Watched Epic",
      rating: "⭐ 4.9",
      desc: "A traveler dies and is resurrected by a mystical bird, granting him the power to conquer death.",
      gradient: "linear-gradient(135deg, #3E1D05, #120500)",
      accent: "#F59E0B"
    },
    {
      id: "thetrade",
      title: "The Trade",
      year: "2023 · Crime / Thriller",
      tag: "Critically Acclaimed",
      rating: "⭐ 4.7",
      desc: "A seasoned detective goes undercover to infiltrate a highly organized kidnapping syndicate.",
      gradient: "linear-gradient(135deg, #0A1F2D, #030C14)",
      accent: "#0EA5E9"
    }
  ];

  // IntersectionObserver for Animation 6 on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Cycle screens every 5 seconds, unless user interacted
  useEffect(() => {
    if (userInteracted) {
      if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
      return;
    }

    const startCycle = () => {
      cycleTimeoutRef.current = setTimeout(() => {
        setActiveScreen((prev) => (prev + 1) % 3);
      }, 5000);
    };

    startCycle();

    return () => {
      if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    };
  }, [activeScreen, userInteracted]);

  // Handle auto-scroll in AI chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isTyping]);

  const handleTabClick = (index: number) => {
    setUserInteracted(true);
    setActiveScreen(index);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    setUserInteracted(true);
    
    const newUserMsg: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: text
    };
    
    setChatMessages(prev => [...prev, newUserMsg]);
    setCustomPrompt("");
    setIsTyping(true);

    // Track AI interaction
    await analytics.trackAIInteraction("chat_message", { prompt: text });

    try {
      // Try to use Gemini AI API first
      const response = await api.chatWithAI(text);
      const responseText = response.response || "I've processed your request. Let's adjust your current budget by +15% to leverage high CTR placements and expand the Victoria Island geographical targeting.";
      
      const newAiMsg: ChatMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: responseText
      };
      setChatMessages(prev => [...prev, newAiMsg]);
    } catch (error) {
      console.error("AI response error:", error);
      // Fallback to preset responses if API fails
      const fallbackResponse = presetResponses[text] || "I've processed your request. Let's adjust your current budget by +15% to leverage high CTR placements and expand the Victoria Island geographical targeting.";
      const newAiMsg: ChatMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: fallbackResponse
      };
      setChatMessages(prev => [...prev, newAiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // SVG Chart path calculation based on selected metric
  const getChartPath = () => {
    switch (selectedMetric) {
      case "growth":
        return "M 0,110 C 100,105 150,55 200,50 C 250,45 300,15 400,10";
      case "cpc":
        return "M 0,10 C 100,15 150,45 200,60 C 250,75 300,90 400,105";
      case "sales":
        return "M 0,110 C 120,108 200,90 260,60 C 320,30 360,10 400,2";
      default:
        return "M 0,110 C 100,105 150,55 200,50 C 250,45 300,15 400,10";
    }
  };

  const currentMovie = movies.find(m => m.id === selectedMovie) || movies[0];

  return (
    <section
      ref={containerRef}
      id="interactive-demo"
      className="bg-[#0F0F14] py-[140px] px-6 overflow-hidden relative"
    >
      {/* Decorative gradient glowing backing inside */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[rgba(99,91,255,0.02)] filter blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1080px] mx-auto relative z-10">
        {/* Section header-like label */}
        <span className="block text-[12px] font-semibold tracking-[0.15em] text-[#635BFF] uppercase mb-[48px]">
          SEE IT IN ACTION
        </span>

        {/* Two column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[40px] lg:gap-[80px] items-center">
          
          {/* Left Column: Explanatory copy & controls */}
          <div
            style={{
              transition: "all 700ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className={`lg:col-span-5 ${
              revealed ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[40px]"
            }`}
          >
            <h2 className="font-extrabold text-[#ECECF0] tracking-[-0.03em] leading-[1.1] mb-[16px]" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Watch what we build.
            </h2>
            <p className="text-[16px] text-[#6B7280] leading-[1.7] mb-[24px]">
              Try it yourself. Interact with our live analytics dashboards, test our AI agent, or explore our media applications.
            </p>

            {/* Quick Helper Tip */}
            <div className="bg-[#15151F] border border-[rgba(255,255,255,0.04)] rounded-[12px] p-[16px_20px] mb-[32px] flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#00C853] shrink-0" />
              <p className="text-[13.5px] text-[#A0A0AB] leading-relaxed">
                Click tabs or tap buttons on the demo browser to experience real-time responses.
              </p>
            </div>

            {/* Feature Highlights list */}
            <div className="space-y-[20px]">
              {/* Highlight 1 */}
              <div 
                onClick={() => handleTabClick(0)}
                className={`flex gap-[12px] items-start cursor-pointer p-3 rounded-lg transition-all ${
                  activeScreen === 0 ? "bg-[rgba(255,255,255,0.03)] border-l-2 border-[#00C853]" : "hover:bg-[rgba(255,255,255,0.01)]"
                }`}
              >
                <div className="w-[8px] h-[8px] rounded-full bg-[#00C853] mt-[7px] flex-shrink-0" />
                <div>
                  <h4 className="text-[15px] font-semibold text-[#ECECF0] mb-[4px]">
                    Performance dashboards
                  </h4>
                  <p className="text-[13.5px] text-[#6B7280] leading-[1.6]">
                    Real-time campaign analytics with interactive data charts and filters.
                  </p>
                </div>
              </div>

              {/* Highlight 2 */}
              <div 
                onClick={() => handleTabClick(1)}
                className={`flex gap-[12px] items-start cursor-pointer p-3 rounded-lg transition-all ${
                  activeScreen === 1 ? "bg-[rgba(255,255,255,0.03)] border-l-2 border-[#635BFF]" : "hover:bg-[rgba(255,255,255,0.01)]"
                }`}
              >
                <div className="w-[8px] h-[8px] rounded-full bg-[#635BFF] mt-[7px] flex-shrink-0" />
                <div>
                  <h4 className="text-[15px] font-semibold text-[#ECECF0] mb-[4px]">
                    AI-powered assistants
                  </h4>
                  <p className="text-[13.5px] text-[#6B7280] leading-[1.6]">
                    Intelligent chat engines that process natural language for direct optimization.
                  </p>
                </div>
              </div>

              {/* Highlight 3 */}
              <div 
                onClick={() => handleTabClick(2)}
                className={`flex gap-[12px] items-start cursor-pointer p-3 rounded-lg transition-all ${
                  activeScreen === 2 ? "bg-[rgba(255,255,255,0.03)] border-l-2 border-[#0EA5E9]" : "hover:bg-[rgba(255,255,255,0.01)]"
                }`}
              >
                <div className="w-[8px] h-[8px] rounded-full bg-[#0EA5E9] mt-[7px] flex-shrink-0" />
                <div>
                  <h4 className="text-[15px] font-semibold text-[#ECECF0] mb-[4px]">
                    Rich media applications
                  </h4>
                  <p className="text-[13.5px] text-[#6B7280] leading-[1.6]">
                    Responsive, high-performance web platforms that engage millions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stripe-style browser mockup */}
          <div
            style={{
              transition: "all 700ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className={`lg:col-span-7 ${
              revealed ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[40px]"
            }`}
          >
            {/* Browser Frame */}
            <div className="relative bg-[#1A1A2E] border border-[rgba(255,255,255,0.08)] rounded-[14px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5),_0_0_0_1px_rgba(255,255,255,0.04)]">
              
              {/* Browser Chrome Bar */}
              <div className="h-[40px] bg-[#111118] flex items-center px-[16px] gap-[8px] border-b border-[rgba(255,255,255,0.04)]">
                {/* 3 circles */}
                <div className="flex items-center gap-[6px]">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#FF5F57]" />
                  <span className="w-[6px] h-[6px] rounded-full bg-[#FEBC2E]" />
                  <span className="w-[6px] h-[6px] rounded-full bg-[#28C840]" />
                </div>

                {/* Address Bar */}
                <div className="bg-[rgba(255,255,255,0.05)] rounded-[6px] h-[24px] flex-grow mx-[16px] flex items-center px-[10px] text-[11px] text-[#6B7280] font-mono">
                  monospacedigital.com/demo
                </div>
              </div>

              {/* Content Area: height 340px, overflow hidden */}
              <div className="h-[340px] overflow-hidden relative">
                
                {/* Screen 1: Analytics Dashboard */}
                <div
                  style={{
                    backgroundColor: "#0D0D14",
                    transition: "opacity 300ms ease-in-out",
                  }}
                  className={`absolute inset-0 p-[20px] flex flex-col justify-between ${
                    activeScreen === 0 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  {/* Top row */}
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] font-bold text-white tracking-tight">Monospace Analytics</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-[6px] h-[6px] rounded-full bg-[#00C853] animate-pulse" />
                      <span className="text-[11px] font-bold text-[#00C853]">Live</span>
                    </div>
                  </div>

                  {/* 3 stats card row (INTERACTIVE) */}
                  <div className="grid grid-cols-3 gap-[10px] mt-[12px]">
                    <button
                      onClick={() => { setUserInteracted(true); setSelectedMetric("growth"); }}
                      className={`rounded-[8px] p-[10px_12px] text-left transition-all ${
                        selectedMetric === "growth"
                          ? "bg-[#00C853]/[0.08] border border-[#00C853]/30"
                          : "bg-[#131320] border border-transparent hover:border-[rgba(255,255,255,0.06)]"
                      }`}
                    >
                      <div className={`text-[17px] font-extrabold ${selectedMetric === "growth" ? "text-[#00C853]" : "text-[#ECECF0]"}`}>+38.94%</div>
                      <div className="text-[10px] text-[#6B7280] font-medium leading-none mt-1">User Growth</div>
                    </button>

                    <button
                      onClick={() => { setUserInteracted(true); setSelectedMetric("cpc"); }}
                      className={`rounded-[8px] p-[10px_12px] text-left transition-all ${
                        selectedMetric === "cpc"
                          ? "bg-[#00C853]/[0.08] border border-[#00C853]/30"
                          : "bg-[#131320] border border-transparent hover:border-[rgba(255,255,255,0.06)]"
                      }`}
                    >
                      <div className={`text-[17px] font-extrabold ${selectedMetric === "cpc" ? "text-[#00C853]" : "text-[#ECECF0]"}`}>-43.59%</div>
                      <div className="text-[10px] text-[#6B7280] font-medium leading-none mt-1">CPC Reduction</div>
                    </button>

                    <button
                      onClick={() => { setUserInteracted(true); setSelectedMetric("sales"); }}
                      className={`rounded-[8px] p-[10px_12px] text-left transition-all ${
                        selectedMetric === "sales"
                          ? "bg-[#F59E0B]/[0.08] border border-[#F59E0B]/30"
                          : "bg-[#131320] border border-transparent hover:border-[rgba(255,255,255,0.06)]"
                      }`}
                    >
                      <div className={`text-[17px] font-extrabold ${selectedMetric === "sales" ? "text-[#F59E0B]" : "text-[#ECECF0]"}`}>+346.10%</div>
                      <div className="text-[10px] text-[#6B7280] font-medium leading-none mt-1">Sales Increase</div>
                    </button>
                  </div>

                  {/* Dynamic Line Chart with CSS transitioned d attribute */}
                  <div className="h-[120px] w-full mt-[12px] flex items-end relative">
                    <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="none">
                      {/* Grid lines */}
                      <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="90" x2="400" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      
                      {/* Interactive Smooth Curve */}
                      <path
                        d={getChartPath()}
                        fill="none"
                        stroke={selectedMetric === "sales" ? "#F59E0B" : "#00C853"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="transition-all duration-[600ms] ease-in-out"
                      />
                      
                      {/* Fill area under curve */}
                      <path
                        d={`${getChartPath()} L 400,120 L 0,120 Z`}
                        fill={selectedMetric === "sales" ? "url(#orangeChartGrad)" : "url(#greenChartGrad)"}
                        opacity="0.08"
                        className="transition-all duration-[600ms] ease-in-out"
                      />
                      
                      {/* Definitions */}
                      <defs>
                        <linearGradient id="greenChartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#00C853" />
                          <stop offset="100%" stopColor="#00C853" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="orangeChartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#F59E0B" />
                          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Pulsing focal point indicator */}
                    <div 
                      className="absolute flex items-center justify-center transition-all duration-[600ms] ease-in-out"
                      style={{
                        right: selectedMetric === "sales" ? "2px" : "4px",
                        top: selectedMetric === "sales" ? "2px" : selectedMetric === "cpc" ? "105px" : "10px"
                      }}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full border-2 border-[#0D0D14] animate-ping absolute ${
                        selectedMetric === "sales" ? "bg-[#F59E0B]" : "bg-[#00C853]"
                      }`} />
                      <span className={`w-2 h-2 rounded-full ${
                        selectedMetric === "sales" ? "bg-[#F59E0B]" : "bg-[#00C853]"
                      }`} />
                    </div>
                  </div>

                  {/* Footer metadata */}
                  <div className="text-[11px] text-[#4A4A54] mt-[8px] flex items-center justify-between">
                    <span>Client: Paga · Q4 Campaign</span>
                    <span className="uppercase text-[9px] tracking-wider bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] px-1.5 py-0.5 rounded text-[#8F8F9F]">
                      {selectedMetric === "growth" ? "Audience Growth Plan" : selectedMetric === "cpc" ? "Cost Efficiency" : "Conversion Scaling"}
                    </span>
                  </div>
                </div>

                {/* Screen 2: AI Chat Interface */}
                <div
                  style={{
                    backgroundColor: "#0A0A12",
                    transition: "opacity 300ms ease-in-out",
                  }}
                  className={`absolute inset-0 p-[20px] flex flex-col justify-between ${
                    activeScreen === 1 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  {/* Header */}
                  <div className="flex justify-between items-center border-b border-[rgba(255,255,255,0.04)] pb-[8px]">
                    <span className="text-[13px] font-bold text-white">Monospace AI Advisor</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-[6px] h-[6px] rounded-full bg-[#635BFF] animate-ping" />
                      <span className="w-[6px] h-[6px] rounded-full bg-[#635BFF]" />
                    </div>
                  </div>

                  {/* Message stack - scrollable */}
                  <div className="flex-grow flex flex-col justify-start gap-[10px] my-3 overflow-y-auto scrollbar-none text-[11.5px] pr-1 max-h-[170px]">
                    {chatMessages.map(msg => (
                      <div
                        key={msg.id}
                        className={`p-[9px_13px] max-w-[85%] leading-[1.5] ${
                          msg.sender === "user"
                            ? "bg-[#1A1A2E] text-[#ECECF0] rounded-[12px_12px_2px_12px] ml-auto"
                            : "bg-gradient-to-br from-[rgba(99,91,255,0.15)] to-[rgba(0,200,83,0.08)] border border-[#635BFF]/15 text-[#ECECF0] rounded-[12px_12px_12px_2px]"
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))}
                    
                    {/* Simulated Typing State */}
                    {isTyping && (
                      <div className="bg-[#131318] rounded-[12px] p-[10px_14px] inline-flex gap-[4px] mr-auto">
                        <span className="w-[5px] h-[5px] rounded-full bg-[#635BFF] animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-[5px] h-[5px] rounded-full bg-[#635BFF] animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-[5px] h-[5px] rounded-full bg-[#635BFF] animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Preset Quick Actions & TextInput row */}
                  <div className="space-y-2 mt-auto">
                    {/* Suggested preset chips */}
                    {!isTyping && chatMessages.length < 5 && (
                      <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1 shrink-0">
                        {Object.keys(presetResponses).map(q => (
                          <button
                            key={q}
                            onClick={() => handleSendMessage(q)}
                            className="bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.06)] text-[9.5px] text-[#A0A0AB] hover:text-[#ECECF0] px-2.5 py-1 rounded-[100px] whitespace-nowrap transition-colors shrink-0 cursor-pointer"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Chat Form */}
                    <form 
                      onSubmit={(e) => { e.preventDefault(); handleSendMessage(customPrompt); }}
                      className="flex gap-1.5 relative items-center"
                    >
                      <input
                        type="text"
                        placeholder="Type standard prompt..."
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        disabled={isTyping}
                        className="w-full bg-[#13131C] border border-[rgba(255,255,255,0.06)] rounded-[8px] pl-3 pr-10 py-1.5 text-[11px] text-[#ECECF0] placeholder-[#4A4A54] focus:outline-none focus:border-[#635BFF] transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={!customPrompt.trim() || isTyping}
                        className="absolute right-1.5 text-[#635BFF] hover:text-[#ECECF0] disabled:opacity-40 transition-colors cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>

                {/* Screen 3: Web App (Gangs of Lagos) */}
                <div
                  style={{
                    background: currentMovie.gradient,
                    transition: "background 500ms ease-in-out, opacity 300ms ease-in-out",
                  }}
                  className={`absolute inset-0 p-[20px] flex flex-col justify-between ${
                    activeScreen === 2 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  {/* Mini nav */}
                  <div className="flex justify-between items-center border-b border-[rgba(255,255,255,0.04)] pb-[6px]">
                    <span className="text-[10px] font-bold text-white tracking-widest uppercase">PRIME STREAM</span>
                    <span className="text-[10px] font-extrabold text-[#6B7280]">{currentMovie.rating}</span>
                  </div>

                  {/* Interactive Film Selector chips */}
                  <div className="flex gap-1.5 mt-2">
                    {movies.map(m => (
                      <button
                        key={m.id}
                        onClick={() => { setUserInteracted(true); setSelectedMovie(m.id); }}
                        className={`text-[9px] font-bold px-2 py-1 rounded-[4px] border transition-all cursor-pointer ${
                          selectedMovie === m.id
                            ? "bg-white text-black border-white"
                            : "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.06)] text-[#A0A0AB] hover:text-[#ECECF0]"
                        }`}
                      >
                        {m.title.split(" ")[0]}
                      </button>
                    ))}
                  </div>

                  {/* Animated Hero card */}
                  <div className="rounded-[10px] p-[18px_20px] mt-[10px] bg-black/[0.25] border border-[rgba(255,255,255,0.04)]">
                    <span className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 bg-white/[0.06] border border-white/[0.08] rounded text-[#00C853] mb-1.5 inline-block">
                      {currentMovie.tag}
                    </span>
                    <h3 className="text-[20px] font-extrabold text-white tracking-tight leading-none transition-all duration-300">
                      {currentMovie.title}
                    </h3>
                    <p className="text-[10.5px] text-[#A0A0AB] mt-[4px]">
                      {currentMovie.year}
                    </p>
                    <p className="text-[11.5px] text-[#6B7280] leading-[1.5] mt-2 line-clamp-2">
                      {currentMovie.desc}
                    </p>
                    
                    <button
                      onClick={() => alert(`Streaming "${currentMovie.title}" in HD...`)}
                      className="shimmer-btn bg-[#00C853] hover:bg-[#00A844] text-[#080808] text-[10.5px] font-bold px-4 py-1.5 rounded-[5px] mt-3 inline-flex items-center gap-1.5 hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-black" />
                      Watch Trailer
                    </button>
                  </div>

                  {/* Action Chips */}
                  <div className="flex items-center gap-[8px] mt-[10px]">
                    <span className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] rounded-[100px] px-[12px] py-[4px] text-[10px] text-[#6B7280] cursor-default font-semibold">
                      Action
                    </span>
                    <span className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] rounded-[100px] px-[12px] py-[4px] text-[10px] text-[#6B7280] cursor-default font-semibold">
                      Drama
                    </span>
                    <span className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] rounded-[100px] px-[12px] py-[4px] text-[10px] text-[#6B7280] cursor-default font-semibold">
                      Nollywood
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Screen Navigation Tabs */}
            <div className="mt-[16px] flex justify-center items-center gap-[8px] flex-wrap">
              <button
                onClick={() => handleTabClick(0)}
                className={`text-[12px] rounded-[100px] px-[16px] py-[6px] border font-semibold cursor-pointer transition-all duration-200 ${
                  activeScreen === 0
                    ? "bg-[rgba(0,200,83,0.08)] border-[rgba(0,200,83,0.3)] text-[#00C853]"
                    : "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.06)] text-[#6B7280] hover:text-[#ECECF0] hover:border-[rgba(255,255,255,0.14)]"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => handleTabClick(1)}
                className={`text-[12px] rounded-[100px] px-[16px] py-[6px] border font-semibold cursor-pointer transition-all duration-200 ${
                  activeScreen === 1
                    ? "bg-[rgba(99,91,255,0.08)] border-[rgba(99,91,255,0.3)] text-[#635BFF]"
                    : "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.06)] text-[#6B7280] hover:text-[#ECECF0] hover:border-[rgba(255,255,255,0.14)]"
                }`}
              >
                AI Assistant
              </button>
              <button
                onClick={() => handleTabClick(2)}
                className={`text-[12px] rounded-[100px] px-[16px] py-[6px] border font-semibold cursor-pointer transition-all duration-200 ${
                  activeScreen === 2
                    ? "bg-[rgba(14,165,233,0.08)] border-[rgba(14,165,233,0.3)] text-[#0EA5E9]"
                    : "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.06)] text-[#6B7280] hover:text-[#ECECF0] hover:border-[rgba(255,255,255,0.14)]"
                }`}
              >
                Web App
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
