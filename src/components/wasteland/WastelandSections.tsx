import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera, Radar, Target, Skull, Radio, ShieldCheck,
  Armchair, Sofa, Bed, Lamp, Refrigerator, Tv, Monitor
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import theMachineImg from '@/assets/the-machine.jpg';
import { WastelandButton, SectionHeading } from './WastelandNav';

export const HeroSection = () => {
  const [radarPins, setRadarPins] = useState<{ id: number; top: number; left: number; angle: number; color: string; Icon: React.ElementType }[]>([]);
  const [scanAngle, setScanAngle] = useState(0);
  const activePinsRef = useRef<number[]>([]);
  const [renderTrigger, setRenderTrigger] = useState(0);

  const ICONS = [Armchair, Sofa, Bed, Lamp, Refrigerator, Tv, Monitor];

  useEffect(() => {
    const hour = new Date().getHours();
    const counts = [5, 8, 20, 12, 6, 9];
    const count = counts[hour % counts.length];

    const seededRandom = (seed: number) => {
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    const newPins = Array.from({ length: count }).map((_, i) => {
      const radiusPercent = seededRandom(hour * 100 + i) * 38 + 5; // 5% to 43% radius
      const angleRad = seededRandom(hour * 200 + i) * Math.PI * 2;
      
      const top = 50 + Math.sin(angleRad) * radiusPercent;
      const left = 50 + Math.cos(angleRad) * radiusPercent;
      let angle = angleRad * (180 / Math.PI);
      if (angle < 0) angle += 360;

      const isToxic = seededRandom(hour * 300 + i) > 0.3;
      const Icon = ICONS[Math.floor(seededRandom(hour * 400 + i) * ICONS.length)];

      return {
        id: i,
        top,
        left,
        angle,
        Icon,
        color: isToxic ? 'text-toxic-green' : 'text-parchment',
      };
    });
    setRadarPins(newPins);
    activePinsRef.current = newPins.map(p => p.id);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanAngle(prev => {
        const next = (prev + 2.5) % 360;
        let changed = false;
        
        radarPins.forEach(pin => {
          let passed = false;
          if (prev < next) passed = pin.angle >= prev && pin.angle < next;
          else passed = pin.angle >= prev || pin.angle < next;

          if (passed) {
            if (Math.random() < 0.15) {
              const isActive = activePinsRef.current.includes(pin.id);
              if (isActive) activePinsRef.current = activePinsRef.current.filter(id => id !== pin.id);
              else activePinsRef.current.push(pin.id);
              changed = true;
            }
          }
        });
        
        if (changed) setRenderTrigger(v => v + 1);
        return next;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [radarPins]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden border-b-4 border-rust">
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-pixel leading-[0.85] mb-6 tracking-tighter text-rust uppercase drop-shadow-[4px_4px_0px_rgba(61,38,22,0.2)]">
              HUNT.<br />RECLAIM.<br /><span className="text-toxic-green drop-shadow-[3px_3px_0px_#3d2616]">REDEEM.</span>
            </h1>
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-rust" />
              <span className="text-rust font-mono-vt font-bold text-sm md:text-lg tracking-[0.2em] uppercase text-center">Stooping Real World Game</span>
              <div className="h-px flex-1 bg-rust" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display text-rust mb-6 leading-tight uppercase">
              The machine wants it crushed.<br />We want it in your living room.
            </h2>
            <p className="text-lg md:text-xl text-rust mb-8 max-w-xl font-mono-vt leading-relaxed">
              Don't rely on slow social media stories. GreenHunt is the real-time radar for urban stooping. Spot abandoned treasures, get live curb alerts, and beat the garbage trucks.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <WastelandButton variant="primary" className="text-lg md:text-xl py-4 rounded-md" onClick={() => window.location.href = 'https://green-hunt-web-v1.vercel.app/app'}>
                OPEN THE RADAR
              </WastelandButton>
              <div className="flex flex-col justify-center">
                <p className="text-[11px] font-mono-vt font-bold tracking-widest text-rust uppercase">Instant Access</p>
                <p className="text-[10px] font-mono-vt text-toxic-green font-bold uppercase">No Apps. Just Survival.</p>
              </div>
            </div>
          </motion.div>

          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-[450px] h-[450px] border-4 border-rust bg-parchment rounded-full flex items-center justify-center overflow-hidden scrap-border pixel-shadow">
              <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30">
                <div className="flex items-center gap-2 text-toxic-green font-mono-vt font-bold text-[10px] tracking-[0.1em] bg-rust px-4 py-1 border-2 border-toxic-green/50 pixel-shadow text-parchment whitespace-nowrap">
                  <Radio size={12} className="animate-flicker" /> WASTELAND_RADAR: ACTIVE
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
                <div className="flex items-center gap-2 text-parchment font-mono-vt font-bold text-[10px] tracking-[0.1em] bg-rust px-4 py-1 border-2 border-rust pixel-shadow whitespace-nowrap">
                  <ShieldCheck size={12} className="animate-pulse" /> {activePinsRef.current.length}_CURB_ALERTS_DETECTED
                </div>
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(57,255,20,0.1)_0%,_transparent_70%)]" />
              <div className="w-[300px] h-[300px] border border-toxic-green/10 rounded-full" />
              <div className="w-[150px] h-[150px] border border-toxic-green/20 rounded-full" />
              <div className="absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent to-toxic-green origin-left z-10"
                style={{ transform: `translateY(-50%) rotate(${scanAngle}deg)` }}
              />
              {radarPins.map((pin) => {
                const isActive = activePinsRef.current.includes(pin.id);
                if (!isActive) return null;

                const diff = Math.abs(scanAngle - pin.angle);
                const distance = Math.min(diff, 360 - diff);
                const isScanned = distance < 15;

                return (
                  <motion.div
                    key={pin.id}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    style={{ top: `${pin.top}%`, left: `${pin.left}%` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        className={`p-1.5 rounded-full border-2 border-rust bg-rust/80 ${pin.color} pixel-shadow`}
                        animate={isScanned ? { scale: [1, 1.4, 1], filter: ['brightness(1)', 'brightness(2)', 'brightness(1)'] } : {}}
                        transition={{ duration: 0.4 }}
                      >
                        <pin.Icon size={14} />
                      </motion.div>
                      {isScanned && (
                        <motion.div
                          className={`absolute inset-0 border-2 border-current ${pin.color} rounded-full pointer-events-none`}
                          initial={{ scale: 1, opacity: 0.8 }}
                          animate={{ scale: 2.5, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Responsive Animated Hand Phone */}
      <motion.div
        className="absolute bottom-[-10px] right-[-20px] md:bottom-[-20px] md:right-[-40px] lg:bottom-[-40px] lg:right-[-60px] z-20 pointer-events-none origin-bottom-right"
        initial={{ x: '100vw', y: '50vh', rotate: 20 }}
        animate={{ x: 0, y: 0, rotate: -5 }}
        transition={{ type: 'spring', bounce: 0.2, duration: 1.2, delay: 0.5 }}
      >
        <motion.img
          src="/hand-phone.png"
          alt="GreenHunt App on Phone"
          className="w-[360px] sm:w-[480px] md:w-[600px] lg:w-[720px] xl:w-[880px] 2xl:w-[1120px] drop-shadow-[15px_15px_0px_rgba(61,38,22,0.4)]"
          animate={{ y: [0, -15, 0], scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export const TheCoreLoopSection = () => {
  const steps = [
    { 
      code: '01: THE DROP', 
      title: 'SPOT IT. SCAN IT. EARN.', 
      desc: "See a perfect mid-century chair on the sidewalk? Snap a photo and drop a pin on the radar. You earn GreenCoins instantly for fueling the resistance, even if you don't take the item yourself.", 
      icon: <Camera size={24} /> 
    },
    { 
      code: '02: THE CATCH', 
      title: 'TRACK IT. CLAIM IT. UPGRADE.', 
      desc: 'Stop overpaying for retail furniture. Get instant push notifications when treasure drops in your radius. Run, rescue it before the compactor arrives, and furnish your apartment for $0.', 
      icon: <Target size={24} /> 
    },
  ];
  return (
    <section className="py-16 bg-parchment border-b-4 border-rust industrial-grid">
      <div className="container mx-auto px-6 md:px-10">
        <div className="mb-12 text-center">
          <span className="inline-block px-2 py-1 bg-toxic-green text-rust text-[10px] font-mono-vt font-bold mb-4 tracking-widest uppercase border-2 border-rust shadow-[2px_2px_0px_#3d2616]">
            PROTOCOL
          </span>
          <h2 className="text-5xl md:text-7xl font-display mb-4 tracking-wider text-rust uppercase">
            HACK THE SYSTEM. FURNISH YOUR LIFE.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group bg-rust border-4 border-rust p-6 scrap-border pixel-shadow flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <span className="text-[12px] font-mono-vt font-bold px-3 py-1 border-2 border-parchment bg-toxic-green text-rust inline-block mb-3">{step.code}</span>
                  <h3 className="text-xl md:text-2xl font-pixel text-parchment leading-tight mb-4">{step.title}</h3>
                </div>
                <p className="text-parchment/90 font-mono-vt text-lg leading-relaxed mb-4 bg-black/20 p-4 border border-rust">{step.desc}</p>
              </div>
              <div className="h-2 w-full bg-toxic-green/30 group-hover:bg-toxic-green transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TheManifestoSection = () => (
  <section className="py-16 relative bg-parchment/60 border-b-4 border-rust industrial-grid">
    <div className="container mx-auto px-6 md:px-10">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="order-2 lg:order-1 relative group">
          <div className="absolute inset-0 bg-rust/10 blur-3xl rounded-full" />
          <div className="relative bg-parchment border-4 border-rust p-2 scrap-border pixel-shadow group overflow-hidden max-w-lg mx-auto">
            <img
              src={theMachineImg}
              alt="The Machine - NYC Garbage Unit"
              className="w-full h-full object-cover grayscale brightness-[0.35] contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 aspect-square"
            />
            <div className="absolute top-[45%] left-[30%] w-8 h-8 bg-toxic-green/40 rounded-full blur-xl animate-pulse" />
            <div className="absolute top-[45%] left-[60%] w-8 h-8 bg-toxic-green/40 rounded-full blur-xl animate-pulse" />
            <div className="absolute top-[60%] right-[10%] w-4 h-4 bg-white/20 rounded-full blur-md animate-steam" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute top-4 right-4 bg-rust text-white font-mono-vt font-bold text-[10px] px-2 py-1 border-2 border-toxic-green animate-pulse pixel-shadow z-20">
              SIGHTING_CONFIRMED: THE MACHINE
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="mb-8">
            <span className="inline-block px-2 py-1 bg-toxic-green text-rust text-[10px] font-mono-vt font-bold mb-4 tracking-widest uppercase border-2 border-rust shadow-[2px_2px_0px_#3d2616]">
              THE TRUTH
            </span>
            <h2 className="text-5xl md:text-7xl font-display mb-4 tracking-wider text-rust uppercase">
              The streets are fully furnished.<br/>The system is broken.
            </h2>
          </div>
          <div className="bg-rust/5 p-6 border-l-8 border-rust scrap-border bg-parchment pixel-shadow">
            <p className="text-xl text-rust font-mono-vt leading-relaxed font-bold">
              Every single day, millions of tons of pristine, usable furniture are abandoned on sidewalks worldwide, waiting to be destroyed by the linear economy. 
              <br /><br />
              We are building a global network to stop the massacre. Every item you put on the radar is a victory against the landfill. Every item you rescue is a piece of history saved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const AddLootSection = () => (
  <section className="py-16 bg-parchment/80 border-b-4 border-rust industrial-grid relative overflow-hidden">
    <div className="container mx-auto px-6 md:px-10 text-center relative z-10">
      <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
        <button 
          onClick={() => window.location.href = 'https://green-hunt-web-v1.vercel.app/login'}
          className="hover:scale-110 transition-transform active:scale-95 drop-shadow-[4px_4px_0px_rgba(61,38,22,0.4)]"
        >
          <img src="/custom-plus-btn.png" alt="Add Loot" className="w-24 h-24 object-contain" />
        </button>
        <h2 className="text-4xl md:text-5xl font-display text-rust uppercase tracking-wider drop-shadow-[2px_2px_0px_rgba(61,38,22,0.2)]">
          Found an item? Add it!
        </h2>
        <p className="text-rust/80 font-mono-vt text-xl font-bold max-w-md">
          Report abandoned items on the map and earn GreenPoints.
        </p>
      </div>
    </div>
  </section>
);

export const FaqSection = () => {
  const faqs = [
    {
      question: "What is Greenhunt?",
      answer: "An app to find or post abandoned furniture or other objects on the street."
    },
    {
      question: "How does it work?",
      answer: "You post a photo and coordinates of the object, other users see it and go get it."
    },
    {
      question: "What do I earn by uploading objects?",
      answer: "GreenCoins. You can use them to access premium features of the app that will help you get more free objects."
    },
    {
      question: "Are the objects free?",
      answer: "Yes, they are abandoned objects. By picking them up, you prevent evil waste managers from destroying, burning, or burying them."
    },
    {
      question: "What happens if I go to the location and the object is no longer there?",
      answer: "It can happen. We are building the best system on the market for sharing abandoned objects, but it's impossible to prevent someone else from taking it."
    },
    {
      question: "What kind of objects can I post?",
      answer: "Any valuable object abandoned on the street."
    },
    {
      question: "Can I sell these objects?",
      answer: "Of course! And besides making money, remember that you are helping the planet and you will be able to see your impact measured in water, trees, CO2, and waste every time you rescue an object, whether by posting it or picking it up."
    },
    {
      question: "Does the app cost money?",
      answer: "It is free and will remain free. Soon, some premium features may have a cost."
    }
  ];

  return (
    <section className="py-16 bg-parchment border-b-4 border-rust industrial-grid relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-2 py-1 bg-toxic-green text-rust text-[10px] font-mono-vt font-bold mb-4 tracking-widest uppercase border-2 border-rust shadow-[2px_2px_0px_#3d2616]">
            KNOWLEDGE BASE
          </span>
          <h2 className="text-5xl md:text-6xl font-display text-rust uppercase tracking-wider drop-shadow-[2px_2px_0px_rgba(61,38,22,0.2)]">
            FAQ
          </h2>
        </div>
        
        <div className="bg-rust/5 p-6 md:p-8 border-4 border-rust pixel-shadow">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-2 border-rust last:border-0">
                <AccordionTrigger className="text-left font-mono-vt font-bold text-xl md:text-2xl text-rust hover:text-toxic-green hover:no-underline py-6 data-[state=open]:text-toxic-green transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-mono-vt text-lg md:text-xl text-rust/80 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
