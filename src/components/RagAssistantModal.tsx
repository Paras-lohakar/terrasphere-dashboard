import React, { useState } from 'react';
import { X, Send, Bot, User, Sparkles, Database, FileText } from 'lucide-react';
import { ChangeDetectionItem } from '../types/intelligence';

interface RagAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: ChangeDetectionItem;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sources?: string[];
}

export const RagAssistantModal: React.FC<RagAssistantModalProps> = ({
  isOpen,
  onClose,
  selectedItem
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: `Hello Analyst. I am the on-premises RAG Assistant connected to the OKF military ontology and local Sentinel-2 / Landsat vector index. How can I assist with Sector ${selectedItem.coordinates}?`,
      sources: ['OKF Doctrinal Rulebook (v4.1)', 'Sentinel-2 Ingestion Log T43QFB']
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = `Based on retrieved bi-temporal patches for coordinates ${selectedItem.coordinates}, spectral reflectance analysis reveals high albedo concrete foundations and roof structures emerging between 2024-12 and 2025-03 across ${selectedItem.areaChanged}. Distance to the water channel is approximately ${selectedItem.distanceToRiver}.`;
      if (userMsg.text.toLowerCase().includes('river')) {
        reply = `The detected construction is located 320 meters from the river perimeter. Hydrological buffer checks confirm no active levee breaching, but logistics access roads cut into the riverbank staging sector.`;
      } else if (userMsg.text.toLowerCase().includes('military') || userMsg.text.toLowerCase().includes('defence')) {
        reply = `Per OKF Strategic Ontology Rule 412, rectangular compounds of 2.4 ha with high albedo roofing within 500m of water corridors are classified as Potential Logistics Staging Outposts. Ground human intelligence (HUMINT) or drone confirmation recommended.`;
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: reply,
        sources: ['Sentinel-2 Multispectral Archive', 'PostGIS River Geometries', 'OKF Military Ontology']
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0c1424] border border-cyan-500/40 rounded-xl max-w-2xl w-full h-[600px] shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#080d17] border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-cyan-600/20 border border-cyan-500/40 text-cyan-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>RAG Assistant & OKF Knowledge Base</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  Air-Gapped LLM
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">Context: {selectedItem.title} ({selectedItem.coordinates})</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-cyan-600/30 border border-cyan-500/40 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-cyan-400" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-xl p-3.5 ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none shadow'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow'
                }`}
              >
                <p className="leading-relaxed">{m.text}</p>
                {m.sources && (
                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap gap-1 text-[10px] text-slate-400">
                    <span className="font-semibold text-cyan-400">Retrieved Context:</span>
                    {m.sources.map((s, idx) => (
                      <span key={idx} className="bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-[11px] shrink-0">
                  A
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Querying local vector embeddings & OKF ontology...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-[#080d17] border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask question about this change, historical timeline, or OKF military rules..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask</span>
          </button>
        </form>
      </div>
    </div>
  );
};
