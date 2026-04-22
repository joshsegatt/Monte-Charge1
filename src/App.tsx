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
  Anchor,
  Truck,
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  FileText,
  Lock,
  Globe
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
    className={cn("filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]", className)}
  >
    {/* Geometric Base (Chassis) */}
    <rect x="15" y="70" width="70" height="6" rx="3" fill="currentColor" className="text-orange" />
    
    {/* Minimalist Cab (Apple Style) */}
    <path 
      d="M15 70V55C15 52.2386 17.2386 50 20 50H45C47.7614 50 50 52.2386 50 55V70H15Z" 
      fill="currentColor" 
      className="text-orange" 
    />
    {/* Cab Window - Negative Space */}
    <rect x="25" y="55" width="15" height="8" rx="1.5" fill="#071925" />

    {/* Extended Mechanical Arm (Telescopic) */}
    <g transform="translate(45 65) rotate(-35)">
      {/* Lower Segment */}
      <rect x="0" y="-3" width="40" height="6" rx="3" fill="currentColor" className="text-orange" />
      {/* Upper Segment (Extended) */}
      <rect x="35" y="-3" width="30" height="6" rx="3" fill="#F5F5DC" />
      {/* Pivot Point */}
      <circle cx="0" cy="0" r="4" fill="#071925" stroke="currentColor" strokeWidth="1.5" className="text-orange" />
    </g>

    {/* Precision Wheels */}
    <circle cx="28" cy="76" r="8" fill="#071925" stroke="currentColor" strokeWidth="2.5" className="text-orange" />
    <circle cx="28" cy="76" r="3" fill="currentColor" className="text-orange" />
    
    <circle cx="72" cy="76" r="8" fill="#071925" stroke="currentColor" strokeWidth="2.5" className="text-orange" />
    <circle cx="72" cy="76" r="3" fill="currentColor" className="text-orange" />
  </svg>
);

const TelemetryModule = React.memo(() => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<{ temp: number, code: number } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=46.2022&longitude=6.1457&current_weather=true');
        const data = await res.json();
        setWeather({
          temp: Math.round(data.current_weather.temperature),
          code: data.current_weather.weathercode
        });
      } catch (e) {
        console.error("Weather failure");
      }
    };

    fetchWeather();
    const weatherTimer = setInterval(fetchWeather, 600000);

    return () => {
      clearInterval(timer);
      clearInterval(weatherTimer);
    };
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code <= 1) return <Sun size={14} className="text-orange" />;
    if (code <= 3) return <Cloud size={14} className="text-steel" />;
    if (code <= 67) return <CloudRain size={14} className="text-steel" />;
    if (code <= 82) return <CloudLightning size={14} className="text-orange" />;
    return <Snowflake size={14} className="text-steel" />;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-CH', { 
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZone: 'Europe/Zurich'
    });
  };

  return (
    <div className="flex items-center gap-3 bg-white/[0.02] px-3 py-1.5 rounded-lg border border-white/5 backdrop-blur-sm shadow-inner group cursor-default transition-all hover:bg-white/[0.04]">
      <div className="flex items-center gap-2 pr-3 border-r border-white/5">
        <span className="text-[9px] text-steel uppercase tracking-widest font-bold">GE</span>
        <span className="text-[11px] text-off-white font-medium tracking-[0.05em] min-w-[70px] uppercase tabular-nums">{formatTime(time)}</span>
      </div>
      {weather && (
        <div className="flex items-center gap-2 transition-all duration-500">
          <div className="opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
            {getWeatherIcon(weather.code)}
          </div>
          <span className="text-[11px] text-off-white font-medium group-hover:text-orange transition-colors">{weather.temp}°C</span>
        </div>
      )}
    </div>
  );
});

