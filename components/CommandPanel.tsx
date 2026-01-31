import React from 'react';
import { Activity, X, Globe, Radio } from 'lucide-react';
import { Briefing } from '../types';

interface CommandPanelProps {
  isOpen: boolean;
  onClose: () => void;
  briefing: Briefing | null;
  isLoading: boolean;
}

export const CommandPanel: React.FC<CommandPanelProps> = ({ isOpen, onClose, briefing, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 right-0 h-full w-full md:w-[500px] bg-[#0A0C10] border-l border-[#EDEFF2]/20 z-20 flex flex-col shadow-none slide-in-right">
      {/* Header */}
      <div className="h-20 border-b border-[#EDEFF2]/10 flex items-center justify-between px-8 bg-[#0A0C10]">
        <div className="flex flex-col">
            <span className="font-mono text-[10px] tracking-widest text-[#E6B450] uppercase mb-1">Directive // 44-X</span>
            <span className="font-serif text-lg text-[#EDEFF2] tracking-tight">ASSESSMENT PROTOCOL</span>
        </div>
        <button 
            onClick={onClose}
            className="text-[#EDEFF2]/40 hover:text-[#E6B450] transition-colors interactive"
        >
            <X size={20} strokeWidth={1} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-10 font-sans">
        {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-[#E6B450] space-y-6">
                <Activity className="animate-pulse" size={24} strokeWidth={1} />
                <span className="font-mono text-[10px] tracking-[0.2em] opacity-60">DECRYPTING...</span>
            </div>
        ) : briefing ? (
            <div className="space-y-10 animate-fade-in">
                {/* Meta Data Block */}
                <div className="grid grid-cols-2 gap-4 border-b border-[#EDEFF2]/10 pb-6">
                    <div>
                        <div className="font-mono text-[9px] text-[#EDEFF2]/40 uppercase tracking-widest mb-1">Vector ID</div>
                        <div className="font-mono text-sm text-[#E6B450]">{briefing.id}</div>
                    </div>
                    <div className="text-right">
                         <div className="font-mono text-[9px] text-[#EDEFF2]/40 uppercase tracking-widest mb-1">Timestamp</div>
                         <div className="font-mono text-sm text-[#EDEFF2]">{briefing.timestamp}</div>
                    </div>
                    <div className="col-span-2 mt-2">
                        <div className="inline-block border border-[#EDEFF2]/20 px-2 py-1">
                            <span className="font-mono text-[10px] text-[#EDEFF2] uppercase tracking-widest">{briefing.classification}</span>
                        </div>
                    </div>
                </div>

                {/* Subject */}
                <div>
                    <h2 className="font-serif text-2xl text-[#EDEFF2] leading-none mb-6">
                        {briefing.subject}
                    </h2>
                    <p className="text-[#EDEFF2]/80 text-sm leading-relaxed font-light">
                        {briefing.summary}
                    </p>
                </div>

                {/* Implications Grid */}
                <div>
                    <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#EDEFF2]/40 mb-4 border-b border-[#EDEFF2]/10 pb-2 inline-block">Strategic Implications</h3>
                    <div className="space-y-0">
                        {briefing.implications.map((imp, idx) => (
                            <div key={idx} className="flex gap-4 items-baseline py-3 border-b border-[#EDEFF2]/5 last:border-0">
                                <span className="font-mono text-[#E6B450] text-[10px] opacity-80">0{idx + 1}</span>
                                <p className="text-sm text-[#EDEFF2]/70 leading-relaxed font-light">{imp}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommendation (The 'Command') */}
                <div className="mt-12 bg-[#E6B450]/10 border border-[#E6B450]/20 p-6">
                     <h3 className="font-mono text-[9px] uppercase tracking-widest text-[#E6B450] mb-3">Executive Directive</h3>
                     <p className="font-serif text-lg text-[#EDEFF2] tracking-wide">
                        {briefing.recommendation}
                     </p>
                </div>
            </div>
        ) : (
            <div className="h-full flex items-center justify-center text-[#EDEFF2]/20 font-mono text-xs tracking-widest">
                AWAITING INPUT
            </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="h-16 border-t border-[#EDEFF2]/10 flex justify-between items-center px-8 bg-[#0A0C10]">
        <span className="font-mono text-[9px] text-[#EDEFF2]/30 uppercase tracking-widest">Sovereign v4.1.0</span>
        <div className="flex gap-6">
            <span className="flex items-center gap-2 font-mono text-[9px] text-[#EDEFF2]/50">
                <Globe size={10} /> SECURE
            </span>
            <span className="flex items-center gap-2 font-mono text-[9px] text-[#EDEFF2]/50">
                <Radio size={10} /> 12ms
            </span>
        </div>
      </div>
    </div>
  );
};
