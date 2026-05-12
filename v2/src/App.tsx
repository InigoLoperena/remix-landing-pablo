/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radar, 
  Trash2, 
  Camera, 
  MapPin, 
  TrendingDown, 
  Trees, 
  Droplets, 
  Zap, 
  ChevronRight, 
  Menu, 
  X,
  Target,
  ShieldCheck,
  Eye,
  ArrowRight,
  Armchair,
  Skull,
  Radio,
  Flame,
  Bomb,
  User
} from 'lucide-react';

// --- Components ---

const DustParticles = () => {
  const [particles] = useState(() => Array.from({ length: 30 }));
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((_, i) => (
        <div
          key={i}
          className="dust-particle animate-drift"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${15 + Math.random() * 20}s`,
            opacity: 0.1 + Math.random() * 0.4,
          }}
        />
      ))}
    </div>
  );
};

const BackgroundRadar = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03] z-0">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] border-[2px] border-toxic-green/20 rounded-full" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] border-[1px] border-toxic-green/10 rounded-full" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] border-[1px] border-toxic-green/5 rounded-full" />
    <motion.div 
      className="absolute top-1/2 left-1/2 w-[150vw] h-[200px] bg-gradient-to-r from-transparent via-toxic-green/10 to-toxic-green/40 origin-left -translate-y-1/2 blur-2xl"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const Logo = () => (
  <div className="flex items-center gap-2 font-display font-black tracking-tighter text-2xl uppercase">
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 bg-toxic-green blur-md opacity-20 animate-pulse"></div>
      <img src="https://drive.google.com/uc?export=view&id=15jZgBY97yECWW7_F6BIdm9N0zp4Ncnpe" alt="GreenHunt Logo" className="w-8 h-8 relative z-10 object-contain" />
    </div>
    <span className="text-white drop-shadow-[2px_2px_0px_#000]">Green<span className="text-toxic-green">Hunt</span></span>
  </div>
);

const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const variants: any = {
    primary: 'bg-toxic-green text-black hover:bg-white shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none',
    outline: 'border-2 border-toxic-green text-toxic-green hover:bg-toxic-green/10 shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none',
    ghost: 'text-gray-500 hover:text-toxic-green font-mono',
    hazard: 'hazard-stripes text-white font-black hover:brightness-125 shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none',
  };

  return (
    <button 
      className={`relative px-8 py-3 font-display font-black transition-all duration-100 flex items-center justify-center gap-2 group uppercase tracking-widest ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// --- Audio & Static Components ---
const WastelandAudio = () => {
  useEffect(() => {
    const playCue = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        const type = Math.random() > 0.5 ? 'sine' : 'sawtooth';
        oscillator.type = type as OscillatorType;
        oscillator.frequency.setValueAtTime(Math.random() * 100 + 40, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1);
      } catch (e) {
        // Silently fail if audio context is blocked
      }
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) playCue();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

const ScreenStatic = () => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    const triggerStatic = () => {
      setShow(true);
      setTimeout(() => setShow(false), 200);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.8) triggerStatic();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] opacity-20 overflow-hidden">
      <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] animate-static-glitch"></div>
    </div>
  );
};

const SectionHeading = ({ title, subtitle, badge }: { title: string; subtitle?: string; badge?: string }) => (
  <div className="mb-12">
    {badge && (
      <span className="inline-block px-2 py-1 bg-hazard-yellow text-black text-[10px] font-pixel mb-4 tracking-widest uppercase pixel-shadow">
        {badge}
      </span>
    )}
    <h2 className="text-6xl md:text-8xl font-display mb-6 tracking-tight text-white uppercase leading-[0.85] drop-shadow-[4px_4px_0px_#000]" data-text={title}>
      {title}
    </h2>
    {subtitle && <p className="text-dust font-typewriter text-lg max-w-2xl leading-relaxed">{subtitle}</p>}
  </div>
);