const Nav = ({ onContactClick }: { onContactClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Expertise', 'Synergy', 'Protocoles', 'Contact'];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-700 py-6 px-6 md:px-12 flex justify-between items-center will-change-transform",
      scrolled ? "bg-petrol/90 backdrop-blur-2xl border-b border-white/5 py-4 shadow-2xl" : "bg-transparent"
    )}>
      <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <MCLogo size={48} className="group-hover:scale-110 transition-transform duration-500 will-change-transform" />
        <span className="text-xl md:text-2xl font-black tracking-tighter uppercase font-display cursor-pointer tabular-nums">Monte Charge</span>
      </div>

      <div className="hidden md:flex items-center gap-8 lg:gap-12">
        <div className="flex items-center gap-8 text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-steel">
          {navItems.map((item) => (
            item === 'Contact' ? (
              <motion.button 
                key={item} 
                onClick={onContactClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-tactile-orange text-black px-6 py-2 rounded-full font-display font-extrabold text-[10px] tracking-widest uppercase antialiased cursor-pointer"
              >
                {item}
              </motion.button>
            ) : (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-off-white/80 border-b border-orange/0 hover:border-orange hover:text-off-white transition-all pb-1 group cursor-pointer">
                {item}
              </a>
            )
          ))}
        </div>
        
        <div className="hidden lg:block border-l border-white/10 pl-8">
          <TelemetryModule />
        </div>
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-off-white cursor-pointer p-2">
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
              <button onClick={() => setIsOpen(false)} className="w-12 h-12 glass flex items-center justify-center cursor-pointer hover:bg-orange hover:text-black transition-all">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-8 text-3xl font-black uppercase tracking-tighter">
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
                  className="text-left hover:text-orange transition-colors cursor-pointer"
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

const Lightbox = ({ src, onClose }: { src: string, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {src && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] bg-petrol/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative z-10 max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={src} 
              alt="Mission Zoom" 
              className="max-w-full max-h-[80vh] object-contain shadow-2xl border border-white/5 rounded-lg"
            />
            <button 
              onClick={onClose}
              className="absolute -top-12 -right-0 md:-top-16 md:-right-16 w-12 h-12 glass flex items-center justify-center hover:bg-orange hover:text-black transition-all group cursor-pointer"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ExpertiseCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5 transition-all duration-500 hover:border-orange/40 overflow-hidden"
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      
      <div className="relative z-10 space-y-8">
        <div className="w-16 h-16 bg-white/[0.03] backdrop-blur-2xl rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-700 border border-white/10 shadow-[0_0_30px_rgba(255,107,0,0.1)]">
          <Icon className="text-orange" size={32} />
        </div>
        
        <div className="space-y-4">
          <h4 className="text-2xl font-display font-black uppercase tracking-tighter text-off-white group-hover:text-orange transition-colors duration-500">
            {title}
          </h4>
          <p className="text-[15px] leading-relaxed text-steel font-sans group-hover:text-off-white/80 transition-colors duration-500">
            {desc}
          </p>
        </div>

      </div>
    </motion.div>
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

const SectionHeader = ({ title, sub, mono, titleSize = "text-[clamp(1.75rem,5vw,4rem)]" }: { title: string, sub?: string, mono?: string, titleSize?: string }) => (
  <div className="mb-10 md:mb-16 lg:mb-20 px-4 md:px-0">
    <div className="flex items-center gap-4 mb-4">
      <div className="h-px w-8 md:w-12 bg-orange" />
      <span className="font-mono text-[10px] md:text-xs text-orange tracking-widest uppercase">{mono}</span>
    </div>
    <h2 className={cn(titleSize, "font-display font-black mb-6 leading-[1.1] tracking-tight")}>
      <motion.span
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="inline-block will-change-transform"
      >
        {title}
      </motion.span>
    </h2>
    {sub && <p className="text-steel max-w-xl text-[clamp(0.875rem,2vw,1.1rem)] leading-relaxed font-sans antialiased">{sub}</p>}
  </div>
);

const TechnicalCard = ({ 
  icon: Icon, 
  title, 
  desc, 
  specs, 
  gridSpan = "col-span-1",
  isLive = false,
  ctaText = "Consulter",
  unitID = "MC-UNIT",
  marker = "GENÈVE / CH"
}: { 
  icon: any, 
  title: string, 
  desc: string, 
  specs: string[], 
  gridSpan?: string,
  isLive?: boolean,
  ctaText?: string,
  unitID?: string,
  marker?: string
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className={cn(
        "group relative p-6 flex flex-col h-full rounded-[1.5rem] bg-white/[0.01] border border-white/5 transition-all duration-700 hover:border-orange/20 overflow-hidden",
        gridSpan
      )}
    >
      {/* Instrumentation Markers */}
      <div className="absolute top-4 left-6 flex items-center gap-2 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
        <span className="font-mono text-[7px] uppercase tracking-[0.4em] font-black">{unitID}</span>
        <div className="w-1 h-px bg-white/40" />
      </div>
      <div className="absolute top-4 right-6 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
        <span className="font-mono text-[7px] uppercase tracking-[0.3em]">{marker}</span>
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="flex justify-between items-start mt-6 mb-6 relative z-10">
        <div className="w-12 h-12 bg-white/[0.03] backdrop-blur-2xl rounded-xl flex items-center justify-center group-hover:bg-orange/10 group-hover:scale-105 transition-all duration-700 border border-white/10 shadow-[0_0_20px_rgba(255,107,0,0.05)]">
          <Icon className="text-orange" size={24} />
        </div>
        <div className="flex gap-4 items-center">
          {isLive && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-orange/10 border border-orange/40 rounded-full">
              <span className="w-1 h-1 rounded-full bg-orange animate-pulse" />
              <span className="font-mono text-[7px] text-orange uppercase tracking-widest font-black">Online</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4 relative z-10">
        <h3 className="text-2xl font-display font-black tracking-tight uppercase group-hover:text-orange transition-colors duration-500">
          {title}
        </h3>
        <p className="text-[15px] leading-relaxed text-steel group-hover:text-off-white transition-colors duration-500 font-sans">
          {desc}
        </p>
      </div>

      <div className="mt-auto pt-6 space-y-5 relative z-10">
        <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-white/5">
          {specs.slice(0, 3).map((spec, i) => (
            <div key={i} className="flex flex-col gap-0.5 border-r last:border-0 border-white/5">
              <span className="font-mono text-[6px] text-steel/40 uppercase tracking-[0.1em]">{spec.split(':')[0]}</span>
              <span className="font-mono text-[8px] text-orange font-bold truncate pr-1">{spec.split(':')[1]}</span>
            </div>
          ))}
        </div>
        
        <motion.div 
          className="w-full h-10 rounded-full border border-white/5 bg-white/[0.02] group-hover:border-orange/20 transition-all duration-700 font-mono text-[9px] uppercase tracking-[0.3em] font-black flex items-center justify-center gap-3 relative overflow-hidden cursor-default"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange/0 via-orange/5 to-orange/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500" />
          <span className="relative z-10 text-steel/60 group-hover:text-orange transition-colors duration-700 font-sans text-[10px] tracking-widest">{ctaText}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-orange/40 group-hover:bg-orange animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProtocolCard = ({ title, desc, phase, i }: { title: string, desc: string, phase: string, i: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5 transition-all duration-700 hover:border-orange/40 overflow-hidden will-change-transform"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="flex flex-col gap-10 relative z-10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-orange tracking-[0.3em] uppercase font-black">{phase}</span>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xs font-black group-hover:bg-orange group-hover:text-black group-hover:border-orange transition-all duration-500 shadow-[0_0_20px_rgba(255,107,0,0.1)]">
            {i + 1}
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-2xl font-display font-black uppercase tracking-tighter group-hover:text-orange transition-colors duration-500">{title}</h4>
          <p className="text-[15px] leading-relaxed text-steel font-light italic">{desc}</p>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange/20 to-transparent group-hover:via-orange/60 transition-all duration-1000" />
    </motion.div>
  );
};

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
            className="w-full max-w-5xl max-h-[90vh] bg-petrol/95 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-2xl md:rounded-[3rem] overflow-y-auto relative z-10 technical-grid"
            data-lenis-prevent
          >
            <div className="absolute top-8 right-8 z-20">
              <button 
                onClick={onClose}
                className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-orange hover:text-black transition-all group border-white/10"
              >
                <X size={20} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 md:p-16 bg-white/5 border-r border-white/5">
                <SectionHeader 
                  title="Secteur Technique" 
                  titleSize="text-[clamp(2rem,4vw,3.2rem)]"
                  sub="Bureau d'études Monte Charge à Genève. Une réponse technique sous 24h garantie." 
                  mono="Demande"
                />
                
                <div className="space-y-10 mt-12">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 glass flex items-center justify-center shrink-0 border-white/5">
                      <MapPin className="text-orange" size={20} />
                    </div>
                    <div>
                      <h5 className="font-mono text-[10px] text-orange tracking-widest uppercase mb-1">Siège Social</h5>
                      <p className="text-off-white text-sm leading-relaxed font-sans italic">Rue de Lyon, 1211 Genève, Suisse</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 glass flex items-center justify-center shrink-0 border-white/5">
                      <Activity className="text-orange" size={20} />
                    </div>
                    <div>
                      <h5 className="font-mono text-[10px] text-orange tracking-widest uppercase mb-1">Support 24/7</h5>
                      <p className="text-off-white text-sm leading-relaxed font-sans italic">+41 22 000 00 00 <br /> contact@montecharge-geneve.ch</p>
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
                   <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-tactile-orange w-full py-5 text-black font-display font-extrabold uppercase tracking-widest rounded-full text-[12px] antialiased cursor-pointer"
                  >
                    <div className="flex items-center justify-center gap-3">
                      Lancer l'Analyse
                      <ArrowUpRight size={18} />
                    </div>
                  </motion.button>
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
            className="w-full max-w-4xl max-h-[90vh] bg-petrol/95 border border-white/10 rounded-2xl md:rounded-[3rem] overflow-y-auto relative z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
            data-lenis-prevent
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
                <button onClick={onClose} className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-orange hover:text-black transition-all cursor-pointer">
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
                          className="p-8 glass text-left border-white/5 rounded-[2rem] hover:border-orange/40 transition-all group relative overflow-hidden flex flex-col"
                        >
                          <div className="absolute inset-0 technical-grid opacity-[0.03]" />
                          <item.icon className="text-orange mb-6 group-hover:scale-110 transition-transform" size={40} strokeWidth={1.5} />
                          <h4 className="text-xl font-display font-black uppercase mb-2 tracking-tight group-hover:text-orange transition-colors">{item.title}</h4>
                          <p className="text-steel text-sm leading-relaxed font-sans">{item.desc}</p>
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
                      <motion.button 
                        onClick={onClose}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-tactile-orange w-full py-5 text-black font-display font-extrabold uppercase tracking-widest rounded-full text-[12px] antialiased cursor-pointer"
                      >
                        Générer le Devis Gratuit
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
                {step > 1 ? (
                  <button onClick={prevStep} className="flex items-center gap-3 text-[10px] font-mono text-steel hover:text-off-white transition-colors uppercase tracking-[0.2em] cursor-pointer">
                    <ChevronRight className="rotate-180" size={16} /> Précédent
                  </button>
                ) : <div />}
                
                {step > 1 && step < totalSteps && (
                  <button onClick={nextStep} className="flex items-center gap-3 text-[10px] font-mono text-orange hover:text-off-white transition-colors uppercase tracking-[0.2em] cursor-pointer">
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'mentions' | 'security' | null>(null);
  const lenisRef = React.useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (activeModal) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [activeModal]);

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
      <Lightbox src={selectedImage || ""} onClose={() => setSelectedImage(null)} />
      {/* Visual Background */}
      <div className="fixed inset-0 -z-10 bg-petrol" />
      <div className="fixed inset-0 -z-10 technical-grid opacity-40 pointer-events-none" />
      
      {/* Scroll Progress Indicator */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-orange z-[60] origin-left" style={{ scaleX }} />

      {/* --- HERO --- */}
      <section className="relative min-h-screen flex items-center px-4 md:px-8 lg:px-12 overflow-hidden">
        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("/hero.png")' }}
          />
          {/* Subtle Premium Overlays - Tuned for the specific image brightness */}
          <div className="absolute inset-0 bg-gradient-to-r from-petrol/80 via-petrol/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-petrol/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/10 backdrop-brightness-110" />
          <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_40%,rgba(7,25,37,0.3)_100%)]" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-8 space-y-10"
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
                    <h1 className="text-[clamp(2.5rem,10vw,5.5rem)] leading-[0.95] font-bold tracking-tighter uppercase font-display drop-shadow-2xl will-change-transform">
                      {[
                         <span key="0">LOCATION<br/><span className="text-orange italic">MONTE-MEUBLES</span>.</span>,
                         <span key="1">PRÉCISION<br/><span className="text-orange italic">MONTE CHARGE</span>.</span>,
                         <span key="2">SÉCURITÉ<br/><span className="text-orange italic">GARANTIE</span>.</span>,
                         <span key="3">EXPERTISE<br/><span className="text-orange italic">GENEVOISE</span>.</span>
                      ][headlineIndex]}
                    </h1>
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-off-white/90 max-w-[540px] font-light drop-shadow-lg">
                Le spécialiste du monte-meubles à Genève. Solutions de levage haute performance pour vos déménagements et manutentions industrielles complexes.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.button 
                onClick={() => setIsQuoteOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-tactile-orange w-full sm:w-auto px-8 py-4 text-black font-display font-extrabold text-[12px] uppercase tracking-widest rounded-full antialiased cursor-pointer"
              >
                <div className="flex items-center justify-center gap-3">
                  Lancer le Projet
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                </div>
              </motion.button>
              
              <motion.a 
                href="https://batimove.ch" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-tactile-black flex items-center gap-4 px-8 py-4 border border-white/5 rounded-full opacity-90 backdrop-blur-3xl group cursor-pointer hover:opacity-100 transition-all duration-500"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-orange/20 blur-lg rounded-full group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100" />
                  <Truck size={20} className="text-orange relative z-10 group-hover:rotate-[-8deg] transition-transform duration-500 text-shadow-glow" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_15px_rgba(255,107,0,1)] relative z-10" />
                </div>
                <div className="flex flex-col items-start leading-none gap-1 antialiased">
                  <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-steel/40 font-medium">Partenaire Officiel</span>
                  <span className="font-display font-extrabold text-[12px] uppercase tracking-wide text-off-white group-hover:text-orange transition-colors duration-500">BatiMove</span>
                </div>
              </motion.a>
            </div>

            <div className="pt-10 border-t border-white/10 flex flex-wrap gap-10 font-mono text-[10px] text-steel uppercase tracking-[0.2em]">
              <div className="flex items-center gap-3"><Shield size={14} className="text-orange" /> Assurance Intégrale</div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-orange" /> Services 24/7</div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Scan Line Integration */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange/10 to-transparent h-[1px] w-full translate-y-full animate-[scan_6s_linear_infinite] opacity-20 z-20 pointer-events-none" />
      </section>

      {/* --- WORK CAROUSEL (CENTIPEDE MODE) --- */}
      <div className="py-20 bg-petrol overflow-hidden border-t border-b border-white/5 relative">
        <div className="absolute inset-0 technical-grid opacity-[0.02] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 flex justify-between items-end">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-orange rounded-full animate-pulse" />
              <span className="font-mono text-[9px] uppercase text-orange tracking-[0.3em]">Log de Mission</span>
            </div>
            <h3 className="text-xl md:text-3xl font-display font-black uppercase tracking-tighter">Interventions Récentes</h3>
          </div>
        </div>

        <div className="flex group/carousel">
          <div 
            className="flex gap-6 px-3 animate-[scroll_80s_linear_infinite] group-hover/carousel:[animation-play-state:paused]"
          >
            {[1, 11, 12, 13, 14, 15, 16, 17, 18, 19, 2, 20, 21, 22, 23, 24, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <motion.div 
                key={`work-${num}`}
                whileHover={{ y: -15, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => setSelectedImage(`/assets/work/${num}.jpeg`)}
                className="relative w-[320px] h-[220px] flex-shrink-0 border border-white/5 overflow-hidden group/card cursor-zoom-in"
              >
                <img 
                  src={`/assets/work/${num}.jpeg`} 
                  alt={`Mission ${num}`} 
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-orange/60 opacity-0 group-hover/card:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-orange/60 opacity-0 group-hover/card:opacity-100 transition-all duration-500" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-petrol/80 via-transparent to-transparent opacity-60" />
              </motion.div>
            ))}
            {/* Extended duplicate set for seamless loop */}
            {[1, 11, 12, 13, 14, 15, 16, 17, 18, 19, 2, 20, 21, 22, 23, 24, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <motion.div 
                key={`work-dup-${num}`}
                whileHover={{ y: -15, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => setSelectedImage(`/assets/work/${num}.jpeg`)}
                className="relative w-[320px] h-[220px] flex-shrink-0 border border-white/5 overflow-hidden group/card cursor-zoom-in"
              >
                <img 
                  src={`/assets/work/${num}.jpeg`} 
                  alt={`Mission ${num}`} 
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-orange/60 opacity-0 group-hover/card:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-orange/60 opacity-0 group-hover/card:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-petrol/80 via-transparent to-transparent opacity-60" />
              </motion.div>
            ))}
          </div>
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
            <ExpertiseCard 
              icon={Settings}
              title="Logistique Haute-Performance"
              desc="Optimisation des flux de levage pour minimiser les interruptions de service et maximiser l'efficacité de vos transferts."
              delay={0.1}
            />
            <ExpertiseCard 
              icon={ShieldCheck}
              title="Sécurité Certifiée"
              desc="Conformité totale aux normes SUVA et européennes. Chaque intervention est encadrée par un expert certifié."
              delay={0.2}
            />
            <ExpertiseCard 
              icon={Clock}
              title="Réactivité Absolue"
              desc="Service 24/7 pour les urgences. Installation rapide et mise en service immédiate sur tout le bassin genevois."
              delay={0.3}
            />
          </div>

          {/* Integrated Minimalist CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 group/cta"
          >
            <div className="space-y-2 text-center md:text-left">
              <h5 className="text-xl font-display font-black uppercase tracking-tight text-off-white">
                Prêt à élever vos projets ?
              </h5>
              <p className="font-mono text-[10px] text-steel/60 uppercase tracking-widest">
                Expertise technique gratuite sous <span className="text-orange">24h</span>
              </p>
            </div>
            
            <motion.button 
              onClick={() => setIsQuoteOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-tactile-orange relative group/btn overflow-hidden rounded-full cursor-pointer"
            >
            <div className="relative px-10 py-4 text-black font-display font-extrabold text-[12px] uppercase tracking-widest flex items-center gap-3 transition-colors antialiased">
                Lancer l'Analyse
                <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </div>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        id="synergy" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 lg:py-32 px-4 md:px-8 lg:px-12 relative bg-petrol border-t border-white/5 overflow-hidden"
      >
        {/* Engineering Grid Background */}
        <div className="absolute inset-0 technical-grid opacity-[0.03] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader 
            title="L'Écosystème Vertical" 
            sub="Une infrastructure technologique unifiée pour maîtriser chaque étape de la chaîne logistique, du levage à la distribution finale." 
            mono="Contrôle Mission"
          />
          
          <div className="space-y-12">
            {/* The Cinematic 3-Panel Visual */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-5xl mx-auto bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden group shadow-2xl h-auto will-change-transform"
            >
              <img 
                src="/logistic.png" 
                alt="Logistics Ecosystem" 
                className="w-full h-auto block transition-transform duration-[3s] ease-out group-hover:scale-105 will-change-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-petrol/60 via-transparent to-transparent opacity-60" />
            </motion.div>

            {/* Synergy Content Deck */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-8 glass-card border-white/5 rounded-3xl space-y-4 hover:border-orange/20 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center border border-orange/20">
                  <ArrowUpRight className="text-orange" size={20} />
                </div>
                <h4 className="text-lg font-display font-black uppercase tracking-tight text-off-white">Précision Verticale</h4>
                <p className="text-steel text-[13px] leading-relaxed font-sans">
                  Maîtrise absolue du levage en environnement urbain dense, garantissant une extraction sécurisée des charges les plus complexes.
                </p>
              </div>

              <div className="p-8 glass-card border-white/5 rounded-3xl space-y-4 hover:border-white/20 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Settings className="text-off-white" size={20} />
                </div>
                <h4 className="text-lg font-display font-black uppercase tracking-tight text-off-white">Logistique Intégrée</h4>
                <p className="text-steel text-[13px] leading-relaxed font-sans">
                  Coordination stratégique des flux. Nous transformons la complexidade técnica em fluidez operacional imediata.
                </p>
              </div>

              <div className="p-8 bg-orange/5 border border-orange/10 rounded-3xl space-y-6 group">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-mono text-[9px] text-orange tracking-widest mb-1 uppercase">Partenaire Distribution</div>
                    <div className="text-2xl font-display font-black uppercase tracking-tighter text-off-white">BatiMove.ch</div>
                  </div>
                  <Truck className="text-orange opacity-40 group-hover:opacity-100 transition-opacity" size={24} />
                </div>
                <p className="text-[12px] text-steel/80 leading-relaxed font-sans">
                  Le pilier de la distribution finale. BatiMove assure le transport sécurisé et la gestion de flotte sur tout le territoire.
                </p>
                <motion.a 
                  href="https://batimove.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile-orange w-full py-4 text-black font-display font-extrabold uppercase tracking-widest rounded-full text-[10px] flex items-center justify-center gap-3 cursor-pointer antialiased"
                >
                  Accéder à BatiMove
                  <ArrowUpRight size={16} />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* --- PROTOCOLS --- */}
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
            mono="Protocole"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Audit', desc: 'Analyse rigoureuse de la configuration terrain et validation des points d\'appui.' },
              { title: 'Planification', desc: 'Conception CAO 3D des trajectoires et calcul des charges de rupture.' },
              { title: 'Installation', desc: 'Déploiement des unités et sécurisation périmétrale par nos experts.' },
              { title: 'Exécution', desc: 'Manoeuvre de levage assistée par télémétrie laser et finalisation.' }
            ].map((step, i) => (
              <ProtocolCard 
                key={step.title}
                i={i}
                phase={`Phase 0${i+1}`}
                title={step.title}
                desc={step.desc}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- FOOTER --- */}
      <footer className="py-12 md:py-16 px-4 md:px-8 lg:px-12 bg-petrol border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 technical-grid opacity-[0.02] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <MCLogo size={56} className="group-hover:rotate-[360deg] transition-transform duration-1000" />
              <span className="font-display font-black uppercase tracking-tighter text-2xl">Monte Charge</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {['Expertise', 'Synergy', 'Protocoles', 'Contact'].map(link => (
                link === 'Contact' ? (
                  <button 
                    key={link} 
                    onClick={() => setIsContactOpen(true)}
                    className="text-[10px] font-mono text-steel uppercase tracking-[0.3em] hover:text-orange transition-colors cursor-pointer"
                  >
                    {link}
                  </button>
                ) : (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-[10px] font-mono text-steel uppercase tracking-[0.3em] hover:text-orange transition-colors cursor-pointer">
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

            <div className="text-[9px] font-mono text-steel/30 uppercase tracking-[0.2em]">
              made with ❤️ by <a href="https://joshsegatt.com" target="_blank" rel="noopener noreferrer" className="text-orange/60 hover:text-orange transition-colors">joshsegatt</a>
            </div>
            
            <div className="flex gap-8 text-[9px] font-mono text-steel/30 uppercase tracking-[0.2em]">
              <button 
                onClick={() => setActiveModal('mentions')} 
                className="hover:text-orange transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                Mentions Légales
              </button>
              <button 
                onClick={() => setActiveModal('security')} 
                className="hover:text-orange transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                Standard Sécurité
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal & Security Overlays */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 lg:p-12"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-pointer"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-[#0A0F14] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col"
            >
              {/* Header */}
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange/10 flex items-center justify-center border border-orange/20">
                    {activeModal === 'mentions' ? <FileText className="text-orange" size={24} /> : <ShieldCheck className="text-orange" size={24} />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-black uppercase tracking-tight text-off-white">
                      {activeModal === 'mentions' ? 'Mentions Légales' : 'Standard Sécurité'}
                    </h2>
                    <p className="text-xs font-mono text-steel/60 tracking-widest uppercase">Protocole : Conformité_v1.0</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <X className="text-steel group-hover:text-off-white" size={20} />
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12">
                {activeModal === 'mentions' ? (
                  <div className="space-y-10">
                    <section className="space-y-4">
                      <h3 className="text-sm font-mono text-orange tracking-widest uppercase">Éditeur du Site</h3>
                      <div className="space-y-2 text-steel antialiased">
                        <p className="text-off-white font-bold">BATIMOVE Sàrl</p>
                        <p>Rue De-MONTHOUX 64</p>
                        <p>c/o Fiduciaire Fidulex Sàrl</p>
                        <p>1201 Genève, Suisse</p>
                        <p className="pt-2 font-mono">UID : CHE-143.091.230</p>
                      </div>
                    </section>
                    
                    <section className="space-y-4">
                      <h3 className="text-sm font-mono text-orange tracking-widest uppercase">Hébergement</h3>
                      <div className="space-y-2 text-steel">
                        <p className="text-off-white font-bold">Vercel Inc.</p>
                        <p>440 N Barranca Ave #4133</p>
                        <p>Covina, CA 91723</p>
                        <p>États-Unis</p>
                      </div>
                    </section>

                    <section className="space-y-4">
                      <h3 className="text-sm font-mono text-orange tracking-widest uppercase">Propriété Intellectuelle</h3>
                      <p className="text-steel leading-relaxed text-[13px]">
                        L'ensemble de ce site relève de la législation suisse et internationale sur le droit d'auteur et la propriété intellectuelle. Tous droits de reproduction réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                      </p>
                    </section>
                  </div>
                ) : (
                  <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-8 border border-white/5 rounded-3xl bg-white/[0.01] space-y-4">
                        <Lock className="text-orange" size={24} />
                        <h4 className="text-off-white font-bold uppercase tracking-tight">Intégrité des Données</h4>
                        <p className="text-xs text-steel leading-relaxed">
                          Chaque mission est documentée par un système de logs cryptés AES-256. Vos données opérationnelles restent confidentielles et souveraines sur des serveurs suisses hautement sécurisés.
                        </p>
                      </div>
                      <div className="p-8 border border-white/5 rounded-3xl bg-white/[0.01] space-y-4">
                        <ShieldCheck className="text-orange" size={24} />
                        <h4 className="text-off-white font-bold uppercase tracking-tight">Normes Suisses</h4>
                        <p className="text-xs text-steel leading-relaxed">
                          Conformité totale avec les normes de sécurité du Canton de Genève. Assurance Responsabilité Civile Premium systématique pour chaque levage vertical critique.
                        </p>
                      </div>
                    </div>

                    <section className="space-y-4">
                      <h3 className="text-sm font-mono text-orange tracking-widest uppercase">Protocoles d'Urgence</h3>
                      <p className="text-steel leading-relaxed text-[13px]">
                        Notre infrastructure intègre une détection automatique d'anomalies. En cas de déviation des paramètres de sécurité initiaux, le système s'isole immédiatement pour protéger les infrastructures et les équipes au sol.
                      </p>
                    </section>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/5 bg-white/[0.01] flex justify-center">
                <p className="text-[9px] font-mono text-steel/20 uppercase tracking-[0.4em]">Monte Charge Genève • Précis. Sécurisé. Suisse.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
