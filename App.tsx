import React, { useState } from 'react';
import { ThreatMap } from './components/ThreatMap';
import { generateBriefing } from './services/intelligenceService';
import { Briefing } from './types';
import { Compass, ShieldAlert, Activity, ArrowRight, ChevronDown, Lock } from 'lucide-react';

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full h-20 border-b border-[#EDEFF2]/10 bg-[#0A0C10]/90 backdrop-blur-md z-40 flex items-center justify-between px-8 md:px-16">
    <div className="flex items-center gap-4">
      <div className="w-4 h-4 bg-[#E6B450] rounded-sm"></div>
      <span className="font-serif text-lg tracking-tight text-[#EDEFF2]">SOVEREIGN</span>
    </div>
    <div className="hidden md:flex items-center gap-12 font-mono text-[10px] uppercase tracking-widest text-[#EDEFF2]/60">
      <a href="#doctrine" className="hover:text-[#E6B450] transition-colors">Doctrine</a>
      <a href="#capabilities" className="hover:text-[#E6B450] transition-colors">Capabilities</a>
      <a href="#intelligence" className="hover:text-[#E6B450] transition-colors">Intelligence</a>
    </div>
    <button className="px-6 py-2 border border-[#EDEFF2]/20 hover:border-[#E6B450] hover:text-[#E6B450] text-[#EDEFF2] font-mono text-xs tracking-widest transition-all">
      CLIENT ACCESS
    </button>
  </nav>
);

const SectionHeading = ({ number, title }: { number: string, title: string }) => (
  <div className="flex items-center gap-4 mb-12">
    <span className="font-mono text-[#E6B450] text-xs font-bold tracking-widest">{number}</span>
    <h2 className="font-serif text-3xl md:text-4xl text-[#EDEFF2]">{title}</h2>
    <div className="h-[1px] flex-1 bg-[#EDEFF2]/10 ml-8"></div>
  </div>
);

const CapabilityCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="group border border-[#EDEFF2]/10 p-8 hover:border-[#E6B450]/50 hover:bg-[#E6B450]/[0.02] transition-all duration-500">
    <Icon className="text-[#EDEFF2]/40 group-hover:text-[#E6B450] mb-6 transition-colors" size={24} strokeWidth={1} />
    <h3 className="font-serif text-xl text-[#EDEFF2] mb-4">{title}</h3>
    <p className="font-sans text-[#EDEFF2]/60 text-sm leading-relaxed">{desc}</p>
    <div className="mt-8 flex items-center gap-2 text-[#E6B450] opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
      <span className="font-mono text-[9px] uppercase tracking-widest">Explore Vector</span>
      <ArrowRight size={12} />
    </div>
  </div>
);

