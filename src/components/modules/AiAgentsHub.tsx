'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { AGENT_PROMPTS_SAMPLE } from '@/data/municipalData';
import { 
  Bot, 
  Send, 
  Sparkles, 
  IndianRupee, 
  Layers, 
  ShieldAlert, 
  ArrowUpNarrowWide, 
  FileText, 
  CheckCircle2, 
  MessageSquare,
  Clock,
  ChevronRight
} from 'lucide-react';

export const AiAgentsHub: React.FC = () => {
  const { agentMessages, sendAgentMessage, setActiveTab, currentCity } = useCivic();

  const [activeAgentType, setActiveAgentType] = useState<'budget' | 'infra' | 'risk' | 'priority' | 'report'>('budget');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const currentAgentMeta = AGENT_PROMPTS_SAMPLE.find(a => a.agent === activeAgentType) || AGENT_PROMPTS_SAMPLE[0];

  const filteredMessages = agentMessages.filter(m => m.agentType === activeAgentType);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    setInputText('');
    setIsTyping(true);
    await sendAgentMessage(activeAgentType, text);
    setTimeout(() => {
      setIsTyping(false);
    }, 650);
  };

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'budget':
        return <IndianRupee className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'infra':
        return <Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case 'risk':
        return <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'priority':
        return <ArrowUpNarrowWide className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'report':
        return <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Bot className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-2">
            <Bot className="w-3.5 h-3.5" /> AI Municipal Agents Hub
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white">
            Specialized Autonomous Civic Intelligence Agents
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Five domain-specific neural intelligence agents collaborating on budget formulation, infrastructure integrity, hazard prediction, project ranking, and council reporting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            5 Agents Synchronized
          </span>
        </div>
      </div>

      {/* 5 Agent Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {AGENT_PROMPTS_SAMPLE.map((agent) => {
          const isSelected = activeAgentType === agent.agent;
          return (
            <button
              key={agent.agent}
              onClick={() => setActiveAgentType(agent.agent as any)}
              className={`p-4 rounded-2xl text-left border transition-all ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-blue-600 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                  {getAgentIcon(agent.agent)}
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                {agent.title}
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                {agent.role}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Agent Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Agent Telemetry & Pre-Configured Queries (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950">
                {getAgentIcon(currentAgentMeta.agent)}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {currentAgentMeta.title}
                </h3>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Online • Ready for Municipal Inquiries
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              {currentAgentMeta.description}
            </p>
          </div>

          {/* Quick Municipal Inquiries */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Suggested Officer Queries
            </h4>

            <div className="space-y-2">
              {currentAgentMeta.suggestedQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 text-xs text-slate-700 dark:text-slate-300 transition-all flex items-center justify-between group"
                >
                  <span className="line-clamp-2">{q}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Chat & Telemetry Feed (8 cols) */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-[600px]">
          {/* Chat Messages */}
          <div className="overflow-y-auto space-y-4 pr-2 flex-1">
            {filteredMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs">
                <Bot className="w-8 h-8 text-slate-300 mb-2" />
                <p>No messages yet. Send a municipal question or click a suggested prompt.</p>
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'agent' && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-700 shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-xl p-3.5 rounded-2xl whitespace-pre-line leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-700 text-white rounded-br-none'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <p>{msg.content}</p>
                    <span className="block text-[9px] mt-1.5 opacity-60 text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))
            )}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-slate-400">
                <Bot className="w-4 h-4 animate-spin text-blue-600" />
                <span>{currentAgentMeta.title} is synthesizing municipal telemetry...</span>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Ask ${currentAgentMeta.title} regarding ${currentCity?.cityName || 'Selected Municipality'}...`}
              className="flex-1 p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