// --- Sections ---

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden industrial-grid border-b-4 border-black rust-effect">
      <div className="container mx-auto px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-8xl md:text-[11rem] font-display leading-[0.8] mb-4 tracking-tighter text-white uppercase drop-shadow-[8px_8px_0px_#000]">
              HUNT.<br />RECLAIM.<br /><span className="text-toxic-green">REDEEM.</span>
            </h1>
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-rust"></div>
              <span className="text-hazard-yellow font-display text-2xl tracking-[0.2em] uppercase italic">Stooping Real World Game</span>
              <div className="h-px flex-1 bg-rust"></div>
            </div>
            <p className="text-xl md:text-2xl text-dust mb-10 max-w-xl font-typewriter italic leading-relaxed">
              "NYC is a board game where valuable free finds suddenly appear." 
              <br /><span className="text-white drop-shadow-md">Save the planet from apocalypsis by sharing photos and coordinates of discarded street finds.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                variant="hazard" 
                className="text-xl py-5"
                onClick={() => window.location.href = 'https://green-hunt-web-v1.vercel.app/app'}
              >
                START THE HUNT (FREE)
              </Button>
              <div className="flex flex-col justify-center">
                 <p className="text-[11px] font-pixel tracking-widest text-dust/60 uppercase">Instant Access</p>
                 <p className="text-[10px] font-mono text-toxic-green opacity-80 uppercase">No Apps. Just Survival.</p>
              </div>
            </div>
          </motion.div>

          <div className="relative hidden lg:flex items-center justify-center">
            {/* Scrap Radar */}
            <div className="relative w-[500px] h-[500px] border-4 border-black bg-zinc-900/40 rounded-full flex items-center justify-center overflow-hidden scrap-border">
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30">
                  <div className="flex items-center gap-2 text-toxic-green font-pixel text-[8px] tracking-[0.2em] bg-black/80 px-4 py-1 border border-toxic-green/30 pixel-shadow whitespace-nowrap">
                    <Radio size={12} className="animate-flicker" /> WASTELAND_RADAR: ACTIVE
                  </div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
                  <div className="flex items-center gap-2 text-hazard-yellow font-pixel text-[8px] tracking-[0.2em] bg-black/80 px-4 py-1 border border-hazard-yellow/30 pixel-shadow whitespace-nowrap">
                    <ShieldCheck size={12} className="animate-pulse" /> 5_CURB_ALERTS_DETECTED
                  </div>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(57,255,20,0.1)_0%,_transparent_70%)]"></div>
                <div className="w-[350px] h-[350px] border border-toxic-green/10 rounded-full"></div>
                <div className="w-[200px] h-[200px] border border-toxic-green/20 rounded-full"></div>
                
                {/* Radar Sweeper */}
                <motion.div 
                    className="absolute top-1/2 left-1/2 w-full h-[4px] bg-gradient-to-r from-transparent to-toxic-green origin-left"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Simulated Pins with Scan Sync */}
                {[
                  { top: '25%', left: '66%', color: 'bg-toxic-green', delay: 0.2 },
                  { top: '66%', left: '25%', color: 'bg-hazard-yellow', delay: 1.0 },
                  { top: '50%', left: '33%', color: 'bg-toxic-green', delay: 1.5 },
                  { top: '40%', left: '80%', color: 'bg-toxic-green', delay: 0.5 },
                  { top: '75%', left: '60%', color: 'bg-hazard-yellow', delay: 2.2 },
                ].map((pin, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-3 h-3 ${pin.color} border-2 border-black rotate-45 z-20`}
                    style={{ top: pin.top, left: pin.left }}
                    animate={{ 
                      scale: [1, 2, 1],
                      opacity: [0.3, 1, 0.3],
                      boxShadow: pin.color === 'bg-hazard-yellow' 
                        ? ['0 0 0px #FFD700', '0 0 20px #FFD700', '0 0 0px #FFD700']
                        : ['0 0 0px #39FF14', '0 0 20px #39FF14', '0 0 0px #39FF14']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: pin.delay
                    }}
                  />
                ))}
            </div>

            {/* Salvaged Junk Elements */}
            <div className="absolute -top-10 -right-10 w-24 h-24 rotate-12 opacity-40">
              <Skull className="w-full h-full text-rust" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TheProblem = () => {
  return (
    <section className="py-24 relative bg-black/40 border-b-4 border-black industrial-grid">
      <div className="container mx-auto px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute inset-0 bg-rust/20 blur-3xl rounded-full"></div>
            <div className="relative bg-zinc-900 border-4 border-black p-2 scrap-border group overflow-hidden">
              <img 
                src="https://drive.google.com/uc?export=view&id=1F87zAG0Ou-PB-QeqXiqXX_8f25waOGA-" 
                alt="The Machine - NYC Garbage Unit"
                className="w-full h-full object-cover grayscale brightness-[0.35] contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" 
                referrerPolicy="no-referrer"
              />
              
              {/* Headlight Glows */}
              <div className="absolute top-[45%] left-[30%] w-8 h-8 bg-hazard-yellow/40 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute top-[45%] left-[60%] w-8 h-8 bg-hazard-yellow/40 rounded-full blur-xl animate-pulse"></div>
              
              {/* Steam Particles */}
              <div className="absolute top-[60%] right-[10%] w-4 h-4 bg-white/20 rounded-full blur-md animate-steam"></div>
              <div className="absolute top-[65%] right-[15%] w-3 h-3 bg-white/10 rounded-full blur-md animate-steam delay-700"></div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div className="absolute top-4 right-4 bg-red-900/90 text-white font-pixel text-[8px] px-2 py-1 border-2 border-red-500 animate-pulse shadow-[0_0_10px_#f00] z-20">
                SIGHTING_CONFIRMED: THE MACHINE // T34
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-rust/95 border-4 border-black/80 pixel-shadow z-20">
                <div className="flex items-center gap-3 text-hazard-yellow font-pixel text-[10px] mb-1">
                  <span className="w-3 h-3 bg-red-600 animate-ping rounded-full"></span> DANGER_ZONE_EXTRACT
                </div>
                <p className="text-white text-sm font-display uppercase tracking-widest italic drop-shadow-md">Unit Spotted: METRO_WASTE_REMOVAL // CRUSHING_MODE: ACTIVE</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading 
              badge="THE MACHINE"
              title="'The Machine' is starving for your salvage."
              subtitle="The steel jaws of the compactors are closing. They don't see value; they only see waste. Beat them to it."
            />
            <div className="grid gap-8">
              <div className="bg-black/60 p-6 border-l-4 border-rust pixel-shadow">
                <div className="text-[10px] font-pixel text-rust uppercase mb-2">Resource Loss</div>
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-display text-white tracking-widest italic">3,000,000 TONS</span>
                  <span className="text-xs font-mono text-dust/60 uppercase">Yearly Void</span>
                </div>
              </div>
              <div className="bg-black/60 p-6 border-l-4 border-toxic-green pixel-shadow">
                <div className="text-[10px] font-pixel text-toxic-green uppercase mb-2">Resistance Score</div>
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-display text-white tracking-widest italic">URBAN SCAVENGERS</span>
                  <span className="text-xs font-mono text-dust/60 uppercase">Active Units</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      code: '01',
      title: 'SIGHT',
      desc: 'Identify loot on the curb. Document the salvage before the compactors arrive.',
      icon: <Camera size={24} />,
      color: 'bg-toxic-green text-black'
    },
    {
      code: '02',
      title: 'RADAR',
      desc: 'Encrypted coordinates broadcasted to all units. Track what the machine hasn\'t reached.',
      icon: <Radar size={24} />,
      color: 'bg-toxic-green text-black'
    },
    {
      code: '03',
      title: 'REDEEM',
      desc: 'Intercept the value. Reclaim the treasures for the collective or yourself.',
      icon: <Target size={24} />,
      color: 'bg-toxic-green text-black'
    }
  ];

  return (
    <section className="py-24 bg-black/60 border-b-4 border-black rust-effect">
      <div className="container mx-auto px-10">
        <SectionHeading 
          badge="PROTOCOL"
          title="The Scavenger Laws."
          subtitle="Navigate the ruins with zero friction."
        />
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group bg-zinc-900 border-2 border-black p-6 scrap-border pixel-shadow">
              <div className="flex items-center gap-3 mb-6">
                <span className={`text-[10px] font-pixel px-1 ${step.color}`}>{step.code}</span>
                <span className="text-xl font-display text-white tracking-widest">{step.title}</span>
              </div>
              <p className="text-dust font-typewriter text-sm leading-relaxed mb-6 italic">{step.desc}</p>
              <div className="h-1 w-full bg-toxic-green/20 group-hover:bg-toxic-green/80 transition-all"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NearbyDiscoveries = () => {
  return (
    <section className="py-24 bg-black/80 relative border-b-4 border-black industrial-grid overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10 rotate-12">
        <Skull size={256} className="text-rust" />
      </div>
      
      <div className="container mx-auto px-10 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <SectionHeading 
            badge="LOCAL_LOOT"
            title="THE WASTELAND PROVIDES"
            subtitle="Recent extractions mapped by the resistance network."
          />
          <div className="flex gap-4">
            <Button variant="outline" className="text-xs py-2 px-4">VIEW_ALL_NYC</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              title: "LEATHER LOUNGE",
              dist: "0.6 MILES AWAY",
              cat: "Furniture",
              img: "https://images.unsplash.com/photo-1635338164010-09e0839eefb3?q=80&w=2670&auto=format&fit=crop",
              desc: "Abandoned on the curb. Weathered but structural. Rescue immediate.",
              reported: "30 MIN AGO",
              reporter: "Strocthunter25"
            },
            {
              title: "INDUSTRIAL STACK",
              dist: "1.2 MILES AWAY",
              cat: "Raw Material",
              img: "https://images.unsplash.com/photo-1610636881765-a6e43597d519?q=80&w=2670&auto=format&fit=crop",
              desc: "Scrap metal and wood components spotted in Long Island City wasteland.",
              reported: "1 HOUR AGO",
              reporter: "RuinWalker"
            },
            {
              title: "SIDEWALK JUNGLE",
              dist: "0.3 MILES AWAY",
              cat: "Botanical",
              img: "https://images.unsplash.com/photo-1520302823777-a51965757c8e?q=80&w=2670&auto=format&fit=crop",
              desc: "Three large potted plants left for the compactors. Oxygen units available.",
              reported: "15 MIN AGO",
              reporter: "ZionGreen"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-zinc-900 border-4 border-black p-4 scrap-border pixel-shadow group cursor-crosshair">
              <div className="relative h-64 mb-6 overflow-hidden border-2 border-black">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-hazard-yellow text-black font-pixel text-[8px] px-2 py-1 shadow-md">
                  {item.dist}
                </div>
                <div className="absolute top-4 right-4 bg-black/80 text-toxic-green font-pixel text-[8px] px-2 py-1 border border-toxic-green">
                  {item.cat}
                </div>
              </div>
              
              <h3 className="text-2xl font-display text-white mb-2 tracking-widest">{item.title}</h3>
              <p className="text-dust font-typewriter text-xs mb-6 opacity-70 italic">
                {item.desc}
              </p>
              
              <div className="flex items-center justify-between mb-6 p-2 bg-black/40 border border-rust/20">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-rust/30 flex items-center justify-center rounded-full">
                    <User size={12} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-pixel text-[8px]">{item.reporter}</div>
                    <div className="text-dust/40 font-pixel text-[6px]">POSTED {item.reported}</div>
                  </div>
                </div>
                <Flame size={16} className="text-rust animate-pulse" />
              </div>
              
              <Button 
                variant="hazard" 
                className="w-full py-4 text-xs font-pixel"
                onClick={() => window.location.href = 'https://green-hunt-web-v1.vercel.app/app'}
              >
                START HUNTING
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BoardGameMap = () => {
  const [scanPos, setScanPos] = useState(0);
  const [activePins, setActivePins] = useState<number[]>(Array.from({ length: 12 }, (_, i) => i));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setScanPos(prev => (prev + 0.5) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Update active pins randomly to simulate items appearing/disappearing
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePins(prev => {
        const pinCount = 12;
        const newPins = [...prev];
        if (Math.random() > 0.6) {
          const randIdx = Math.floor(Math.random() * pinCount);
          if (newPins.includes(randIdx)) {
            return newPins.filter(id => id !== randIdx);
          } else {
            return [...newPins, randIdx];
          }
        }
        return prev;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const pins = [
    { id: 0, top: 30, left: 20, icon: <Armchair size={16} /> },
    { id: 1, top: 50, left: 70, icon: <Trees size={16} /> },
    { id: 2, top: 70, left: 40, icon: <Trash2 size={16} /> },
    { id: 3, top: 40, left: 60, icon: <Zap size={16} /> },
    { id: 4, top: 20, left: 45, icon: <Flame size={16} /> },
    { id: 5, top: 60, left: 15, icon: <Droplets size={16} /> },
    { id: 6, top: 80, left: 85, icon: <Bomb size={16} /> },
    { id: 7, top: 15, left: 75, icon: <Camera size={16} /> },
    { id: 8, top: 45, left: 30, icon: <Trees size={16} /> },
    { id: 9, top: 35, left: 85, icon: <Trash2 size={16} /> },
    { id: 10, top: 65, left: 55, icon: <Zap size={16} /> },
    { id: 11, top: 85, left: 25, icon: <Armchair size={16} /> },
  ];

  return (
    <section className="py-24 bg-zinc-950 industrial-grid relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-rust/5"></div>
      <div className="container mx-auto px-10 relative z-10 text-center">
        <div className="max-w-4xl mx-auto mb-16">
          <div className="parchment p-8 rotate-1 pixel-shadow border-4 border-[#8B4513] mb-12">
            <h2 className="text-5xl md:text-6xl font-display text-rust mb-4">RESCUE MAP</h2>
            <div className="h-px bg-rust/30 w-1/2 mx-auto mb-4"></div>
            <p className="text-xl md:text-2xl font-typewriter italic text-rust/80">
              "Your city is like a board game where valuable free finds suddenly appear!"
            </p>
          </div>
        </div>

        <div className="relative w-full aspect-[16/9] max-w-6xl mx-auto border-8 border-black scrap-border pixel-shadow overflow-hidden group">
          <img 
            src="https://images.photowall.com/products/58350/new-york-map-bw.jpg?h=690" 
            alt="NYC Aerial Scavenger Map"
            className="w-full h-full object-cover grayscale brightness-[0.2] contrast-150 opacity-80"
          />
          <div className="absolute inset-0 bg-rust/20 mix-blend-overlay"></div>
          
          {/* Scan Line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-toxic-green/40 shadow-[0_0_15px_#39FF14] z-10 pointer-events-none"
            style={{ left: `${scanPos}%` }}
          ></div>

          {/* Pins like the board game image */}
          <AnimatePresence>
            {pins.map((pin) => {
               const isActive = activePins.includes(pin.id);
               const isScanned = Math.abs(pin.left - scanPos) < 2;
               if (!isActive && !isScanned) return null; // Keep them visible for a moment when scanned or if active

               return (
                 <motion.div
                   key={pin.id}
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0.5 }}
                   exit={{ scale: 0, opacity: 0 }}
                   className="absolute cursor-pointer group/pin"
                   style={{ top: `${pin.top}%`, left: `${pin.left}%`, zIndex: isScanned ? 30 : 20 }}
                 >
                  <div className="relative flex flex-col items-center">
                    <motion.div 
                      className="bg-toxic-green p-2 rounded-full border-4 border-black pixel-shadow group-hover/pin:scale-110 transition-transform"
                      animate={isScanned ? { scale: [1, 1.5, 1], rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="text-black">{pin.icon}</div>
                    </motion.div>
                    
                    {/* Beat Ring */}
                    {isScanned && (
                      <motion.div 
                        className="absolute inset-0 border-2 border-toxic-green rounded-full pointer-events-none"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}

                    <div className="w-1 h-8 bg-black mt-[-2px]"></div>
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-black/90 p-2 border border-toxic-green text-toxic-green font-pixel text-[8px] whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
                      RECLAIMABLE_ASSET_FOUND
                    </div>
                  </div>
               </motion.div>
             );
          })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  const posts = [
    {
      title: "How to survive the machine",
      date: "MAY 10 2026",
      desc: "Tactics for intercepting curb finds before the DSNY trucks arrive.",
      author: "RuinsWalker"
    },
    {
      title: "The hidden psychology of street finds",
      date: "MAY 08 2026",
      desc: "Why people discard gold and how to spot it from two blocks away.",
      author: "StoopSage"
    },
    {
      title: "Repairing in the ruins",
      date: "MAY 05 2026",
      desc: "A guide to basic restoration with salvaged parts.",
      author: "EcoFixer"
    }
  ];

  return (
    <section className="py-24 bg-black/40 industrial-grid border-b-4 border-black">
      <div className="container mx-auto px-10">
        <SectionHeading 
          badge="INTEL_CORE"
          title="SCAVENGER DISPATCH"
          subtitle="Field reports and survival guides for the modern urban explorer."
        />
        <div className="grid md:grid-cols-3 gap-12">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-zinc-900/80 border-4 border-black p-6 scrap-border pixel-shadow group cursor-pointer hover:bg-zinc-800 transition-colors">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-pixel text-rust">{post.date}</span>
                <ArrowRight size={16} className="text-toxic-green group-hover:translate-x-2 transition-transform" />
              </div>
              <h3 className="text-2xl font-display text-white mb-4 tracking-widest group-hover:text-toxic-green transition-colors">{post.title}</h3>
              <p className="text-dust font-typewriter text-xs mb-6 opacity-70 italic leading-relaxed">
                "{post.desc}"
              </p>
              <div className="flex items-center gap-2 pt-4 border-t border-rust/20">
                <div className="w-6 h-6 bg-toxic-green/20 rounded-full flex items-center justify-center">
                  <User size={12} className="text-toxic-green" />
                </div>
                <span className="text-[8px] font-pixel text-dust/60 uppercase">AUTHORED_BY: {post.author}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button variant="outline" className="text-xs">ACCESS_ALL_ARCHIVES</Button>
        </div>
      </div>
    </section>
  );
};

const ImpactPanel = () => {
  const stats = [
    { label: "CO2 Saved", value: "55 lb.", icon: <Zap size={20} /> },
    { label: "Water Saved", value: "72 gal.", icon: <Droplets size={20} /> },
    { label: "Trees Saved", value: "6 TREES", icon: <Trees size={20} /> },
    { label: "Waste Diverted", value: "85 lb.", icon: <Trash2 size={20} /> },
  ];

  return (
    <section className="py-24 bg-zinc-950 industrial-grid border-b-4 border-black rust-effect">
      <div className="container mx-auto px-10">
        <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl font-display text-hazard-yellow mb-4 drop-shadow-[2px_2px_0px_#000]">TRACK YOUR IMPACT AND COMPETE</h2>
            <p className="font-pixel text-[10px] text-rust tracking-[0.3em] uppercase">Join the local rankings in NYC wasteland</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Stats Board */}
          <div className="parchment p-8 pixel-shadow border-4 border-[#8B4513] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 hazard-stripes opacity-20"></div>
            <div className="mb-8 text-center border-b-2 border-rust/30 pb-4">
              <h3 className="text-3xl font-display text-rust">+120 Green Points</h3>
            </div>
            
            <div className="space-y-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="text-rust p-2 bg-black/5 rounded">{stat.icon}</div>
                    <span className="text-xl font-display text-rust/80 group-hover:text-rust transition-colors">{stat.label}</span>
                  </div>
                  <span className="text-2xl font-pixel text-rust">{stat.value}</span>
                </div>
              ))}
              <div className="mt-8 pt-8 border-t-2 border-rust/30 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rust/10 flex items-center justify-center p-2">
                    <Armchair className="text-rust" size={32} />
                  </div>
                  <span className="text-2xl font-display text-rust">41 Items Rescued</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ranking List */}
          <div className="bg-black/80 border-4 border-rust p-6 pixel-shadow overflow-hidden relative">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-display text-toxic-green tracking-widest">New York Ranking</h3>
              <div className="text-[8px] font-pixel text-toxic-green/50">SECURE_FEED // LIVE_STATUS</div>
            </div>
            
            <div className="space-y-4">
              {[
                { name: "GaiaGuard Nick", points: "3,100", rank: "#1", color: "text-toxic-green" },
                { name: "EcoWatden", points: "2,950", rank: "#2", color: "text-white" },
                { name: "Dr Green", points: "2,750", rank: "#3", color: "text-white" },
                { name: "Lily Pamirez", points: "2,600", rank: "#4", color: "text-white" },
              ].map((user, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 gap-3 border border-white/5 bg-zinc-900/50 hover:bg-toxic-green/5 transition-all group/item overflow-hidden">
                  <div className="flex items-center gap-3">
                    <span className="font-pixel text-[10px] text-rust shrink-0">{user.rank}</span>
                    <div className="w-10 h-10 bg-zinc-800 border border-rust flex items-center justify-center shrink-0">
                      <Skull size={20} className="text-rust/40" />
                    </div>
                    <div className="min-w-0">
                      <div className={`font-display text-lg truncate ${user.color}`}>{user.name}</div>
                      <div className="text-[10px] font-pixel text-rust/60 truncate uppercase tracking-tighter">SCAVENGER // LEVEL {10 - idx}</div>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
                    <div className="text-toxic-green font-pixel text-[10px] sm:text-xs shrink-0">{user.points} <span className="sm:hidden">GP</span><span className="hidden sm:inline">GreenPoints</span></div>
                    <button className="text-[8px] font-pixel text-rust uppercase hover:text-white transition-colors">View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="py-40 relative overflow-hidden bg-black border-t-4 border-black rust-effect">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(57,255,20,0.15)_0%,_transparent_100%)]"></div>
        <div className="hazard-stripes h-20 absolute top-0 left-0 right-0 opacity-10"></div>
        <div className="hazard-stripes h-20 absolute bottom-0 left-0 right-0 opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-10 relative z-10 text-center">
        <h2 className="text-8xl md:text-[12rem] font-display mb-10 tracking-tighter text-white uppercase leading-none drop-shadow-[10px_10px_0px_#000]">
          JOIN THE<br /><span className="text-toxic-green">RESISTANCE</span>
        </h2>
        <div className="flex flex-col items-center justify-center gap-8">
          <Button 
            variant="hazard" 
            className="text-3xl px-20 py-8 scale-110"
            onClick={() => window.location.href = 'https://green-hunt-web-v1.vercel.app/app'}
          >
            START THE HUNT (FREE)
          </Button>
          <div className="flex items-center gap-4 text-[11px] font-pixel tracking-widest text-dust/60 italic uppercase bg-black/60 px-4 py-2 border border-white/5">
            <Skull size={14} className="text-rust" /> REGISTER_ENCRYPTED // SURVIVE THE MACHINE
          </div>
        </div>
      </div>
    </section>
  );
};

const Navbar = () => {
  return (
    <header className="h-20 fixed top-0 left-0 right-0 z-50 border-b-4 border-black px-10 flex items-center justify-between bg-zinc-900/60 backdrop-blur-md scrap-border">
      <div className="flex items-center gap-6">
        <Logo />
        <div className="h-8 w-1 bg-toxic-green/20 hidden sm:block"></div>
        <span className="text-[10px] font-pixel text-dust/60 tracking-[0.2em] uppercase hidden lg:block italic">NYC / Wasteland_01</span>
      </div>
      <div className="flex items-center gap-8 text-[11px] font-pixel tracking-widest">
        <div className="hidden md:flex items-center gap-2 text-toxic-green/60">
          <span className="text-[8px]">SNR</span>
          <div className="flex gap-0.5 items-end h-3">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-toxic-green"
                animate={{ height: [`${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatType: 'reverse' }}
              />
            ))}
          </div>
        </div>
        <span className="text-toxic-green hidden md:block animate-pulse">RADAR_ONLINE</span>
        <button 
          className="bg-rust text-white px-4 py-2 border-2 border-black pixel-shadow hover:brightness-125 transition-colors uppercase font-display tracking-widest scale-90"
          onClick={() => window.location.href = 'https://green-hunt-web-v1.vercel.app/login'}
        >
          LOGIN_RESISTANCE
        </button>
      </div>
    </header>
  );
};

