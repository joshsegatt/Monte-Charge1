/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  ArrowDown,
  Settings,
  ShieldCheck,
  Clock, 
  Search,
  Compass,
  Menu, 
  X,
  Zap,
  Activity,
  Truck,
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  Mail,
  Phone
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
    <rect x="15" y="70" width="70" height="6" rx="3" fill="currentColor" className="text-orange" />
    <path 
      d="M15 70V55C15 52.2386 17.2386 50 20 50H45C47.7614 50 50 52.2386 50 55V70H15Z" 
      fill="currentColor" 
      className="text-orange" 
    />
    <rect x="25" y="55" width="15" height="8" rx="1.5" fill="#071925" />
    <g transform="translate(45 65) rotate(-35)">
      <rect x="0" y="-3" width="40" height="6" rx="3" fill="currentColor" className="text-orange" />
      <rect x="35" y="-3" width="30" height="6" rx="3" fill="#F5F5DC" />
      <circle cx="0" cy="0" r="4" fill="#071925" stroke="currentColor" strokeWidth="1.5" className="text-orange" />
    </g>
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

  return (
    <div className="flex items-center gap-3 bg-white/[0.02] px-3 py-1.5 rounded-lg border border-white/5 backdrop-blur-sm shadow-inner group cursor-default transition-all hover:bg-white/[0.04]">
      <div className="flex items-center gap-2 pr-3 border-r border-white/5">
        <span className="text-[9px] text-steel uppercase tracking-widest font-bold">GE</span>
        <span className="text-[11px] text-off-white font-medium tracking-[0.05em] min-w-[70px] uppercase tabular-nums">{time.toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Europe/Zurich' })}</span>
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

const Nav = ({ navigateTo, currentPage }: { navigateTo: (page: 'home' | 'contact') => void, currentPage: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled_val = height > 0 ? (winScroll / height) : 0;
      setProgress(scrolled_val);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Expertise', 'Synergy', 'Protocoles'];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[1000] transition-all duration-700 py-4 px-6 md:px-10 flex justify-between items-center",
      scrolled || currentPage !== 'home' ? "bg-petrol/90 backdrop-blur-2xl border-b border-white/5 py-3 shadow-2xl" : "bg-transparent"
    )}>
      {currentPage === 'home' && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden">
          <motion.div className="h-full bg-orange shadow-[0_0_15px_rgba(255,107,0,0.6)]" style={{ width: `${progress * 100}%` }} transition={{ type: "spring", stiffness: 400, damping: 40 }} />
        </div>
      )}

      <div className="flex items-center gap-4 group cursor-pointer" onClick={() => currentPage === 'home' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigateTo('home')}>
        <MCLogo size={32} className="group-hover:scale-110 transition-transform duration-500" />
        <div className="flex flex-col leading-none">
          <span className="text-xl md:text-2xl font-black tracking-tighter uppercase font-display tabular-nums">Monte Charge</span>
          <span className="text-[8px] font-mono text-orange tracking-[0.4em] uppercase opacity-60 font-bold mt-1">Geneva / Vertical Logistics</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-12 lg:gap-16">
        <div className="flex items-center gap-10 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-steel">
          {navItems.map((item) => (
            <a key={item} href={currentPage === 'home' ? `#${item.toLowerCase()}` : '/'} onClick={(e) => {
              if (currentPage !== 'home') {
                e.preventDefault();
                navigateTo('home');
                setTimeout(() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }), 100);
              }
            }} className="text-off-white/60 hover:text-orange transition-all group relative py-2 cursor-pointer">
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-orange transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
          <button onClick={() => navigateTo('contact')} className={cn("px-6 py-2 border rounded-full transition-all cursor-pointer font-display font-black uppercase tracking-widest text-[10px]", currentPage === 'contact' ? "bg-orange text-black border-orange" : "border-orange/50 text-orange hover:bg-orange hover:text-black")}>Contact</button>
        </div>
        <div className="hidden lg:flex items-center gap-8 border-l border-white/10 pl-12"><TelemetryModule /></div>
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-off-white cursor-pointer p-2">{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 bg-petrol z-50 flex flex-col p-12">
            <div className="flex justify-between items-center mb-16">
              <span className="font-display font-black uppercase text-2xl">Menu</span>
              <button onClick={() => setIsOpen(false)} className="w-12 h-12 glass flex items-center justify-center cursor-pointer hover:bg-orange hover:text-black transition-all"><X size={24} /></button>
            </div>
            <div className="flex flex-col gap-8 text-3xl font-black uppercase">
              {navItems.map((item) => (
                <a key={item} href={currentPage === 'home' ? `#${item.toLowerCase()}` : '/'} onClick={(e) => {
                  setIsOpen(false);
                  if (currentPage !== 'home') {
                    e.preventDefault();
                    navigateTo('home');
                    setTimeout(() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }
                }} className="text-left hover:text-orange transition-colors cursor-pointer text-3xl font-black uppercase">{item}</a>
              ))}
              <button onClick={() => { navigateTo('contact'); setIsOpen(false); }} className={cn("text-left transition-colors cursor-pointer text-3xl font-black uppercase", currentPage === 'contact' ? "text-orange" : "text-off-white hover:text-orange")}>Contact</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Vibe Components (Magic UI / Aceternity Inspired) ---
const AuroraBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
    <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-orange/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
    <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] bg-orange/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '12s' }} />
    <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-white/[0.03] rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '10s' }} />
  </div>
);


