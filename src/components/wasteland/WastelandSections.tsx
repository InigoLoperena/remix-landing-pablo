import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera, Radar, Target, Skull, Radio, ShieldCheck,
  Armchair, Sofa, Bed, Lamp, Refrigerator, Tv, Monitor,
  ChevronLeft, ChevronRight, MapPin
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import theMachineImg from '@/assets/the-machine.jpg';
import { WastelandButton, SectionHeading } from './WastelandNav';
import { useIsMobile } from '@/hooks/use-mobile';

export const HeroSection = () => {
  const isMobile = useIsMobile();
  const [radarPins, setRadarPins] = useState<{ id: number; top: number; left: number; angle: number; Icon: React.ElementType }[]>([]);
  const [scanAngle, setScanAngle] = useState(0);
  const activePinsRef = useRef<number[]>([]);
  const pinAgesRef = useRef<Record<number, number>>({});
  const [renderTrigger, setRenderTrigger] = useState(0);

  const ICONS = [Armchair, Sofa, Bed, Lamp, Refrigerator, Tv, Monitor];

  useEffect(() => {
    const hour = new Date().getHours();
    const counts = [5, 8, 20, 12, 6, 9];
    let count = counts[hour % counts.length];
    if (isMobile) {
      count = Math.min(count, 5); // Limit pins to 5 on mobile to prevent extreme clutter/bleed
    }

    const seededRandom = (seed: number) => {
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    const newPins = Array.from({ length: count }).map((_, i) => {
      // Reduce mobile radius even further to completely ensure no boundary overflow
      const maxRadius = isMobile ? 28 : 32;
      const radiusPercent = seededRandom(hour * 100 + i) * maxRadius + 5; 
      const angleRad = seededRandom(hour * 200 + i) * Math.PI * 2;
      
      const top = 50 + Math.sin(angleRad) * radiusPercent;
      const left = 50 + Math.cos(angleRad) * radiusPercent;
      let angle = angleRad * (180 / Math.PI);
      if (angle < 0) angle += 360;

      const Icon = ICONS[Math.floor(seededRandom(hour * 400 + i) * ICONS.length)];

      return {
        id: i,
        top,
        left,
        angle,
        Icon,
      };
    });
    setRadarPins(newPins);
    activePinsRef.current = newPins.map(p => p.id);
    const initialAges: Record<number, number> = {};
    newPins.forEach(p => { initialAges[p.id] = 0; });
    pinAgesRef.current = initialAges;
  }, [isMobile]);

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
            // Increase age of pin if it's active
            if (activePinsRef.current.includes(pin.id)) {
              pinAgesRef.current[pin.id] = (pinAgesRef.current[pin.id] || 0) + 1;
              changed = true;
            }

            if (Math.random() < 0.15) {
              const isActive = activePinsRef.current.includes(pin.id);
              if (isActive) {
                activePinsRef.current = activePinsRef.current.filter(id => id !== pin.id);
              } else {
                activePinsRef.current.push(pin.id);
                pinAgesRef.current[pin.id] = 0; // Reset age for new alerts
              }
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
    <section 
      className="relative min-h-screen flex items-center pt-32 md:pt-40 pb-16 overflow-hidden border-b-4 border-rust bg-cover bg-left md:bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${isMobile ? '/vertical-hero.webp' : '/hero-bg-v3.jpg'})` }}
    >
      {/* Overlay to maintain text readability against the complex background */}
      <div className="absolute inset-0 bg-parchment/40 md:bg-parchment/50 z-0 backdrop-blur-0 md:backdrop-blur-[1px]"></div>
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
            <div className="hidden lg:flex flex-col sm:flex-row gap-6">
              <WastelandButton variant="primary" className="text-lg md:text-xl py-4 rounded-md" onClick={() => window.location.href = 'https://green-hunt-web-v1.vercel.app/app'}>
                OPEN THE RADAR
              </WastelandButton>
              <div className="flex flex-col justify-center">
                <p className="text-base md:text-lg lg:text-xl font-mono-vt font-bold tracking-widest text-rust uppercase drop-shadow-[1.5px_1.5px_0px_rgba(61,38,22,0.5)]">Instant Access</p>
                <p className="text-base md:text-lg lg:text-xl font-mono-vt text-toxic-green font-bold uppercase tracking-wider drop-shadow-[1.5px_1.5px_0px_#3d2616]">No Apps. Just Survival.</p>
              </div>
            </div>
          </motion.div>

          <div className="relative flex flex-col items-center justify-center w-full lg:w-auto">
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] shrink-0">
              {/* Banners placed OUTSIDE the circular container so they never clip */}
              <div className="absolute -top-4 sm:-top-5 md:-top-6 left-1/2 -translate-x-1/2 z-30">
                <div className="flex items-center gap-2 text-toxic-green font-mono-vt font-bold text-xs md:text-sm tracking-[0.1em] bg-rust px-5 py-1.5 border-2 border-toxic-green/50 pixel-shadow text-parchment whitespace-nowrap">
                  <Radio size={14} className="animate-flicker" /> WASTELAND_RADAR: ACTIVE
                </div>
              </div>
              <div className="absolute -bottom-4 sm:-bottom-5 md:-bottom-6 left-1/2 -translate-x-1/2 z-30">
                <div className="flex items-center gap-2 text-parchment font-mono-vt font-bold text-xs md:text-sm tracking-[0.1em] bg-rust px-5 py-1.5 border-2 border-rust pixel-shadow whitespace-nowrap">
                  <ShieldCheck size={14} className="animate-pulse" /> {activePinsRef.current.length}_CURB_ALERTS_DETECTED
                </div>
              </div>

              {/* Inner Circular Radar Grid (Overflow-Hidden) */}
              <div className="absolute inset-0 border-4 border-rust bg-parchment rounded-full overflow-hidden scrap-border pixel-shadow flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(57,255,20,0.1)_0%,_transparent_70%)]" />
                <div className="absolute w-[66%] h-[66%] border border-toxic-green/10 rounded-full animate-[pulse_6s_infinite]" />
                <div className="absolute w-[33%] h-[33%] border border-toxic-green/20 rounded-full animate-[pulse_4s_infinite]" />
                <div className="absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent to-toxic-green origin-left z-10"
                  style={{ transform: `translateY(-50%) rotate(${scanAngle}deg)` }}
                />
                {radarPins.map((pin) => {
                  const isActive = activePinsRef.current.includes(pin.id);
                  if (!isActive) return null;

                  const age = pinAgesRef.current[pin.id] || 0;
                  const pinColor = age < 4 ? 'text-toxic-green' : 'text-parchment';

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
                          className={`p-1 sm:p-1.5 rounded-full border-2 border-rust bg-rust/80 ${pinColor} pixel-shadow`}
                          animate={isScanned ? { scale: [1, 1.4, 1], filter: ['brightness(1)', 'brightness(2)', 'brightness(1)'] } : {}}
                          transition={{ duration: 0.4 }}
                        >
                          <pin.Icon className="w-[10.5px] h-[10.5px] sm:w-3.5 sm:h-3.5" />
                        </motion.div>
                        {isScanned && (
                          <motion.div
                            className={`absolute inset-0 border-2 border-current ${pinColor} rounded-full pointer-events-none`}
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

            {/* Mobile only Button directly under the Radar */}
            <div className="flex lg:hidden flex-col sm:flex-row gap-6 mt-8 items-center text-center">
              <WastelandButton variant="primary" className="text-lg md:text-xl py-4 rounded-md w-full sm:w-auto" onClick={() => window.location.href = 'https://green-hunt-web-v1.vercel.app/app'}>
                OPEN THE RADAR
              </WastelandButton>
              <div className="flex flex-col justify-center">
                <p className="text-base md:text-lg lg:text-xl font-mono-vt font-bold tracking-widest text-rust uppercase drop-shadow-[1.5px_1.5px_0px_rgba(61,38,22,0.5)]">Instant Access</p>
                <p className="text-base md:text-lg lg:text-xl font-mono-vt text-toxic-green font-bold uppercase tracking-wider drop-shadow-[1.5px_1.5px_0px_#3d2616]">No Apps. Just Survival.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Responsive Animated Hand Phone */}
      <motion.div
        className="absolute bottom-[-10px] right-[-20px] md:bottom-[-20px] md:right-[-40px] lg:bottom-[-40px] lg:right-[-60px] z-20 pointer-events-none origin-bottom-right hidden md:block"
        initial={{ x: '100vw', y: '50vh', rotate: 20 }}
        animate={{ x: 0, y: 0, rotate: -5 }}
        transition={{ type: 'spring', bounce: 0.2, duration: 1.2, delay: 0.5 }}
      >
        <motion.img
          src="/hand-app.png"
          alt="GreenHunt App on Phone"
          className="w-[360px] sm:w-[480px] md:w-[480px] lg:w-[576px] xl:w-[704px] 2xl:w-[896px] drop-shadow-[15px_15px_0px_rgba(61,38,22,0.4)]"
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
    <section className="py-16 bg-parchment border-b-4 border-rust industrial-grid relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="mb-12 text-center">
          <h2 className="text-5xl md:text-7xl font-display mb-4 tracking-wider text-rust uppercase">
            HACK THE SYSTEM. FURNISH YOUR LIFE.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className={`relative group bg-rust border-4 border-rust p-6 scrap-border pixel-shadow flex flex-col justify-between ${idx === 1 ? '' : 'overflow-hidden'}`}>
              {idx === 1 && (
                <div className="md:hidden absolute right-[50px] top-[5px] w-[330px] pointer-events-none z-10 origin-top-right rotate-[-12deg]">
                  <img
                    src="/hand-app.png"
                    alt="Hand App"
                    className="w-full h-auto drop-shadow-[6px_6px_0px_rgba(0,0,0,0.3)]"
                  />
                </div>
              )}
              <div className="relative z-10">
                <div className="mb-4">
                  <span className="text-[12px] font-mono-vt font-bold px-3 py-1 border-2 border-parchment bg-toxic-green text-rust inline-block mb-3">{step.code}</span>
                  <h3 className={`text-xl md:text-2xl font-pixel text-parchment leading-tight mb-4 ${idx === 1 ? 'pr-[170px] md:pr-0' : 'pr-16 md:pr-0'}`}>{step.title}</h3>
                </div>
                <p className="text-parchment/90 font-mono-vt text-lg leading-relaxed mb-4 bg-black/20 p-4 border border-rust">{step.desc}</p>
              </div>
              <div className="h-2 w-full bg-toxic-green/30 group-hover:bg-toxic-green transition-all relative z-10" />
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
              className="w-full h-full object-cover aspect-square"
            />
            <div className="absolute top-[45%] left-[30%] w-8 h-8 bg-toxic-green/40 rounded-full blur-xl animate-pulse" />
            <div className="absolute top-[45%] left-[60%] w-8 h-8 bg-toxic-green/40 rounded-full blur-xl animate-pulse" />
            <div className="absolute top-[60%] right-[10%] w-4 h-4 bg-white/20 rounded-full blur-md animate-steam" />
            <div className="absolute top-4 right-4 bg-rust text-white font-mono-vt font-bold text-[10px] px-2 py-1 border-2 border-toxic-green animate-pulse pixel-shadow z-20">
              SIGHTING_CONFIRMED: THE MACHINE
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="mb-8">
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
          <img src="/button-plus.png" alt="Add Loot" className="w-64 h-64 sm:w-72 sm:h-72 object-contain" />
        </button>
        <h2 className="text-4xl md:text-5xl font-display text-rust uppercase tracking-wider drop-shadow-[2px_2px_0px_rgba(61,38,22,0.2)]">
          Found an item? Add it!
        </h2>
        <p className="text-rust/80 font-mono-vt text-xl font-bold max-w-md">
          Report abandoned items on the map and earn GreenCoins.
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

export const WastelandProvidesSection = () => {
  const finds = [
    {
      img: '/street-finds/find-web1.webp',
      title: 'STACK OF OFFICE CHAIRS',
      desc: '"A lot of them are in mint condition!"',
      distance: '0.6 miles away',
      uploader: '@cyber_scavenger',
      gc: '+150'
    },
    {
      img: '/street-finds/find-web2.webp',
      title: 'VINTAGE DRESSER',
      desc: '"Solid mahogany, only minor scratches on the top drawer."',
      distance: '1.2 miles away',
      uploader: '@wasteland_queen',
      gc: '+180'
    },
    {
      img: '/street-finds/find-web3.webp',
      title: 'MINT ARMCHAIR',
      desc: '"Super comfortable, looks almost like new! Grab it before it rains."',
      distance: '0.3 miles away',
      uploader: '@rad_rider',
      gc: '+200'
    },
    {
      img: '/street-finds/find-web4.webp',
      title: 'STATIONARY BICYCLE',
      desc: '"Fully functional screen and adjustable resistance. Ready for home workouts."',
      distance: '2.5 miles away',
      uploader: '@green_junkie',
      gc: '+220'
    },
    {
      img: '/street-finds/find-5.webp',
      title: 'NEIGHBOR HAUL',
      desc: '"A neighbor cleared out their place - multiple items left on the curb. First come, first served"',
      distance: '3.1 miles away',
      uploader: '@alley_cat',
      gc: '+300'
    },
    {
      img: '/street-finds/find-6.webp',
      title: 'MODERN TV STAND',
      desc: '"Sleek design, looks brand new! Fits up to a 65-inch screen easily. In perfect condition!"',
      distance: '1.8 miles away',
      uploader: '@curb_collector',
      gc: '+190'
    }
  ];

  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? finds.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === finds.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-parchment/40 border-b-4 border-rust relative overflow-hidden industrial-grid">
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-display text-rust mb-4 tracking-wider leading-none uppercase drop-shadow-[2px_2px_0px_rgba(61,38,22,0.3)]">
            THE WASTELAND PROVIDES
          </h2>
          <div className="h-px bg-rust w-1/2 mx-auto mb-4 border-b-2 border-rust" />
          <p className="text-xl md:text-2xl font-mono-vt text-rust/80 font-bold uppercase tracking-widest">
            Recent extractions mapped by the resistance network
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-16">
          {/* Navigation Buttons (Desktop/Tablet Sides - absolutely outside of cards) */}
          <div className="hidden sm:block absolute top-1/2 sm:left-2 md:-left-4 -translate-y-1/2 z-30">
            <button
              onClick={handlePrev}
              className="p-3 bg-rust text-parchment border-2 border-rust hover:bg-toxic-green hover:text-rust transition-colors shadow-[4px_4px_0px_#3d2616] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none pixel-shadow"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="hidden sm:block absolute top-1/2 sm:right-2 md:-right-4 -translate-y-1/2 z-30">
            <button
              onClick={handleNext}
              className="p-3 bg-rust text-parchment border-2 border-rust hover:bg-toxic-green hover:text-rust transition-colors shadow-[4px_4px_0px_#3d2616] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none pixel-shadow"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Cards Frame */}
          <div className="overflow-hidden py-4">
            <motion.div
              className="flex touch-pan-y cursor-grab active:cursor-grabbing"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag={isMobile ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                const swipeThreshold = 50; // Threshold in pixels to register a swipe
                if (info.offset.x < -swipeThreshold) {
                  handleNext();
                } else if (info.offset.x > swipeThreshold) {
                  handlePrev();
                }
              }}
            >
              {finds.map((find, idx) => (
                <div key={idx} className="w-full flex-shrink-0 px-2 md:px-4">
                  <div className="bg-parchment border-4 border-rust p-3 sm:p-4 md:p-5 scrap-border pixel-shadow relative overflow-hidden group max-w-2xl mx-auto flex flex-col md:flex-row gap-4 sm:gap-6">
                    
                    {/* Image Block */}
                    <div className="relative w-full md:w-[280px] h-[200px] sm:h-[280px] md:h-auto md:min-h-[280px] border-4 border-rust overflow-hidden scrap-border shrink-0">
                      <img
                        src={find.img}
                        alt={find.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-rust/10 mix-blend-overlay" />
                      
                      {/* Floating Glassmorphic Tags */}
                      <div className="absolute top-3 left-3 z-20">
                        <span className="px-3 py-1.5 bg-rust/90 text-parchment text-xs font-mono-vt font-bold border border-rust backdrop-blur-md shadow-md uppercase tracking-widest flex items-center gap-1.5">
                          <MapPin size={13} className="text-toxic-green animate-pulse" /> {find.distance}
                        </span>
                      </div>
                    </div>

                    {/* Metadata & Uploader Block */}
                    <div className="flex flex-col justify-between flex-1 py-1 sm:py-2">
                      <div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-pixel text-rust leading-none mb-3 uppercase tracking-tighter break-words">
                          {find.title}
                        </h3>
                        <div className="bg-rust/5 p-3 sm:p-4 border-l-4 border-toxic-green scrap-border mb-4">
                          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-mono-vt font-bold text-rust italic leading-relaxed break-words">
                            {find.desc}
                          </p>
                        </div>
                      </div>

                      {/* Uploader Details */}
                      <div className="flex items-center justify-between border-t-2 border-dashed border-rust pt-4 mt-auto gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-rust border-2 border-rust flex items-center justify-center shrink-0">
                            <Skull size={14} className="text-parchment" />
                          </div>
                          <div>
                            <p className="text-[10px] sm:text-xs font-mono-vt text-rust/60 uppercase">CONTRIBUTOR</p>
                            <p className="text-xs sm:text-sm font-pixel text-toxic-green break-all">{find.uploader}</p>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end shrink-0">
                          <p className="text-[10px] sm:text-xs font-mono-vt text-rust/60 uppercase">BOUNTY</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <p className="text-xl sm:text-2xl font-pixel text-toxic-green font-bold drop-shadow-[1px_1px_0px_#3d2616] leading-none">
                              {find.gc}
                            </p>
                            <img
                              src="/custom-greencoin.png"
                              alt="GreenCoin"
                              className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0"
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator & Mobile Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
            {/* Mobile Navigation Controls - unified pip-boy retro console design */}
            <div className="flex items-center gap-4 sm:hidden">
              <button
                onClick={handlePrev}
                className="p-2.5 bg-rust text-parchment border-2 border-rust hover:bg-toxic-green hover:text-rust transition-colors shadow-[3px_3px_0px_#3d2616] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none pixel-shadow"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-2">
                {finds.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 border-2 border-rust transition-all duration-300 rounded-none ${
                      currentIndex === idx ? 'bg-toxic-green scale-125' : 'bg-parchment hover:bg-toxic-green/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-2.5 bg-rust text-parchment border-2 border-rust hover:bg-toxic-green hover:text-rust transition-colors shadow-[3px_3px_0px_#3d2616] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none pixel-shadow"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Desktop-only Dots Indicator */}
            <div className="hidden sm:flex gap-2">
              {finds.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 border-2 border-rust transition-all duration-300 rounded-none ${
                    currentIndex === idx ? 'bg-toxic-green scale-125' : 'bg-parchment hover:bg-toxic-green/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
