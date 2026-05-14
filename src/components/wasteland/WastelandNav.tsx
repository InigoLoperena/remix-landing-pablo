import React from 'react';
import { motion } from 'motion/react';
import { Radio } from 'lucide-react';


export const Logo = () => (
  <div className="flex items-center">
    <img
      src="/logo-32.png"
      alt="GreenHunt"
      className="h-10 w-auto object-contain"
      style={{ imageRendering: 'pixelated' }}
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
    primary: 'bg-toxic-green !text-rust border-2 border-rust hover:bg-toxic-green/80 shadow-[6px_6px_0px_#3d2616] active:translate-x-1 active:translate-y-1 active:shadow-none',
    outline: 'border-2 border-rust !text-rust bg-parchment hover:bg-rust/10 shadow-[4px_4px_0px_#3d2616] active:translate-x-1 active:translate-y-1 active:shadow-none',
    ghost: '!text-rust/60 hover:!text-rust font-mono-vt',
    hazard: 'hazard-stripes !text-white font-black border-4 border-rust shadow-[6px_6px_0px_#3d2616] active:translate-x-1 active:translate-y-1 active:shadow-none',
  };
  return (
    <button
      className={`relative px-8 py-3 font-mono-vt font-bold transition-all duration-100 flex items-center justify-center gap-2 group uppercase tracking-widest ${variants[variant]} ${className}`}
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
      <span className="inline-block px-2 py-1 bg-hazard-yellow text-rust text-[10px] font-mono-vt font-bold mb-4 tracking-widest uppercase border-2 border-rust shadow-[2px_2px_0px_#3d2616]">
        {badge}
      </span>
    )}
    <h2 className="text-6xl md:text-8xl font-pixel mb-6 tracking-tight text-rust uppercase leading-[0.85] drop-shadow-[4px_4px_0px_rgba(61,38,22,0.3)]">
      {title}
    </h2>
    {subtitle && (
      <p className="text-rust/80 font-mono-vt font-bold text-lg max-w-2xl leading-relaxed bg-parchment/60 p-2 border-l-4 border-toxic-green">{subtitle}</p>
    )}
  </div>
);

export const WastelandNavbar = () => (
  <header className="h-20 fixed top-0 left-0 right-0 z-50 border-b-4 border-rust px-10 flex items-center justify-between bg-rust text-parchment scrap-border">
    <div className="flex items-center gap-6">
      <Logo />
      <div className="h-8 w-1 bg-toxic-green/40 hidden sm:block" />
      <span className="text-xs font-mono-vt text-parchment/60 tracking-[0.2em] uppercase hidden lg:block">
        NYC / GREEN_HUNT
      </span>
    </div>
    <div className="flex items-center gap-8 text-[11px] font-mono-vt tracking-widest font-bold">
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
      <span className="text-toxic-green hidden md:block animate-pulse font-bold">RADAR_ONLINE</span>
      <button
        className="bg-parchment !text-rust px-4 py-2 border-2 border-rust pixel-shadow hover:bg-hazard-yellow transition-colors uppercase font-mono-vt font-bold tracking-widest scale-90 active:translate-x-1 active:translate-y-1 active:shadow-none"
        onClick={() => window.location.href = 'https://green-hunt-web-v1.vercel.app/login'}
      >
        LOGIN_RESISTANCE
      </button>
    </div>
  </header>
);

export const WastelandTicker = () => (
  <footer className="h-10 fixed bottom-0 left-0 right-0 z-50 rust-bar text-parchment flex items-center overflow-hidden whitespace-nowrap border-t-4 border-rust">
    <div className="flex animate-ticker font-mono-vt font-bold text-sm uppercase tracking-tighter">
      {[...Array(4)].map((_, i) => (
        <React.Fragment key={i}>
          <span className="px-8 text-hazard-yellow">The asphalt is ours</span>
          <span className="px-8 text-toxic-green text-[10px]">#</span>
          <span className="px-8 font-mono-vt">3,000,000 TONS WASTED ANNUALLY</span>
          <span className="px-8 text-toxic-green text-[10px]">#</span>
          <span className="px-8 text-parchment animate-flicker">Join the Scavenger Resistance</span>
          <span className="px-8 text-toxic-green text-[10px]">#</span>
          <span className="px-8 font-mono-vt text-[10px] text-parchment/60">RECLAIM THE MAP</span>
          <span className="px-8 text-toxic-green text-[10px]">#</span>
        </React.Fragment>
      ))}
    </div>
  </footer>
);