const Ticker = () => (
  <footer className="h-10 fixed bottom-0 left-0 right-0 z-50 rust-bar text-dust flex items-center overflow-hidden whitespace-nowrap border-t-4 border-black">
    <div className="flex animate-ticker font-display font-black text-sm uppercase tracking-tighter">
      {[...Array(4)].map((_, i) => (
        <React.Fragment key={i}>
          <span className="px-8 text-hazard-yellow">The asphalt is ours</span>
          <span className="px-8 text-rust font-pixel text-[10px]">#</span>
          <span className="px-8 font-mono">3,000,000 TONS WASTED ANNUALLY</span>
          <span className="px-8 text-rust font-pixel text-[10px]">#</span>
          <span className="px-8 text-toxic-green animate-flicker">Join the Scavenger Resistance</span>
          <span className="px-8 text-rust font-pixel text-[10px]">#</span>
          <span className="px-8 font-pixel text-[10px] text-dust/60">RECLAIM THE RUINS</span>
          <span className="px-8 text-rust font-pixel text-[10px]">#</span>
        </React.Fragment>
      ))}
    </div>
  </footer>
);

export default function App() {
  const [detectionId, setDetectionId] = useState('77A');

  useEffect(() => {
    const interval = setInterval(() => {
      const hex = Math.floor(Math.random() * 0xFFF).toString(16).toUpperCase().padStart(3, '0');
      const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      const newId = `${hex}${letter}`;
      setDetectionId(newId);
      document.title = `GreenHunt // DETECTION ALERT: ${newId}`;
    }, 4000);

    return () => {
      clearInterval(interval);
      document.title = "GreenHunt - Urban Scavenger Radar";
    };
  }, []);

  return (
    <div className="selection:bg-toxic-green selection:text-black">
      <WastelandAudio />
      <ScreenStatic />
      <div className="crt-overlay animate-flicker"></div>
      <div className="noise-overlay"></div>
      <div className="scan-line"></div>
      <DustParticles />
      <BackgroundRadar />
      
      <Navbar />
      <Hero />
      <TheProblem />
      <HowItWorks />
      <NearbyDiscoveries />
      <BoardGameMap />
      <Blog />
      <ImpactPanel />
      <FinalCTA />
      <div className="h-24 bg-black"></div> {/* Spacing for ticker */}
      <Ticker />
    </div>
  );
}
