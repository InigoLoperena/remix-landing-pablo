import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const DustParticles = () => {
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

export const BackgroundRadar = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03] z-0">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] border-[2px] border-toxic-green/20 rounded-full" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] border-[1px] border-toxic-green/10 rounded-full" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] border-[1px] border-toxic-green/5 rounded-full" />
    <motion.div
      className="absolute top-1/2 left-1/2 w-[150vw] h-[200px] bg-gradient-to-r from-transparent via-toxic-green/10 to-toxic-green/40 origin-left -translate-y-1/2 blur-2xl"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

export const ScreenStatic = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setShow(true);
        setTimeout(() => setShow(false), 200);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] opacity-20 overflow-hidden">
      <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] animate-static-glitch" />
    </div>
  );
};

export const WastelandAudio = () => {
  useEffect(() => {
    const playCue = () => {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = (Math.random() > 0.5 ? 'sine' : 'sawtooth') as OscillatorType;
        osc.frequency.setValueAtTime(Math.random() * 100 + 40, ctx.currentTime);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1);
      } catch (_) {}
    };
    const interval = setInterval(() => { if (Math.random() > 0.7) playCue(); }, 5000);
    return () => clearInterval(interval);
  }, []);
  return null;
};
