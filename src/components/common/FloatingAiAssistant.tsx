'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  Sparkles, 
  X, 
  Send, 
  ChevronRight, 
  HelpCircle, 
  Bot, 
  ArrowUpRight, 
  Layers, 
  TrendingUp, 
  AlertTriangle,
  Maximize2,
  Minimize2
} from 'lucide-react';

export const FloatingAiAssistant: React.FC = () => {
  const { currentCity, setActiveTab } = useCivic();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{
    id: string;
    sender: 'user' | 'assistant';
    text: string;
    sources?: string[];
    actionLabel?: string;
    actionTab?: string;
  }>>([
    {
      id: 'initial',
      sender: 'assistant',
      text: `Hello! I am your AI Development Copilot for **${currentCity.cityName}, ${currentCity.state}**.\n\nAsk me anything about infrastructure risks, capital budget allocations, or ward priorities.`,
      sources: ['City Diagnostic Synthesis', 'WDI Pillar Metrics', '15th FC Allocations']
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const suggestedQuestions = [
    'What should this city prioritize next?',
    'Which ward is at highest risk?',
    'How should ₹5 crore be allocated?'
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || query;
    if (!q.trim()) return;

    setQuery('');
    const userMsgId = `user-${Date.now()}`;
    setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text: q }]);
    setIsGenerating(true);

    setTimeout(() => {
      let answer = '';
      let sources = ['OpenStreetMap Data', 'Grievance Reports', 'PDI Road Sensors'];
      let actionLabel: string | undefined;
      let actionTab: string | undefined;

      const lower = q.toLowerCase();

      if (lower.includes('prioritize') || lower.includes('build next') || lower.includes('what should')) {
        answer = `Based on multi-criteria analysis for **${currentCity.cityName}**:
1. **Ward 4 Drainage Upgrade** — Immediate priority (Score: 95/100). Benefits 18,200 residents and halts chronic monsoon waterlogging.
2. **Main Bazar CC Road Rehabilitation** — Second priority (Score: 89/100). Heavy commercial freight corridor with high pothole index.
3. **Ward 6 Feeder Water Pipeline** — Third priority (Score: 84/100). Resolves tail-end low pressure for 12,500 residents.`;
        sources = ['Monsoon Elevation Model', 'Grievance Density Index', 'Tender Registry'];
        actionLabel = 'View Priority Engine';
        actionTab = 'overview';
      } else if (lower.includes('risk') || lower.includes('which ward')) {
        answer = `**Ward 5 has the highest infrastructure risk** in ${currentCity.cityName}.
- **Primary Hazard:** Monsoon nullah backwater overflow (84% inundation probability).
- **Secondary Hazard:** Stagnant drainage causing vector-borne health risks.
- **Remediation Recommendation:** Expedite 1.8km RCC box drain and deploy dewatering diesel pumps prior to next precipitation window.`;
        sources = ['Hydrodynamic Basin Model', 'District Health Audit', 'Civic Complaints'];
        actionLabel = 'Inspect Risk Heatmap';
        actionTab = 'risks';
      } else if (lower.includes('₹5 crore') || lower.includes('5 cr') || lower.includes('allocated') || lower.includes('budget')) {
        answer = `If ${currentCity.cityName} has **₹5 Crore** to allocate for maximum citizen impact:
• **Drainage & Flood Defense (35% | ₹1.75 Cr):** Construct Ward 4 box drain and clear Ralegaon nullah outfall.
• **Roads & Transit (30% | ₹1.50 Cr):** Resurface the main market arterial CC road corridor.
• **Water Supply (20% | ₹1.00 Cr):** Extend feeder lines and automate elevated reservoir telemetry.
• **Sanitation & SWM (10% | ₹50 Lakhs):** Expand mechanized trommel waste segregation.
• **Smart Lighting (5% | ₹25 Lakhs):** Retrofit remaining dark corridors with automated LED poles.

*Projected Impact:* Raises Development Score by **+9.4 points** and benefits **85,000+ citizens**.`;
        sources = ['Pareto Capital Allocation Solver', 'CPHEEO Standards', '15th FC Tied Grants'];
        actionLabel = 'Open Budget Simulator';
        actionTab = 'budget';
      } else {
        answer = `Analysis for **${currentCity.cityName}**:
The municipality is currently operating with a **Development Score of ${currentCity.developmentScore}/100** and **Infrastructure Risk at ${currentCity.infrastructureRiskScore}%**. Key focus areas this quarter include pre-monsoon drainage desilting and commercial road asphalt maintenance.`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: answer,
          sources,
          actionLabel,
          actionTab
        }
      ]);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button (Perplexity Style) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-zinc-950 text-white shadow-xl hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 group border border-zinc-700/60"
        >
          <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px]">
            <Sparkles className="w-3 h-3" />
          </div>
          <span className="text-xs font-semibold tracking-tight">
            Ask CivicMind AI
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
            ⌘J
          </span>
        </button>
      )}

      {/* Modern Popover Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-4rem)] bg-white rounded-2xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 bg-zinc-50/50">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-zinc-950">CivicMind Copilot</h3>
                <p className="text-[10px] text-zinc-400">{currentCity.cityName}, {currentCity.state}</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[90%] whitespace-pre-line leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-zinc-900 text-white rounded-br-xs'
                      : 'bg-zinc-50 text-zinc-800 border border-zinc-200/70 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Sources tags */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-zinc-200/60 flex flex-wrap items-center gap-1.5 text-[10px] text-zinc-400">
                      <span className="font-semibold text-zinc-500">Sources:</span>
                      {msg.sources.map((s, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-white border border-zinc-200 text-zinc-600">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Link button */}
                  {msg.actionLabel && msg.actionTab && (
                    <button
                      onClick={() => {
                        setActiveTab(msg.actionTab as any);
                        setIsOpen(false);
                      }}
                      className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:underline"
                    >
                      <span>{msg.actionLabel}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isGenerating && (
              <div className="flex items-center gap-2 text-xs text-zinc-400 p-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                <span>Synthesizing municipal intelligence...</span>
              </div>
            )}
          </div>

          {/* Pre-configured Prompt Chips */}
          <div className="px-3 py-2 border-t border-zinc-100 bg-zinc-50/40 space-y-1.5">
            <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider px-1">
              Suggested Questions
            </p>
            <div className="flex flex-col gap-1">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white border border-zinc-200/80 hover:border-zinc-300 text-[11px] text-zinc-700 hover:text-zinc-950 truncate transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-zinc-200 flex items-center gap-2 bg-white"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about this city's development..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-white transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