const ContactPage = ({ navigateTo }: { navigateTo: (page: 'home' | 'contact') => void }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="h-screen bg-[#070B0F] pt-24 pb-12 px-6 md:px-12 lg:px-20 relative overflow-hidden flex flex-col items-center justify-center"
    >
    <AuroraBackground />
    <div className="absolute inset-0 technical-grid opacity-[0.03] pointer-events-none" />
    
    {/* Subtle Depth Accents */}
    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange/5 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange/5 rounded-full blur-[120px] pointer-events-none" />

    <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-center">
      {/* Compact Header Section */}
      <div className="mb-10 text-center lg:text-left">
        
        <h1 className="text-[clamp(1.8rem,5vw,3rem)] font-display font-black uppercase tracking-tighter leading-none text-off-white mb-3">
          Prêt pour le <span className="text-orange italic text-[0.95em]">Déploiement?</span>
        </h1>
        <p className="text-steel max-w-xl mx-auto lg:mx-0 text-xs md:text-sm leading-relaxed font-medium opacity-50 tracking-wide uppercase">
          Expertise suisse certifiée pour opérations complexes à Genève.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Contact Methods - Compact Bento */}
        <div className="lg:col-span-5 flex flex-col gap-4 h-full">
          {[
            { icon: Phone, label: "Ligne Directe", val: "076 771 86 87", href: "tel:0767718687" },
            { icon: Mail, label: "Communication", val: "info@batimove.ch", href: "mailto:info@batimove.ch" }
          ].map((item, idx) => (
            <a key={idx} href={item.href} className="flex-1 block">
              <motion.div 
                whileHover={{ y: -3, scale: 1.01 }}
                className="group relative p-px rounded-[1.8rem] bg-gradient-to-b from-white/10 to-transparent hover:from-orange/40 transition-all duration-500 h-full cursor-pointer"
              >
                <div className="relative p-5 bg-[#0A0F14] rounded-[1.7rem] overflow-hidden flex items-center gap-5 h-full shadow-xl">
                  <div className="relative w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 flex items-center justify-center group-hover:border-orange/30 transition-all duration-500 shadow-inner overflow-hidden">
                    <div className="absolute inset-0 bg-orange/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <item.icon className="text-orange relative z-10" size={20} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-mono text-[7px] text-orange tracking-[0.3em] uppercase font-black opacity-80">{item.label}</span>
                    <h3 className="text-lg md:text-xl font-display font-black text-off-white tracking-tighter group-hover:text-orange transition-colors duration-500 truncate">
                      {item.val}
                    </h3>
                  </div>
                </div>
              </motion.div>
            </a>
          ))}

          <a 
            href="https://www.google.com/maps/search/?api=1&query=Rue+De-MONTHOUX+64,+1201+Genève" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 block"
          >
            <div className="p-px bg-gradient-to-br from-white/10 to-transparent border border-white/5 rounded-[1.8rem] group relative overflow-hidden h-full min-h-[140px] cursor-pointer">
              <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-700">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src="https://maps.google.com/maps?q=Rue%20De-MONTHOUX%2064,%201201%20Gen%C3%A8ve&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="pointer-events-none"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F14] via-[#0A0F14]/40 to-transparent pointer-events-none" />
              
              <div className="relative z-10 p-5 h-full flex flex-col justify-end gap-1">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                  <span className="font-mono text-[8px] text-off-white uppercase tracking-widest font-black">Logistics Hub GVA</span>
                </div>
                <p className="text-[9px] text-steel leading-relaxed font-medium opacity-60 uppercase tracking-tighter">
                  Rue De-Monthoux 64, 1201 Genève
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* Compact Dossier Form */}
        <div className="lg:col-span-7 h-full">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="group relative p-px rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent hover:from-orange/20 transition-all duration-1000 shadow-2xl h-full"
          >
            <div className="relative p-6 lg:p-10 bg-[#0A0F14]/90 backdrop-blur-3xl rounded-[2.4rem] h-full flex flex-col justify-between overflow-hidden">
              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0F14]/95 p-10 text-center space-y-6"
                  >
                    <div className="w-24 h-24 rounded-full bg-orange/10 border border-orange/30 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                      >
                        <ShieldCheck size={48} className="text-orange" />
                      </motion.div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-display font-black uppercase text-off-white">Dossier Transmis</h3>
                      <p className="text-steel font-mono text-[10px] uppercase tracking-widest">Opération Initialisée avec Succès</p>
                    </div>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="px-8 py-3 rounded-xl border border-white/10 text-off-white text-[10px] font-mono uppercase hover:bg-white/5 transition-all"
                    >
                      Nouveau Dossier
                    </button>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col">
                    <div className="flex justify-between items-end border-b border-white/5 pb-4 mb-6">
                      <div className="space-y-0.5">
                        <h2 className="text-2xl font-display font-black uppercase tracking-tighter text-off-white">Dossier Mission</h2>
                        <p className="text-[8px] font-mono text-steel uppercase tracking-[0.4em] font-black opacity-30">GENÈVE-OPS / v4.0</p>
                      </div>
                    </div>
                    
                    <form 
                      className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 flex-1" 
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setFormStatus('sending');
                        const formData = new FormData(e.currentTarget);
                        try {
                          const res = await fetch('https://formspree.io/f/xgorrdkg', {
                            method: 'POST',
                            body: formData,
                            headers: { 'Accept': 'application/json' }
                          });
                          if (res.ok) setFormStatus('success');
                          else setFormStatus('idle');
                        } catch {
                          setFormStatus('idle');
                        }
                      }}
                    >
                      <div className="space-y-1">
                        <label className="text-[7px] font-mono text-steel uppercase tracking-widest font-black ml-1 opacity-60">Client ID</label>
                        <input name="name" required type="text" className="w-full bg-white/[0.02] border-b border-white/10 px-0 py-2 text-off-white focus:border-orange transition-all outline-none text-xs placeholder:text-steel/20 font-bold" placeholder="Nom complet" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[7px] font-mono text-steel uppercase tracking-widest font-black ml-1 opacity-60">Tech Link</label>
                        <input name="email" required type="email" className="w-full bg-white/[0.02] border-b border-white/10 px-0 py-2 text-off-white focus:border-orange transition-all outline-none text-xs placeholder:text-steel/20 font-bold" placeholder="Email pro" />
                      </div>
                      <div className="col-span-1 md:col-span-2 space-y-1 flex-1">
                        <label className="text-[7px] font-mono text-steel uppercase tracking-widest font-black ml-1 opacity-60">Operational Details</label>
                        <textarea name="message" required className="w-full bg-white/[0.02] border-b border-white/10 px-0 py-2 text-off-white focus:border-orange transition-all outline-none text-xs h-16 md:h-20 resize-none placeholder:text-steel/20 font-bold" placeholder="Lieu, charge, contraintes..." />
                      </div>
                      <div className="col-span-1 md:col-span-2 pt-2">
                        <button 
                          disabled={formStatus === 'sending'}
                          className="w-full relative group overflow-hidden rounded-xl bg-orange p-px cursor-pointer shadow-[0_10px_30px_-10px_rgba(255,107,0,0.3)] disabled:opacity-50"
                        >
                          <div className="bg-[#FF6B00] py-4 rounded-[11px] flex items-center justify-center gap-3 group-hover:bg-[#FF8C33] transition-all">
                            <span className="font-display font-black text-xs uppercase tracking-[0.3em] text-white">
                              {formStatus === 'sending' ? 'Transmission...' : 'Initialiser le Protocole'}
                            </span>
                            <Zap size={14} className={cn("text-white transition-transform", formStatus === 'sending' ? "animate-pulse" : "group-hover:scale-125")} />
                          </div>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </motion.main>
  );
};


const ExpertiseCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }} 
    transition={{ duration: 0.8, delay }} 
    className="group relative p-px rounded-[2.5rem] bg-gradient-to-b from-white/10 via-transparent to-transparent hover:from-orange/40 transition-all duration-700 shadow-2xl"
  >
    <div className="relative z-10 p-10 bg-[#0A0F14] rounded-[2.4rem] space-y-10 overflow-hidden h-full flex flex-col justify-between">
      {/* Light Sweep Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      <div className="space-y-8">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-700 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] group-hover:border-orange/30">
          <Icon className="text-orange" size={36} strokeWidth={1.5} />
        </div>
        
        <div className="space-y-4">
          <h4 className="text-3xl font-display font-black uppercase tracking-tight text-off-white group-hover:text-orange transition-colors duration-500 leading-tight">
            {title}
          </h4>
          <p className="text-base leading-relaxed text-steel font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-500">
            {desc}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const SectionHeader = ({ title, sub, mono }: { title: string, sub?: string, mono: string }) => (
  <div className="space-y-6 mb-20 relative z-10">
    <div className="flex items-center gap-4"><span className="w-12 h-[2px] bg-orange" /><span className="font-mono text-[11px] text-orange tracking-[0.5em] uppercase font-black">{mono}</span></div>
    <h2 className="text-[clamp(2.2rem,6vw,4rem)] font-display font-black uppercase tracking-tighter leading-[0.9] text-off-white">{title}</h2>
    {sub && <p className="text-steel max-w-2xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed font-medium">{sub}</p>}
  </div>
);

const RotatingCinematicText = () => {
  const [index, setIndex] = useState(0);
  const words = ["Verticale", "Précise", "Elite", "Genève"];
  
  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-[clamp(2.5rem,10vw,8rem)] font-display font-black uppercase tracking-tighter leading-[0.8] text-off-white flex flex-col items-center">
        <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="block">Levage</motion.span>
        <div className="relative h-[1.1em] w-full flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span 
              key={index}
              initial={{ y: '100%', opacity: 0, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: '-100%', opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className={cn("block italic text-orange whitespace-nowrap", index % 2 === 0 ? "font-serif italic" : "font-display")}
            >
              {words[index]}.
            </motion.span>
          </AnimatePresence>
        </div>
      </h1>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'contact'>('home');
  const [activeModal, setActiveModal] = useState<'mentions' | 'security' | null>(null);
  const [videoOpacity, setVideoOpacity] = useState(0.5);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, [currentPage]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration > 0) {
      // Fade out in the last 0.8s
      if (currentTime > duration - 0.8) {
        setVideoOpacity(Math.max(0, (duration - currentTime) * 0.5));
      } else if (currentTime < 0.8) {
        // Fade in during the first 0.8s
        setVideoOpacity(Math.min(0.5, currentTime * 0.5));
      } else {
        setVideoOpacity(0.5);
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPage(path === '/contact' ? 'contact' : 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: 'home' | 'contact') => {
    const url = page === 'home' ? '/' : '/contact';
    window.history.pushState({}, '', url);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-petrol text-off-white min-h-screen selection:bg-orange selection:text-black">
      <Nav currentPage={currentPage} navigateTo={navigateTo} />
      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-screen relative flex items-center justify-center overflow-hidden">
              <AuroraBackground />
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-petrol/60 via-transparent to-petrol" />
                <div className="absolute inset-0 technical-grid opacity-[0.03]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,25,37,0.4)_100%)]" />
              </div>
              <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2 }} className="absolute inset-0">
                <video 
                  ref={videoRef}
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  onTimeUpdate={handleTimeUpdate}
                  className="w-full h-full object-cover brightness-[0.9] contrast-[1.2] saturate-[1.5] transition-opacity duration-700"
                  style={{ opacity: videoOpacity }}
                >
                  <source src="/Photorealistic_Truck_Loop_Animation.mp4" type="video/mp4" />
                </video>
              </motion.div>
              
              <div className="container mx-auto px-6 relative z-20 text-center">
                <RotatingCinematicText />
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-steel max-w-2xl mx-auto text-lg md:text-xl mb-12 font-medium opacity-80 leading-relaxed mt-8">
                  Expertise suisse certifiée SUVA pour vos transferts complexes e infrastructures sensibles à travers tout le bassin genevois.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  {/* Primary Button: Démarrer Mission */}
                  <a 
                    href="#expertise" 
                    className="group relative flex items-center gap-6 bg-gradient-to-r from-orange to-[#FF8C33] p-1 rounded-full hover:scale-105 transition-all duration-500 shadow-[0_20px_40px_-15px_rgba(255,107,0,0.4)] cursor-pointer"
                  >
                    <div className="pl-10 pr-6 py-4">
                      <span className="font-display font-black text-xs uppercase tracking-[0.3em] text-white">Démarrer Mission</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white/40 transition-all duration-500 shadow-inner">
                      <ArrowDown size={18} className="text-white group-hover:translate-y-1 transition-transform" />
                    </div>
                  </a>

                  {/* Secondary Button: Contact */}
                  <button 
                    onClick={() => navigateTo('contact')} 
                    className="group relative flex items-center gap-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 p-1 rounded-full hover:border-orange/40 hover:bg-white/[0.06] transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,107,0,0.1)] cursor-pointer"
                  >
                    <div className="pl-10 pr-6 py-4">
                      <span className="font-display font-black text-xs uppercase tracking-[0.3em] text-steel group-hover:text-off-white transition-colors">Mission Control</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-orange/50 group-hover:bg-orange/10 transition-all duration-500">
                      <Phone size={18} className="text-steel group-hover:text-orange transition-colors" />
                    </div>
                  </button>
                </motion.div>
              </div>
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
                <span className="font-mono text-[9px] uppercase tracking-[0.5em] rotate-90 mb-4">Scroll</span>
                <div className="w-[1px] h-20 bg-gradient-to-b from-orange to-transparent" />
              </div>
            </motion.section>

            <motion.section id="expertise" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }} className="py-12 lg:py-24 px-4 md:px-8 lg:px-12 relative flex items-center">
              <div className="max-w-6xl mx-auto w-full">
                <SectionHeader title="Expertise Genevoise" sub="Leader du levage vertical à Genève. Nous transformons les défis logistiques complexes en manœuvres de précision certifiées SUVA." mono="Standard d'Excellence" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                  <ExpertiseCard icon={Settings} title="Précision Laser" desc="Manutention au millimètre pour vos biens les plus précieux. Une maîtrise technique absolue du monte-meubles." delay={0.1} />
                  <ExpertiseCard icon={ShieldCheck} title="Sécurité SUVA" desc="Conformité totale aux normes suisses de sécurité. Protection intégrale des infrastructures et des tiers." delay={0.2} />
                  <ExpertiseCard icon={Clock} title="Disponibilité 24/7" desc="Réactivité stratégique pour les urgences et planification sur-mesure pour vos projets industriels." delay={0.3} />
                </div>
              </div>
            </motion.section>

            <motion.section id="synergy" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="py-24 lg:py-32 px-6 md:px-12 lg:px-20 relative bg-transparent border-t border-white/5 overflow-hidden">
              <div className="absolute inset-0 technical-grid opacity-10 pointer-events-none" />
              <div className="max-w-7xl mx-auto relative z-10">
                <SectionHeader title="L'Écosystème BatiMove" sub="La synergie parfaite entre le levage vertical e la logistique de transport for une maîtrise totale de votre flux." mono="Synergie Stratégique" />
                <div className="grid grid-cols-12 gap-8 lg:gap-12 items-stretch">
                  <div className="col-span-12 lg:col-span-8 relative aspect-[16/9] bg-black/60 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl group">
                    <img src="/logistic.png" alt="Logistique Verticale Genève" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[3s]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl">
                      <div className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-off-white">Flux Opérationnel Actif</span>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    <motion.div 
                      whileHover={{ x: 10 }}
                      className="flex-1 p-8 bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[2rem] space-y-4 hover:border-orange/20 transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity"><Activity size={64} /></div>
                      <h4 className="text-2xl font-display font-black uppercase text-off-white group-hover:text-orange transition-colors">Maîtrise</h4>
                      <p className="text-steel text-sm leading-relaxed">Une coordination sans faille for minimiser les temps d'arrêt e optimiser la sécurité de chaque transfert.</p>
                      <div className="pt-4"><span className="text-[10px] font-mono text-orange uppercase tracking-widest border-b border-orange/30 pb-1 cursor-pointer hover:border-orange transition-all">Consulter les Protocoles</span></div>
                    </motion.div>
                    <div className="p-8 bg-gradient-to-br from-orange/[0.07] to-transparent backdrop-blur-3xl border border-orange/10 rounded-[2.5rem] space-y-8 group relative overflow-hidden">
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-orange tracking-[0.5em] uppercase font-black">Partenaire Elite</span>
                        <h4 className="text-5xl font-display font-black uppercase text-off-white tracking-tighter">BatiMove</h4>
                      </div>
                      <a href="https://batimove.ch" target="_blank" rel="noopener noreferrer" className="btn-luxury-orange group w-full text-white cursor-pointer py-4 shadow-[0_20px_40px_-15px_rgba(255,83,4,0.3)] overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <span className="font-display font-black text-[10px] uppercase tracking-[0.2em] relative z-10">Explorez BatiMove</span>
                        <div className="btn-luxury-icon-wrapper relative z-10"><ArrowUpRight size={14} /></div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section id="protocoles" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="py-24 lg:py-32 px-6 md:px-12 lg:px-20 bg-transparent border-b border-white/5 relative">
              <div className="max-w-7xl mx-auto">
                <SectionHeader title="Protocole Haute-Sûreté" sub="Une méthodologie rigoureuse, du site-survey à la manœuvre finale, for une sécurité sans compromis." mono="Sécurité Certifiée" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: 'Site Survey', desc: 'Audit technique de terrain e validation de la charge utile.', icon: Search },
                    { title: 'Plan de Levage', desc: 'Conception CAO des trajectoires e calcul des forces de vent.', icon: Compass },
                    { title: 'Setup SUVA', desc: 'Installation certifiée e sécurisation du périmètre public.', icon: ShieldCheck },
                    { title: 'Manœuvre', desc: 'Exécution de précision assistée par télémétrie laser.', icon: Zap }
                  ].map((step, i) => (
                    <motion.div 
                      key={step.title} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }} 
                      className="group relative p-px rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent hover:from-orange/30 transition-all duration-700"
                    >
                      <div className="relative z-10 p-10 flex flex-col justify-between rounded-[2.4rem] bg-[#0A0F14] backdrop-blur-3xl overflow-hidden shadow-2xl h-full border border-white/5">
                        {/* Interactive Grid Background */}
                        <div className="absolute inset-0 technical-grid opacity-[0.03] group-hover:opacity-[0.07] transition-opacity" />
                        
                        <div className="relative z-10 space-y-8">
                          <div className="flex justify-between items-start">
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-orange/30 group-hover:bg-orange/5 transition-all duration-500 relative">
                              <step.icon size={24} className="text-orange relative z-10" />
                              <div className="absolute inset-0 bg-orange/20 blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                            </div>
                            
                            {/* Rotating Tech Badge */}
                            <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                              className="w-12 h-12 relative opacity-20 group-hover:opacity-100 transition-opacity"
                            >
                              <svg viewBox="0 0 100 100" className="w-full h-full">
                                <path id={`circlePath-${i}`} d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                                <text className="text-[10px] font-mono fill-orange uppercase tracking-[0.2em]">
                                  <textPath xlinkHref={`#circlePath-${i}`}>PRECISION • GENÈVE • </textPath>
                                </text>
                              </svg>
                            </motion.div>
                          </div>
                          
                          <div className="space-y-4">
                            <h4 className="text-2xl font-display font-black uppercase text-off-white group-hover:text-orange transition-colors duration-500 tracking-tighter">
                              {step.title}
                            </h4>
                            <p className="text-[13px] text-steel leading-relaxed font-medium opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                              {step.desc}
                            </p>
                          </div>
                        </div>

                        {/* Bottom Light Bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            <footer className="py-12 border-t border-white/5 bg-petrol/50 backdrop-blur-md">
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono uppercase tracking-widest text-steel/60">
                <div className="order-3 md:order-1 flex items-center gap-4">
                  <span>© 2024 Monte Charge</span>
                  <span className="hidden md:block w-1 h-1 rounded-full bg-white/10" />
                  <a href="#mentions" onClick={(e) => { e.preventDefault(); setActiveModal('mentions'); }} className="hover:text-orange transition-colors">Mentions Légales</a>
                </div>
                
                <div className="order-1 md:order-2">
                  <a 
                    href="https://joshsegatt.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 hover:text-off-white transition-all group"
                  >
                    <span>Made with</span>
                    <span className="text-orange animate-pulse">❤️</span>
                    <span>by</span>
                    <span className="text-off-white font-black group-hover:text-orange transition-colors">joshsegatt</span>
                  </a>
                </div>

                <div className="order-2 md:order-3 flex items-center gap-6">
                  {['Expertise', 'Synergy', 'Protocoles'].map(item => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-orange transition-colors">{item}</a>
                  ))}
                  <button onClick={() => navigateTo('contact')} className="text-orange font-black hover:scale-110 transition-transform">Contact</button>
                </div>
              </div>
            </footer>
          </motion.div>
        ) : (
          <ContactPage key="contact" navigateTo={navigateTo} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[130] flex items-center justify-center p-4">
            <motion.div onClick={() => setActiveModal(null)} className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-pointer" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative w-full max-w-4xl max-h-[85vh] bg-[#0A0F14] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col">
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h2 className="text-4xl font-display font-black uppercase text-off-white">{activeModal === 'mentions' ? 'Mentions Légales' : 'Standard Sécurité'}</h2>
                <button onClick={() => setActiveModal(null)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-12">
                <p className="text-steel leading-relaxed">{activeModal === 'mentions' ? 'BATIMOVE Sàrl, Rue De-MONTHOUX 64, 1201 Genève. UID: CHE-143.091.230' : 'Protocoles certifiés SUVA et standards de sécurité Genève.'}</p>
              </div>
              <div className="p-6 border-t border-white/5 text-center"><p className="text-[9px] font-mono text-steel/20 uppercase tracking-[0.4em]">Monte Charge Genève • Précis. Sécurisé. Suisse.</p></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
