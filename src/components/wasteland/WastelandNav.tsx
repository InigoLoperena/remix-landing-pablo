import React from 'react';
import { motion } from 'motion/react';
import { Radio } from 'lucide-react';
import greenhuntLogo from '@/assets/greenhunt-logo.png';

export const Logo = () => (
  <div className="flex items-center">
    <img
      src={greenhuntLogo}
      alt="GreenHunt"
      className="h-10 w-auto object-contain"
    />
  </div>
);

export const WastelandButton = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'hazard';
  className?: string;
  [key: string]: any;
}) => {
  const variants: Record<string, string> = {
    primary: 'bg-toxic-green !text-black hover:bg-white shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none',
    outline: 'border-2 border-toxic-green !text-toxic-green hover:bg-toxic-green/10 shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none',
    ghost: '!text-gray-500 hover:!text-toxic-green font-mono',
    hazard: 'hazard-stripes !text-white font-black hover:brightness-125 shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none',
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

export const SectionHeading = ({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
}) => (
  <div className="mb-12">
    {badge && (
      <span className="inline-block px-2 py-1 bg-hazard-yellow text-black text-[10px] font-pixel mb-4 tracking-widest uppercase pixel-shadow">
        {badge}
      </span>
    )}
    <h2 className="text-6xl md:text-8xl font-display mb-6 tracking-tight text-white uppercase leading-[0.85] drop-shadow-[4px_4px_0px_#000]">
      {title}
    </h2>
    {subtitle && (
      <p className="text-dust font-typewriter text-lg max-w-2xl leading-relaxed">{subtitle}</p>
    )}
  </div>
);

export const WastelandNavbar = () => (
  <header className="h-20 fixed top-0 left-0 right-0 z-50 border-b-4 border-black px-10 flex items-center justify-between bg-zinc-900/60 backdrop-blur-md scrap-border">
    <div className="flex items-center gap-6">
      <Logo />
      <div className="h-8 w-1 bg-toxic-green/20 hidden sm:block" />
      <span className="text-[10px] font-pixel text-dust/60 tracking-[0.2em] uppercase hidden lg:block italic">
        NYC / Wasteland_01
      </span>
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
        className="bg-rust !text-white px-4 py-2 border-2 border-black pixel-shadow hover:brightness-125 transition-colors uppercase font-display tracking-widest scale-90"
        onClick={() => window.location.href = 'https://greenhunt.vercel.app/login'}
      >
        LOGIN_RESISTANCE
      </button>
    </div>
  </header>
);

export const WastelandTicker = () => (
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