export default function App() {
  const [briefing, setBriefing] = useState<Briefing | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateBriefing = async () => {
    setLoading(true);
    try {
      // Simulate checking a live vector
      const result = await generateBriefing('LIVE-FEED-01', 'kinetic');
      setBriefing(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#EDEFF2] selection:bg-[#E6B450] selection:text-black">
      <Navbar />
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <ThreatMap isActive={true} />
      </div>

      <main className="relative z-10 pt-20">
        
        {/* HERO SECTION */}
        <section className="min-h-[90vh] flex flex-col justify-center px-8 md:px-16 max-w-7xl mx-auto">
          <div className="max-w-4xl fade-up">
            <div className="inline-flex items-center gap-3 border border-[#E6B450]/30 px-3 py-1 mb-8 bg-[#E6B450]/5">
              <span className="w-1.5 h-1.5 bg-[#E6B450] animate-pulse"></span>
              <span className="font-mono text-[10px] tracking-widest text-[#E6B450] uppercase">Global Threat Index: Elevated</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-[#EDEFF2] mb-8">
              Decisive Intelligence <br/>
              <span className="text-[#EDEFF2]/40">In An Uncertain World.</span>
            </h1>
            <p className="font-sans text-[#EDEFF2]/70 text-lg md:text-xl max-w-2xl leading-relaxed mb-12 border-l-2 border-[#E6B450] pl-6">
              Sovereign provides institutional memory and strategic foresight for defense, energy, and government sectors operating beyond the horizon.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="bg-[#E6B450] text-[#0A0C10] px-8 py-4 font-mono text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors">
                Initialize Assessment
              </button>
              <button className="border border-[#EDEFF2]/20 px-8 py-4 font-mono text-xs tracking-widest uppercase hover:border-[#EDEFF2] transition-colors">
                Read The Doctrine
              </button>
            </div>
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
            <ChevronDown size={24} />
          </div>
        </section>

        {/* DOCTRINE SECTION */}
        <section id="doctrine" className="py-32 px-8 md:px-16 bg-[#0A0C10]/90 backdrop-blur-sm border-t border-[#EDEFF2]/5">
          <div className="max-w-7xl mx-auto">
            <SectionHeading number="01" title="The Doctrine" />
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <p className="font-serif text-2xl leading-tight text-[#EDEFF2] mb-8">
                  We do not predict the future. We structure uncertainty to reveal the architecture of risk.
                </p>
                <div className="font-mono text-[10px] text-[#E6B450] uppercase tracking-widest mb-2">Operational Theory</div>
                <p className="font-sans text-[#EDEFF2]/60 text-sm leading-relaxed mb-6">
                  In a post-framework era, traditional intelligence models fail to account for non-linear state actors and decentralized kinetic vectors. Sovereign rebuilds the analyst's toolkit from the ground up, prioritizing raw signal over narrative cohesion.
                </p>
              </div>
              <div className="space-y-8 font-mono text-xs text-[#EDEFF2]/60">
                <div className="flex gap-4 border-b border-[#EDEFF2]/10 pb-4">
                  <span className="text-[#E6B450]">A.</span>
                  <p>Trust is a function of verified consequence, not polished presentation.</p>
                </div>
                <div className="flex gap-4 border-b border-[#EDEFF2]/10 pb-4">
                  <span className="text-[#E6B450]">B.</span>
                  <p>Speed of decision is the only competitive advantage in asymmetric conflict.</p>
                </div>
                <div className="flex gap-4 border-b border-[#EDEFF2]/10 pb-4">
                  <span className="text-[#E6B450]">C.</span>
                  <p>Data without directive is noise. We provide directives.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAPABILITIES SECTION */}
        <section id="capabilities" className="py-32 px-8 md:px-16 bg-[#0F1115] border-t border-[#EDEFF2]/5">
          <div className="max-w-7xl mx-auto">
            <SectionHeading number="02" title="Capabilities" />
            <div className="grid md:grid-cols-3 gap-6">
              <CapabilityCard 
                icon={Compass} 
                title="Strategic Foresight" 
                desc="Long-horizon modeling of geopolitical shifts, resource scarcity, and supply chain fragility." 
              />
              <CapabilityCard 
                icon={ShieldAlert} 
                title="Crisis Response" 
                desc="Real-time tactical support for institutional leaders during periods of high-velocity instability." 
              />
              <CapabilityCard 
                icon={Activity} 
                title="Kinetic Analysis" 
                desc="Mapping physical and cyber threats against sovereign assets using our proprietary 'Threat Horizon' methodology." 
              />
            </div>
          </div>
        </section>

        {/* LIVE INTELLIGENCE DEMO */}
        <section id="intelligence" className="py-32 px-8 md:px-16 bg-[#0A0C10] border-t border-[#EDEFF2]/5">
          <div className="max-w-7xl mx-auto">
            <SectionHeading number="03" title="Live Intelligence" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="font-serif text-2xl text-[#EDEFF2] mb-4">The Sovereign Engine</h3>
                <p className="font-sans text-[#EDEFF2]/60 mb-8 max-w-md">
                  Experience a sample of our automated threat assessment protocol. This system aggregates open-source intelligence and processes it through our proprietary directive engine.
                </p>
                <button 
                  onClick={handleGenerateBriefing}
                  disabled={loading}
                  className="group flex items-center gap-3 bg-[#EDEFF2] text-[#0A0C10] px-6 py-3 font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#E6B450] transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Activity className="animate-pulse" size={16} />
                      Running Analysis...
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      Generate Sample Briefing
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Output */}
              <div className="bg-[#0F1115] border border-[#EDEFF2]/10 p-8 min-h-[400px] font-mono relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#E6B450]/20"></div>
                
                {!briefing && !loading && (
                   <div className="h-full flex flex-col items-center justify-center text-[#EDEFF2]/20">
                      <div className="w-16 h-16 border border-[#EDEFF2]/10 rounded-full flex items-center justify-center mb-4">
                        <Lock size={24} />
                      </div>
                      <span className="text-xs uppercase tracking-widest">System Standby</span>
                   </div>
                )}

                {loading && (
                  <div className="space-y-2">
                    <div className="h-2 w-2/3 bg-[#EDEFF2]/10 animate-pulse"></div>
                    <div className="h-2 w-1/2 bg-[#EDEFF2]/10 animate-pulse delay-100"></div>
                    <div className="h-2 w-3/4 bg-[#EDEFF2]/10 animate-pulse delay-200"></div>
                    <div className="text-[#E6B450] text-xs mt-4">>> ACCESSING SECURE NODE...</div>
                  </div>
                )}

                {briefing && !loading && (
                  <div className="animate-fade-in space-y-6">
                    <div className="border-b border-[#EDEFF2]/10 pb-4 flex justify-between items-baseline">
                      <span className="text-[#E6B450] text-xs font-bold">{briefing.id}</span>
                      <span className="text-[#EDEFF2]/40 text-[10px]">{briefing.timestamp}</span>
                    </div>
                    
                    <div>
                      <h4 className="font-serif text-lg text-[#EDEFF2] mb-2">{briefing.subject}</h4>
                      <p className="text-[#EDEFF2]/70 text-xs leading-relaxed">{briefing.summary}</p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] text-[#EDEFF2]/40 uppercase tracking-widest">Implications</span>
                      {briefing.implications.map((imp, i) => (
                        <div key={i} className="flex gap-2 text-xs text-[#EDEFF2]/60">
                          <span className="text-[#E6B450]">></span>
                          {imp}
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-4 border-t border-[#EDEFF2]/10">
                      <span className="text-[9px] text-[#E6B450] uppercase tracking-widest block mb-2">Directive</span>
                      <p className="font-bold text-[#EDEFF2]">{briefing.recommendation}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-24 px-8 md:px-16 bg-[#0A0C10] border-t border-[#EDEFF2]/10 font-mono text-xs text-[#EDEFF2]/40">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
             <div className="space-y-4">
                <span className="block text-[#EDEFF2] font-serif text-lg">SOVEREIGN</span>
                <p className="max-w-xs">Restricted access advisory. All rights reserved 2024.</p>
             </div>
             <div className="grid grid-cols-2 gap-16">
                <div className="space-y-4 flex flex-col">
                   <span className="text-[#E6B450] uppercase tracking-widest">Offices</span>
                   <a href="#" className="hover:text-[#EDEFF2] transition-colors">London</a>
                   <a href="#" className="hover:text-[#EDEFF2] transition-colors">Washington D.C.</a>
                   <a href="#" className="hover:text-[#EDEFF2] transition-colors">Singapore</a>
                </div>
                <div className="space-y-4 flex flex-col">
                   <span className="text-[#E6B450] uppercase tracking-widest">Connect</span>
                   <a href="#" className="hover:text-[#EDEFF2] transition-colors">Secure Uplink</a>
                   <a href="#" className="hover:text-[#EDEFF2] transition-colors">Press Inquiries</a>
                   <a href="#" className="hover:text-[#EDEFF2] transition-colors">Careers</a>
                </div>
             </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
