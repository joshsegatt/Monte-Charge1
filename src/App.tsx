/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  ArrowUpRight, 
  Settings, 
  ShieldCheck, 
  Shield,
  Clock, 
  MapPin, 
  ChevronRight, 
  Menu, 
  X,
  Dna,
  Zap,
  Activity,
  Drill,
  Anchor
} from 'lucide-react';
import Lenis from 'lenis';
import { cn } from './lib/utils';

// --- Components ---

const MCLogo = ({ size = 40, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={cn("filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]", className)}
  >
    <defs>
      {/* High-fidelity metallic gradient with dynamic range */}
      <linearGradient id="premiumSteel" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFA15C" />
        <stop offset="25%" stopColor="#FF5304" />
        <stop offset="50%" stopColor="#FFC187" />
        <stop offset="75%" stopColor="#FF5304" />
        <stop offset="100%" stopColor="#8F2D00" />
      </linearGradient>

      {/* Advanced PBR lighting system */}
      <filter id="hyperRender" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
        
        {/* Key Light (Top-Left) */}
        <feSpecularLighting in="blur" surfaceScale="7" specularConstant="1.8" specularExponent="40" lightingColor="#FFFFFF" result="key">
          <fePointLight x="-5000" y="-8000" z="15000" />
        </feSpecularLighting>
        <feComposite in="key" in2="SourceAlpha" operator="in" result="key" />

        {/* Rim Light (Back-Right) for edge definition */}
        <feSpecularLighting in="blur" surfaceScale="4" specularConstant="2.2" specularExponent="12" lightingColor="#FFD8B8" result="rim">
          <fePointLight x="6000" y="6000" z="8000" />
        </feSpecularLighting>
        <feComposite in="rim" in2="SourceAlpha" operator="in" result="rim" />

        {/* Ambient Occlusion simulation */}
        <feOffset in="blur" dx="1" dy="1" result="ao" />
        <feComposite in="ao" in2="SourceGraphic" operator="out" result="ao" />

        {/* Final Compositing */}
        <feComposite in="SourceGraphic" in2="key" operator="arithmetic" k1="0" k2="1" k3="0.8" k4="0" result="merged1" />
        <feComposite in="merged1" in2="rim" operator="arithmetic" k1="0" k2="1" k3="0.5" k4="0" />
      </filter>

      {/* Holographic scanning line gradient */}
      <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
    </defs>
    
    <g filter="url(#hyperRender)">
      {/* Geometric Chassis - Engineered for precision */}
      <path 
        d="M10 74H62V52H82V62H88V74H92V78H10V74Z" 
        fill="url(#premiumSteel)" 
      />
      
      {/* Reinforced Boom Base */}
      <rect x="30" y="64" width="12" height="10" rx="1.5" fill="#1A1A1A" />
      <path d="M36 64V54" stroke="#333" strokeWidth="4" strokeLinecap="round" />

      {/* Sleek Telescopic Structure */}
      <g transform="rotate(-38 36 68)">
        {/* Segment 1 */}
        <rect x="34" y="10" width="14" height="58" fill="url(#premiumSteel)" rx="1" />
        <rect x="37" y="12" width="8" height="54" fill="#000" fillOpacity="0.15" rx="0.5" />
        {/* Segment 2 - Inner Extension */}
        <rect x="38" y="-12" width="6" height="30" fill="#FFD8B8" rx="0.5" />
        
        {/* Technical Detail: Bolts & Sensors */}
        <circle cx="41" cy="18" r="1.2" fill="white" opacity="0.6" />
        <circle cx="41" cy="34" r="1.2" fill="white" opacity="0.6" />
        <circle cx="41" cy="50" r="1.2" fill="white" opacity="0.6" />
      </g>

      {/* Precision Hub Wheels */}
      <g>
        <circle cx="26" cy="78" r="9" fill="#0D0D0D" stroke="#222" strokeWidth="0.5" />
        <circle cx="26" cy="78" r="4.5" stroke="url(#premiumSteel)" strokeWidth="2.5" fill="none" />
        <circle cx="70" cy="78" r="9" fill="#0D0D0D" stroke="#222" strokeWidth="0.5" />
        <circle cx="70" cy="78" r="4.5" stroke="url(#premiumSteel)" strokeWidth="2.5" fill="none" />
      </g>

      {/* Surface Micro-Detailing */}
      <path d="M12 75H90" stroke="white" strokeWidth="0.5" strokeLinecap="round" opacity="0.15" />
      <rect x="83" y="65" width="4" height="2" fill="white" opacity="0.4" />
    </g>

    {/* Dynamic Scan Anim (The UE5 "Juice") */}
    <rect x="10" y="10" width="80" height="2" fill="url(#scanGradient)" className="animate-[bounce_4s_infinite] opacity-20 pointer-events-none" />
  </svg>
);

const Nav = ({ onContactClick }: { onContactClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Expertise', 'Flotte', 'Protocoles', 'Contact'];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 px-6 md:px-12 flex justify-between items-center",
      scrolled ? "bg-petrol/80 backdrop-blur-xl border-b border-sand/10 py-4" : "bg-transparent"
    )}>
      <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <MCLogo size={48} className="group-hover:scale-110 transition-transform duration-500" />
        <span className="text-2xl font-black tracking-tighter uppercase">Monte Charge</span>
      </div>

      <div className="hidden md:flex items-center gap-10 lg:gap-16 text-[11px] font-bold uppercase tracking-[0.3em] text-steel">
        {navItems.map((item) => (
          item === 'Contact' ? (
            <button 
              key={item} 
              onClick={onContactClick}
              className="text-off-white border-b border-orange/0 hover:border-orange transition-all pb-1 cursor-pointer"
            >
              {item}
            </button>
          ) : (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-off-white border-b border-orange/0 hover:border-orange transition-all pb-1 group cursor-pointer">
              {item}
            </a>
          )
        ))}
      </div>

      <div className="hidden md:flex items-center gap-8">
        <div className="flex flex-col items-end font-mono text-right">
          <span className="text-[9px] text-steel tracking-widest">GENÈVE 16:44</span>
        </div>
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-off-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-petrol z-50 flex flex-col p-12"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-display font-black uppercase tracking-tighter text-2xl">Menu</span>
              <button onClick={() => setIsOpen(false)} className="w-12 h-12 glass flex items-center justify-center"><X size={24} /></button>
            </div>
            <div className="flex flex-col gap-10 text-5xl font-black uppercase tracking-tighter">
              {navItems.map((item, i) => (
                <motion.button 
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  onClick={() => {
                    setIsOpen(false);
                    if (item === 'Contact') onContactClick();
                    else window.location.hash = `#${item.toLowerCase()}`;
                  }}
                  className="text-left hover:text-orange transition-colors"
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const GlassIcon = ({ icon: Icon, className }: { icon: any, className?: string }) => (
  <div className={cn("icon-3d-container relative w-12 h-12 flex items-center justify-center group", className)}>
    <div className="icon-3d-glow" />
    <motion.div 
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="icon-3d-content"
    >
      <Icon size={24} className="text-orange drop-shadow-[0_4px_8px_rgba(255,83,4,0.4)]" />
    </motion.div>
  </div>
);

const SectionHeader = ({ title, sub, mono }: { title: string, sub?: string, mono?: string }) => (
  <div className="mb-10 md:mb-16 lg:mb-20">
    <div className="flex items-center gap-4 mb-4">
      <div className="h-px w-8 md:w-12 bg-orange" />
      <span className="font-mono text-[10px] md:text-xs text-orange tracking-widest uppercase">{mono}</span>
    </div>
    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70.5px] font-bold mb-6 overflow-hidden">
      <motion.span
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="inline-block"
      >
        {title}
      </motion.span>
    </h2>
    {sub && <p className="text-steel max-w-xl text-sm md:text-lg lg:text-xl leading-relaxed">{sub}</p>}
  </div>
);

const TechnicalCard = ({ 
  icon: Icon, 
  title, 
  desc, 
  specs, 
  gridSpan = "col-span-1",
  isLive = false
}: { 
  icon: any, 
  title: string, 
  desc: string, 
  specs: string[], 
  gridSpan?: string,
  isLive?: boolean
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ rotateY: 5, rotateX: -2, translateZ: 20 }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true }}
    className={cn(
      "group bento-box p-8 md:p-10 flex flex-col h-full",
      gridSpan
    )}
  >
    <div className="bento-shimmer" />
    
    <div className="flex justify-between items-start mb-10 relative z-10">
      <GlassIcon icon={Icon} />
      <div className="flex gap-4 items-center">
        {isLive && (
          <div className="flex items-center gap-2 px-2 py-1 bg-orange/10 border border-orange/20 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
            <span className="font-mono text-[8px] text-orange uppercase tracking-widest font-bold">Live IoT</span>
          </div>
        )}
        <div className="w-2.5 h-2.5 rounded-full bg-white/5 border border-white/10 group-hover:bg-orange group-hover:border-orange group-hover:shadow-[0_0_15px_rgba(255,83,4,0.6)] transition-all duration-500" />
      </div>
    </div>
    
    <div className="flex-1 space-y-6 relative z-10">
      <h3 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase group-hover:text-orange transition-colors duration-500 leading-none">
        {title}
      </h3>
      <p className="text-steel text-sm md:text-base leading-relaxed font-light italic opacity-80 group-hover:opacity-100 transition-opacity">
        {desc}
      </p>
    </div>

    <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
      {specs.map((spec, i) => (
        <div key={i} className="space-y-1.5 group/spec">
          <div className="font-mono text-[8px] text-steel/30 uppercase tracking-[0.25em] transition-colors group-hover/spec:text-steel/50">
            {spec.split(':')[0]}
          </div>
          <div className="font-mono text-xs text-orange font-semibold tracking-tighter flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-orange/40" />
            {spec.split(':')[1]}
          </div>
        </div>
      ))}
    </div>
    
    {/* Minimal technical grid overlay */}
    <div className="absolute inset-0 technical-grid opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 pointer-events-none" />
  </motion.div>
);

// --- Content ---

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-petrol/90 backdrop-blur-2xl"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl bg-petrol border border-white/5 shadow-2xl rounded-[3rem] overflow-hidden relative z-10 technical-grid"
          >
            <div className="absolute top-8 right-8 z-20">
              <button 
                onClick={onClose}
                className="w-12 h-12 glass flex items-center justify-center hover:bg-orange hover:text-black transition-all group"
              >
                <X size={24} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 md:p-16 bg-white/5 border-r border-white/5">
                <SectionHeader 
                  title="Secteur Technique" 
                  sub="Bureau d'études Monte Charge à Genève. Une réponse technique sous 24h garantie." 
                  mono="Enquiry"
                />
                
                <div className="space-y-10 mt-12">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 glass flex items-center justify-center shrink-0 border-white/5">
                      <MapPin className="text-orange" size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold mb-1 text-base uppercase tracking-wider">Siège Social</h5>
                      <p className="text-steel text-sm leading-relaxed font-light italic">Rue de Lyon, 1211 Genève, Suisse</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 glass flex items-center justify-center shrink-0 border-white/5">
                      <Activity className="text-orange" size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold mb-1 text-base uppercase tracking-wider">Support 24/7</h5>
                      <p className="text-steel text-sm leading-relaxed font-light italic">+41 22 000 00 00 <br /> contact@montecharge-geneve.ch</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 md:p-16">
                <form className="space-y-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="font-mono text-[9px] uppercase text-steel tracking-[0.2em]">Identité</label>
                      <input type="text" className="w-full bg-transparent border-b border-white/10 pb-3 focus:border-orange outline-none transition-all text-base placeholder:text-steel/20" placeholder="Jean Dupont / CERN" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-[9px] uppercase text-steel tracking-[0.2em]">Spécificité</label>
                      <select className="w-full bg-transparent border-b border-white/10 pb-3 focus:border-orange outline-none transition-all text-base appearance-none cursor-pointer">
                        <option className="bg-petrol">Monte-Meubles Lourd</option>
                        <option className="bg-petrol">Unité Compacte</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase text-steel tracking-[0.2em]">Contact Direct</label>
                    <input type="email" className="w-full bg-transparent border-b border-white/10 pb-3 focus:border-orange outline-none transition-all text-base placeholder:text-steel/20" placeholder="service@domain.ch" />
                  </div>
                  <button className="w-full py-6 bg-orange text-black font-extrabold uppercase tracking-[0.3em] hover:bg-white transition-all flex justify-center items-center gap-4 text-[11px]">
                    Lancer l'Analyse
                    <ArrowUpRight size={18} />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const QuoteOnboardingModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // Reset step on close
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setStep(1), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-petrol/95 backdrop-blur-3xl"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-4xl bg-petrol border border-white/10 rounded-[3rem] overflow-hidden relative z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
          >
            {/* Design elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
              <motion.div 
                className="h-full bg-orange" 
                animate={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>

            <div className="p-8 md:p-16">
              <div className="flex justify-between items-center mb-12 lg:mb-16">
                <div>
                  <div className="font-mono text-[10px] text-orange tracking-[0.3em] uppercase mb-2">Analyse NIVEAU 0{step} / 0{totalSteps}</div>
                  <h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter">
                    {step === 1 && "Configuration du Service"}
                    {step === 2 && "Logistique d'Accès"}
                    {step === 3 && "Vérification Finale"}
                  </h2>
                </div>
                <button onClick={onClose} className="w-12 h-12 glass flex items-center justify-center hover:bg-orange hover:text-black transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {[
                        { title: 'Standard', desc: 'Déménagement résidentiel classique de haute qualité.', icon: ChevronRight },
                        { title: 'Industriel', desc: 'Charges lourdes, machines, coffre-forts ou pianos.', icon: Anchor }
                      ].map((item) => (
                        <button 
                          key={item.title}
                          onClick={nextStep}
                          className="p-8 glass text-left border-white/5 hover:border-orange/40 transition-all group relative overflow-hidden flex flex-col"
                        >
                          <div className="absolute inset-0 technical-grid opacity-[0.03]" />
                          <item.icon className="text-orange mb-6 group-hover:scale-110 transition-transform" size={40} strokeWidth={1.5} />
                          <h4 className="text-xl font-bold uppercase mb-2 tracking-tight">{item.title}</h4>
                          <p className="text-steel text-sm leading-relaxed font-light">{item.desc}</p>
                          <div className="mt-auto pt-8 flex items-center gap-2 text-[10px] font-mono text-orange tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                            Sélectionner <ArrowUpRight size={14} />
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                          <label className="font-mono text-[10px] uppercase text-steel tracking-[0.2em] opacity-50">Étage de Livraison</label>
                          <input type="number" className="w-full bg-transparent border-b border-white/10 pb-4 focus:border-orange outline-none transition-all text-4xl font-bold text-orange" placeholder="0" />
                        </div>
                        <div className="space-y-4">
                          <label className="font-mono text-[10px] uppercase text-steel tracking-[0.2em] opacity-50">Localisation (GE)</label>
                          <input type="text" className="w-full bg-transparent border-b border-white/10 pb-4 focus:border-orange outline-none transition-all text-4xl font-bold text-off-white" placeholder="Genève" />
                        </div>
                      </div>
                      <div className="p-8 glass bg-white/[0.02] border-white/5 rounded-2xl">
                        <div className="flex items-start gap-6 text-steel">
                          <Activity size={24} className="text-orange shrink-0 animate-pulse" />
                          <div>
                            <p className="text-sm font-medium text-off-white mb-2 uppercase tracking-wide">Bureau d'études actif</p>
                            <p className="text-xs leading-relaxed font-light">Nos experts analyseront la topographie et l'accessibilité via imagerie satellite après soumission.</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                          <label className="font-mono text-[10px] uppercase text-steel tracking-[0.2em] opacity-50">Canal de Contact (Email)</label>
                          <input type="email" className="w-full bg-transparent border-b border-white/10 pb-4 focus:border-orange outline-none transition-all text-xl font-medium" placeholder="votre@email.ch" />
                        </div>
                        <div className="space-y-4">
                          <label className="font-mono text-[10px] uppercase text-steel tracking-[0.2em] opacity-50">Numéro de Téléphone</label>
                          <input type="tel" className="w-full bg-transparent border-b border-white/10 pb-4 focus:border-orange outline-none transition-all text-xl font-medium" placeholder="+41 ..." />
                        </div>
                      </div>
                      <button 
                        onClick={onClose}
                        className="w-full py-8 bg-orange text-black font-black uppercase tracking-[0.4em] hover:bg-white transition-all shadow-[0_0_50px_rgba(255,83,4,0.15)] text-xs"
                      >
                        Générer le Devis Gratuit
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
                {step > 1 ? (
                  <button onClick={prevStep} className="flex items-center gap-3 text-[10px] font-mono text-steel hover:text-off-white transition-colors uppercase tracking-[0.2em]">
                    <ChevronRight className="rotate-180" size={16} /> Précédent
                  </button>
                ) : <div />}
                
                {step > 1 && step < totalSteps && (
                  <button onClick={nextStep} className="flex items-center gap-3 text-[10px] font-mono text-orange hover:text-off-white transition-colors uppercase tracking-[0.2em]">
                    Suivant <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-petrol">
      <Nav onContactClick={() => setIsContactOpen(true)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <QuoteOnboardingModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      {/* Visual Background */}
      <div className="fixed inset-0 -z-10 bg-petrol" />
      <div className="fixed inset-0 -z-10 technical-grid opacity-40 pointer-events-none" />
      
      {/* Scroll Progress Indicator */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-orange z-[60] origin-left" style={{ scaleX }} />

      {/* --- HERO --- */}
      <section className="relative min-h-screen flex items-center py-20 lg:py-32 px-4 md:px-8 lg:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-6 space-y-10"
          >
            <div className="space-y-6">
              
              <div className="h-[120px] md:h-[200px] flex items-center relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={headlineIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-x-0"
                  >
                    <h1 className="text-5xl md:text-[72px] leading-[1.1] font-bold tracking-tighter uppercase font-display">
                      {[
                        <span key="0">LOCATION<br/><span className="text-steel/50 italic">MONTE-MEUBLES</span>.</span>,
                        <span key="1">PRÉCISION<br/><span className="text-steel/50 italic">MONTE CHARGE</span>.</span>,
                        <span key="2">SÉCURITÉ<br/><span className="text-steel/50 italic">GARANTIE</span>.</span>,
                        <span key="3">EXPERTISE<br/><span className="text-steel/50 italic">GENEVOISE</span>.</span>
                      ][headlineIndex]}
                    </h1>
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="text-lg leading-relaxed text-steel max-w-[460px] font-light">
                Le spécialiste du monte-meubles à Genève. Solutions de levage haute performance pour vos déménagements et manutentions industrielles complexes.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={() => setIsQuoteOpen(true)}
                className="w-full sm:w-auto px-12 py-6 bg-orange text-black text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all group shadow-[0_0_30px_rgba(255,83,4,0.2)] flex items-center justify-center gap-4"
              >
                Devis Gratuit
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-wrap gap-8 font-mono text-[9px] text-steel/40 uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2 saturate-0 opacity-60"><Shield size={12} className="text-orange" /> Assurance All-Risk</div>
              <div className="flex items-center gap-2 saturate-0 opacity-60"><Clock size={12} className="text-orange" /> Disponibilité 24/7</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-6 relative flex items-center justify-center"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,83,4,0.1)_0%,transparent_60%)] pointer-events-none" />
            
            <div className="relative z-20 group">
              <img 
                src="https://picsum.photos/seed/industrial-lift-truck-3d/1200/800" 
                alt="Truck Monte Charge 3D UE5" 
                className="w-full h-auto drop-shadow-[0_45px_70px_rgba(0,0,0,0.9)] filter brightness-110 group-hover:scale-105 transition-transform duration-[2000ms] object-contain mix-blend-screen"
                referrerPolicy="no-referrer"
              />
              {/* Dynamic Lens Flare / Specular highlight */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange/40 blur-[100px] animate-pulse rounded-full pointer-events-none" />
              <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
            </div>

            {/* Scanning Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange/20 to-transparent h-1 w-full translate-y-full animate-[scan_3s_linear_infinite] opacity-30 z-30 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* --- WORK CAROUSEL (CENTIPEDE MODE) --- */}
      <div className="py-10 bg-petrol overflow-hidden border-t border-b border-white/5 relative">
        <div className="absolute inset-0 technical-grid opacity-[0.02] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8 flex justify-between items-end">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-orange rounded-full animate-pulse" />
              <span className="font-mono text-[9px] uppercase text-orange tracking-[0.3em]">Log de Mission</span>
            </div>
            <h3 className="text-xl md:text-2xl font-display font-black uppercase tracking-tighter">Interventions Récentes</h3>
          </div>
          <div className="hidden md:block font-mono text-[9px] text-steel/30 uppercase tracking-[0.2em]">
            Flux de données en temps réel - Genève & District
          </div>
        </div>

        <div className="flex">
          <motion.div 
            className="flex gap-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className="relative w-[280px] h-[180px] flex-shrink-0 border border-white/5 group"
              >
                <img 
                  src={`https://picsum.photos/seed/crane-${(i % 6) + 1}/600/400`} 
                  alt="Mission Log" 
                  className="w-full h-full object-cover filter saturate-50 brightness-75 group-hover:saturate-100 group-hover:brightness-100 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Visual frame corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-orange/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-orange/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-4 left-4 font-mono text-[8px] tracking-widest text-off-white">
                  <div className="text-orange opacity-60 mb-1">REF: MC_OPE_{2026 + i}</div>
                  <div className="flex items-center gap-2">
                    <MapPin size={8} className="text-orange" />
                    <span>SECTEUR_0{(i % 4) + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* --- MANIFESTO --- */}
      <motion.section 
        id="expertise" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 lg:py-32 px-4 md:px-8 lg:px-12 relative flex items-center"
      >
        <div className="max-w-7xl mx-auto w-full">
          <SectionHeader 
            title="Savoir-Faire Suisse" 
            sub="Une excellence opérationnelle sans compromis. Nous déployons des solutions de levage de précision adaptées aux environnements les plus exigeants de Genève." 
            mono="Excellence"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: Settings, 
                title: "Logistique Haute-Performance", 
                desc: "Optimisation des flux de levage pour minimiser les interruptions de service et maximiser l'efficacité de vos transferts.", 
                anim: { rotate: 90 } 
              },
              { 
                icon: ShieldCheck, 
                title: "Sécurité Certifiée", 
                desc: "Conformité totale aux normes SUVA et européennes. Chaque intervention est encadrée par un expert certifié.", 
                anim: { scale: 1.1 } 
              },
              { 
                icon: Clock, 
                title: "Réactivité Absolue", 
                desc: "Service 24/7 pour les urgences. Installation rapide et mise en service immédiate sur tout le bassin genevois.", 
                anim: { scale: 1.05 } 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bento-box p-8 md:p-12 background-grid hover:bg-white/5 transition-all group"
              >
                <GlassIcon icon={item.icon} className="mb-8" />
                <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase leading-tight">{item.title}</h3>
                <p className="text-steel text-sm leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- SERVICES --- */}
      <motion.section 
        id="flotte" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 lg:py-32 px-4 md:px-8 lg:px-12 relative bg-petrol border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            title="Unités Flotte" 
            sub="Une gamme complète de monte-meubles sur camions et remorques pour répondre à tous vos défis techniques." 
            mono="Hardware"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-auto">
            <TechnicalCard 
              gridSpan="md:col-span-12 lg:col-span-8"
              icon={Dna}
              title="Monte-Meubles Lourds"
              desc="Unité de puissance conçue pour le levage de mobilier massif e structures de précision. Stabilité dynamique laser v2."
              specs={["Charge: 400KG", "Portée: 33M", "Mode: Hybride G/E"]}
              isLive={true}
            />
            <TechnicalCard 
              gridSpan="md:col-span-12 lg:col-span-4"
              icon={Drill}
              title="Unités Compactes"
              desc="Déploiement furtif en zones denses. Accès restreints optimisés via châssis articulé."
              specs={["Setup: 12MIN", "Largeur: 1.8M", "Norme: EN 12159"]}
            />
            <TechnicalCard 
              gridSpan="md:col-span-12 lg:col-span-4"
              icon={Zap}
              title="Maintenance Flux"
              desc="Protocoles de maintenance aéronautique assurant un uptime critique de 99.9%."
              specs={["Cycle: 180J", "Laser: Optique", "Sécurité: SIL3"]}
            />
            <TechnicalCard 
              gridSpan="md:col-span-12 lg:col-span-8"
              icon={Activity}
              title="Surveillance IoT"
              desc="Flux de données temps réel via capteurs XYZ. Cloud Swiss-Secured pour diagnostics prédictifs."
              specs={["Latence: < 10ms", "Vents: Live", "Cloud: CH-Data"]}
              isLive={true}
            />
          </div>
        </div>
      </motion.section>

      {/* --- PROCESS --- */}
      <motion.section 
        id="protocoles" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 lg:py-32 px-4 md:px-8 lg:px-12 bg-petrol border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            title="Protocole de Levage" 
            sub="De l'étude de site à la réalisation, chaque étape est validée selon les normes de sécurité les plus strictes." 
            mono="Process"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Audit', 'Planification', 'Installation', 'Exécution'].map((step, i) => (
              <motion.div 
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group bento-box p-8 border-t-0 border-white/5 hover:bg-white/5 transition-all"
              >
                <div className="flex flex-col gap-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-orange tracking-[0.2em] uppercase">Phase 0{i+1}</span>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold group-hover:border-orange transition-colors">
                      {i+1}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-tighter group-hover:text-orange transition-colors">{step}</h4>
                    <p className="text-steel text-sm leading-relaxed font-light italic">Analyse rigoureuse de la configuration terrain et validation des points d'appui.</p>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange/20 to-transparent group-hover:via-orange/60 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- FOOTER --- */}
      <footer className="py-12 md:py-16 px-4 md:px-8 lg:px-12 bg-petrol border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 technical-grid opacity-[0.02] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <MCLogo size={56} className="group-hover:rotate-[360deg] transition-transform duration-1000" />
              <span className="font-display font-black uppercase tracking-tighter text-2xl">Monte Charge</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {['Expertise', 'Flotte', 'Protocoles', 'Contact'].map(link => (
                link === 'Contact' ? (
                  <button 
                    key={link} 
                    onClick={() => setIsContactOpen(true)}
                    className="text-[10px] font-mono text-steel uppercase tracking-[0.3em] hover:text-orange transition-colors cursor-pointer"
                  >
                    {link}
                  </button>
                ) : (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-[10px] font-mono text-steel uppercase tracking-[0.3em] hover:text-orange transition-colors">
                    {link}
                  </a>
                )
              ))}
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[9px] font-mono text-steel/30 uppercase tracking-[0.2em]">
              © 2026 Monte Charge Genève. Excellence Logistique Verticale.
            </div>
            
            <div className="flex gap-8 text-[9px] font-mono text-steel/30 uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-orange transition-colors">Mentions Légales</a>
              <a href="#" className="hover:text-orange transition-colors">Standard Sécurité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
