import { motion } from 'motion/react';
import {
  Camera, Radar, Target, Skull, Radio, ShieldCheck,
  Trash2, Trees, Droplets, Zap, Armchair, Flame, Bomb,
} from 'lucide-react';
import theMachineImg from '@/assets/the-machine.jpg';
import { WastelandButton, SectionHeading } from './WastelandNav';

export const HeroSection = () => (
  <section className="relative min-h-screen flex items-center pt-20 overflow-hidden border-b-4 border-rust">
    <div className="container mx-auto px-10 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-7xl md:text-[9rem] font-crimson leading-[0.8] mb-4 tracking-tighter text-rust uppercase drop-shadow-[6px_6px_0px_rgba(61,38,22,0.2)]">
            HUNT.<br />RECLAIM.<br /><span className="text-toxic-green drop-shadow-[4px_4px_0px_#3d2616]">REDEEM.</span>
          </h1>
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-rust" />
            <span className="text-hazard-yellow font-inter font-bold text-lg tracking-[0.2em] uppercase">Stooping Real World Game</span>
            <div className="h-px flex-1 bg-rust" />
          </div>
          <p className="text-xl md:text-2xl text-rust mb-10 max-w-xl font-inter leading-relaxed">
            "NYC is a board game where valuable free finds suddenly appear."
            <br /><span className="font-bold">Save the planet from apocalypsis by sharing photos and coordinates of discarded street finds.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <WastelandButton variant="primary" className="text-xl py-5 rounded-md" onClick={() => window.location.href = 'https://green-hunt-web-v1.vercel.app/app'}>
              START THE HUNT (FREE)
            </WastelandButton>
            <div className="flex flex-col justify-center">
              <p className="text-[11px] font-inter font-bold tracking-widest text-rust uppercase">Instant Access</p>
              <p className="text-[10px] font-inter text-toxic-green font-bold uppercase">No Apps. Just Survival.</p>
            </div>
          </div>
        </motion.div>

        <div className="relative hidden lg:flex items-center justify-center">
          <div className="relative w-[500px] h-[500px] border-4 border-rust bg-parchment rounded-full flex items-center justify-center overflow-hidden scrap-border pixel-shadow">
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30">
              <div className="flex items-center gap-2 text-toxic-green font-inter font-bold text-[10px] tracking-[0.1em] bg-rust px-4 py-1 border-2 border-toxic-green/50 pixel-shadow text-parchment whitespace-nowrap">
                <Radio size={12} className="animate-flicker" /> WASTELAND_RADAR: ACTIVE
              </div>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
              <div className="flex items-center gap-2 text-hazard-yellow font-inter font-bold text-[10px] tracking-[0.1em] bg-rust px-4 py-1 border-2 border-hazard-yellow/50 pixel-shadow text-parchment whitespace-nowrap">
                <ShieldCheck size={12} className="animate-pulse" /> 5_CURB_ALERTS_DETECTED
              </div>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(57,255,20,0.1)_0%,_transparent_70%)]" />
            <div className="w-[350px] h-[350px] border border-toxic-green/10 rounded-full" />
            <div className="w-[200px] h-[200px] border border-toxic-green/20 rounded-full" />
            <motion.div
              className="absolute top-1/2 left-1/2 w-full h-[4px] bg-gradient-to-r from-transparent to-toxic-green origin-left"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
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
                  scale: [1, 2, 1], opacity: [0.3, 1, 0.3],
                  boxShadow: pin.color === 'bg-hazard-yellow'
                    ? ['0 0 0px #FFD700', '0 0 20px #FFD700', '0 0 0px #FFD700']
                    : ['0 0 0px #39FF14', '0 0 20px #39FF14', '0 0 0px #39FF14'],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: pin.delay }}
              />
            ))}
          </div>
          <div className="absolute -top-10 -right-10 w-24 h-24 rotate-12 opacity-40">
            <Skull className="w-full h-full text-rust" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const TheProblemSection = () => (
  <section className="py-24 relative bg-parchment/60 border-b-4 border-rust industrial-grid">
    <div className="container mx-auto px-10">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1 relative group">
          <div className="absolute inset-0 bg-rust/10 blur-3xl rounded-full" />
          <div className="relative bg-parchment border-4 border-rust p-2 scrap-border pixel-shadow group overflow-hidden">
            <img
              src={theMachineImg}
              alt="The Machine - NYC Garbage Unit"
              className="w-full h-full object-cover grayscale brightness-[0.35] contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
            />
            <div className="absolute top-[45%] left-[30%] w-8 h-8 bg-hazard-yellow/40 rounded-full blur-xl animate-pulse" />
            <div className="absolute top-[45%] left-[60%] w-8 h-8 bg-hazard-yellow/40 rounded-full blur-xl animate-pulse" />
            <div className="absolute top-[60%] right-[10%] w-4 h-4 bg-white/20 rounded-full blur-md animate-steam" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute top-4 right-4 bg-rust text-white font-inter font-bold text-[10px] px-2 py-1 border-2 border-hazard-yellow animate-pulse pixel-shadow z-20">
              SIGHTING_CONFIRMED: THE MACHINE // T34
            </div>
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-rust border-4 border-parchment pixel-shadow z-20">
              <div className="flex items-center gap-3 text-hazard-yellow font-inter font-bold text-[10px] mb-1">
                <span className="w-3 h-3 bg-red-600 animate-ping rounded-full" /> DANGER_ZONE_EXTRACT
              </div>
              <p className="text-parchment text-sm font-crimson tracking-widest italic bg-black/20 p-2">
                Unit Spotted: METRO_WASTE_REMOVAL // CRUSHING_MODE: ACTIVE
              </p>
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
            <div className="bg-rust/5 p-6 border-l-8 border-rust scrap-border bg-parchment">
              <div className="text-[10px] font-inter font-bold text-rust uppercase mb-2">Resource Loss</div>
              <div className="flex justify-between items-end">
                <span className="text-3xl font-crimson text-rust tracking-widest">3,000,000 TONS</span>
                <span className="text-xs font-inter text-dust uppercase font-bold bg-rust text-parchment px-2 py-1">Yearly Void</span>
              </div>
            </div>
            <div className="bg-toxic-green/10 p-6 border-l-8 border-toxic-green scrap-border bg-parchment">
              <div className="text-[10px] font-inter font-bold text-toxic-green uppercase mb-2">Resistance Score</div>
              <div className="flex justify-between items-end">
                <span className="text-3xl font-crimson text-rust tracking-widest">URBAN SCAVENGERS</span>
                <span className="text-xs font-inter text-dust uppercase font-bold bg-rust text-parchment px-2 py-1">Active Units</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const HowItWorksSection = () => {
  const steps = [
    { code: '01', title: 'SIGHT', desc: 'Identify loot on the curb. Document the salvage before the compactors arrive.', icon: <Camera size={24} /> },
    { code: '02', title: 'RADAR', desc: "Encrypted coordinates broadcasted to all units. Track what the machine hasn't reached.", icon: <Radar size={24} /> },
    { code: '03', title: 'REDEEM', desc: 'Intercept the value. Reclaim the treasures for the collective or yourself.', icon: <Target size={24} /> },
  ];
  return (
    <section className="py-24 bg-parchment border-b-4 border-rust industrial-grid">
      <div className="container mx-auto px-10">
        <SectionHeading badge="PROTOCOL" title="The Scavenger Laws." subtitle="Navigate the ruins with zero friction." />
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group bg-rust border-4 border-rust p-6 scrap-border pixel-shadow">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[12px] font-inter font-bold px-2 py-1 border-2 border-parchment bg-toxic-green text-rust">{step.code}</span>
                <span className="text-2xl font-crimson text-parchment tracking-widest">{step.title}</span>
              </div>
              <p className="text-parchment/80 font-inter text-sm leading-relaxed mb-6 font-bold bg-black/20 p-3">{step.desc}</p>
              <div className="h-2 w-full bg-toxic-green/30 group-hover:bg-toxic-green transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const NearbyDiscoveriesSection = () => {
  const items = [
    {
      title: 'LEATHER LOUNGE',
      dist: '0.6 MILES AWAY',
      cat: 'Furniture',
      img: '/street-finds/find-7.webp',
      desc: 'Abandoned on the curb. Weathered but structural. Rescue immediate.',
      reported: '30 MIN AGO',
      reporter: 'Strocthunter25',
    },
    {
      title: 'OFFICE CHAIR STACK',
      dist: '1.2 MILES AWAY',
      cat: 'Furniture',
      img: '/street-finds/find-9.webp',
      desc: 'Several chairs in perfect condition discarded by a nearby office complex. Fast extraction required.',
      reported: '1 HOUR AGO',
      reporter: 'RuinWalker',
    },
    {
      title: 'NEIGHBOR HAUL',
      dist: '0.3 MILES AWAY',
      cat: 'Mixed Loot',
      img: '/street-finds/find-5.webp',
      desc: 'A neighbor cleared out their place — multiple items left on the curb. First come, first served.',
      reported: '15 MIN AGO',
      reporter: 'ZionGreen',
    },
  ];

  return (
    <section className="py-24 bg-parchment/50 relative border-b-4 border-rust overflow-hidden rust-effect">
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5 rotate-12">
        <Skull size={256} className="text-rust" />
      </div>
      <div className="container mx-auto px-10 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <SectionHeading badge="LOCAL_LOOT" title="THE MAP PROVIDES" subtitle="Recent extractions mapped by the resistance network." />
          <WastelandButton variant="outline" className="text-xs py-2 px-4">VIEW_ALL_NYC</WastelandButton>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {items.map((item, idx) => (
            <div key={idx} className="bg-parchment border-4 border-rust p-4 scrap-border pixel-shadow group cursor-crosshair">
              <div className="relative h-64 mb-6 overflow-hidden border-4 border-rust">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover brightness-90 sepia-[0.2] group-hover:brightness-110 group-hover:sepia-0 transition-all duration-500" />
                <div className="absolute top-4 left-4 bg-hazard-yellow text-rust font-inter font-bold text-[10px] px-2 py-1 border-2 border-rust">{item.dist}</div>
                <div className="absolute top-4 right-4 bg-rust text-parchment font-inter font-bold text-[10px] px-2 py-1 border-2 border-parchment">{item.cat}</div>
              </div>
              <h3 className="text-3xl font-crimson text-rust mb-2 tracking-widest">{item.title}</h3>
              <p className="text-rust font-inter text-sm mb-6 bg-rust/10 p-2 font-bold">{item.desc}</p>
              <div className="flex items-center justify-between mb-6 p-2 bg-rust border-2 border-rust">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-parchment flex items-center justify-center border-2 border-rust text-rust text-xs font-bold">U</div>
                  <div>
                    <div className="text-parchment font-inter font-bold text-[11px]">{item.reporter}</div>
                    <div className="text-hazard-yellow font-inter text-[9px] font-bold">POSTED {item.reported}</div>
                  </div>
                </div>
                <Flame size={16} className="text-hazard-yellow animate-pulse" />
              </div>
              <WastelandButton variant="hazard" className="w-full py-4 text-sm" onClick={() => window.location.href = 'https://green-hunt-web-v1.vercel.app/app'}>
                START HUNTING
              </WastelandButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
