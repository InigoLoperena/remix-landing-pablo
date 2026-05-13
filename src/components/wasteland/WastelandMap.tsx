import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Armchair, Trees, Trash2, Zap, Flame, Droplets, Bomb, Camera } from 'lucide-react';
import nycMapImg from '@/assets/nyc-map.jpg';

export const BoardGameMapSection = () => {
  const [scanPos, setScanPos] = useState(0);
  const [activePins, setActivePins] = useState<number[]>(
    Array.from({ length: 12 }, (_, i) => i)
  );

  useEffect(() => {
    const interval = setInterval(() => setScanPos(p => (p + 0.5) % 100), 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePins(prev => {
        const newPins = [...prev];
        if (Math.random() > 0.6) {
          const idx = Math.floor(Math.random() * 12);
          if (newPins.includes(idx)) return newPins.filter(id => id !== idx);
          return [...newPins, idx];
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
    <section className="py-24 bg-parchment/60 relative overflow-hidden flex items-center justify-center border-b-4 border-rust">
      <div className="absolute inset-0 bg-rust/5" />
      <div className="container mx-auto px-10 relative z-10 text-center">
        <div className="max-w-4xl mx-auto mb-16">
          <div className="parchment p-8 rotate-1 scrap-border pixel-shadow mb-12">
            <h2 className="text-5xl md:text-6xl font-crimson text-rust mb-4 drop-shadow-[2px_2px_0px_rgba(61,38,22,0.3)]">RESCUE MAP</h2>
            <div className="h-px bg-rust/50 w-1/2 mx-auto mb-4 border-b-2 border-rust" />
            <p className="text-xl md:text-2xl font-inter italic text-rust/90 font-bold">
              "Your city is like a board game where valuable free finds suddenly appear!"
            </p>
          </div>
        </div>

        <div className="relative w-full aspect-[16/9] max-w-6xl mx-auto border-8 border-rust scrap-border pixel-shadow overflow-hidden group">
          <img
            src={nycMapImg}
            alt="NYC Aerial Scavenger Map"
            className="w-full h-full object-cover brightness-[0.95] contrast-125 opacity-90 sepia-[0.3]"
          />
          <div className="absolute inset-0 bg-rust/20 mix-blend-overlay" />

          {/* Scan line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-toxic-green/40 shadow-[0_0_15px_#39FF14] z-10 pointer-events-none"
            style={{ left: `${scanPos}%` }}
          />

          <AnimatePresence>
            {pins.map(pin => {
              const isActive = activePins.includes(pin.id);
              const isScanned = Math.abs(pin.left - scanPos) < 2;
              if (!isActive && !isScanned) return null;
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
                      className="bg-toxic-green p-2 rounded-full border-4 border-rust pixel-shadow group-hover/pin:scale-110 transition-transform"
                      animate={isScanned ? { scale: [1, 1.5, 1], rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="text-parchment drop-shadow-md">{pin.icon}</div>
                    </motion.div>
                    {isScanned && (
                      <motion.div
                        className="absolute inset-0 border-2 border-toxic-green rounded-full pointer-events-none"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                    <div className="w-1 h-8 bg-rust mt-[-2px]" />
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-rust p-2 border-2 border-toxic-green text-toxic-green font-inter font-bold text-[10px] whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity pixel-shadow">
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
