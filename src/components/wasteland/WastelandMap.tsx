import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Armchair, Sofa, Bed, Lamp, Refrigerator, Tv, Monitor, WashingMachine } from 'lucide-react';
import nycMapImg from '@/assets/nyc-map.jpg';

export const BoardGameMapSection = () => {
  const [scanPos, setScanPos] = useState(0);
  const activePinsRef = useRef<number[]>(Array.from({ length: 12 }, (_, i) => i));
  const [renderTrigger, setRenderTrigger] = useState(0);

  const pins = [
    { id: 0, top: 30, left: 10, Icon: Armchair },
    { id: 1, top: 50, left: 80, Icon: Sofa },
    { id: 2, top: 75, left: 70, Icon: Bed },
    { id: 3, top: 40, left: 45, Icon: Lamp },
    { id: 4, top: 20, left: 50, Icon: Refrigerator },
    { id: 5, top: 60, left: 10, Icon: Tv },
    { id: 6, top: 80, left: 80, Icon: Monitor },
    { id: 7, top: 15, left: 85, Icon: WashingMachine },
    { id: 8, top: 55, left: 35, Icon: Sofa },
    { id: 9, top: 25, left: 80, Icon: Bed },
    { id: 10, top: 65, left: 65, Icon: Lamp },
    { id: 11, top: 80, left: 10, Icon: Armchair },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPos(prev => {
        const next = (prev + 0.5) % 100;
        let changed = false;

        pins.forEach(pin => {
          let passed = false;
          if (prev < next) passed = pin.left >= prev && pin.left < next;
          else passed = pin.left >= prev || pin.left < next;

          if (passed) {
            if (Math.random() < 0.2) {
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
  }, []);

  return (
    <section className="py-16 bg-parchment/60 relative overflow-hidden flex items-center justify-center border-b-4 border-rust">
      <div className="absolute inset-0 bg-rust/5" />
      <div className="container mx-auto px-10 relative z-10 text-center">
        <div className="max-w-4xl mx-auto mb-16">
          <div className="mb-8">
            <h2 className="text-5xl md:text-7xl font-display text-rust mb-4 drop-shadow-[2px_2px_0px_rgba(61,38,22,0.3)] tracking-wider">RESCUE MAP</h2>
            <div className="h-px bg-rust w-1/2 mx-auto mb-4 border-b-2 border-rust" />
            <p className="text-xl md:text-2xl font-mono-vt text-rust/90 font-bold">
              Your city is like a board game where valuable free finds suddenly appear!
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
              const isActive = activePinsRef.current.includes(pin.id);
              if (!isActive) return null;
              const isScanned = Math.abs(pin.left - scanPos) < 2;
              return (
                <motion.div
                  key={pin.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute cursor-pointer group/pin"
                  style={{ top: `${pin.top}%`, left: `${pin.left}%`, zIndex: isScanned ? 30 : 20 }}
                >
                  <div className="relative flex flex-col items-center">
                    <motion.div
                      className="bg-toxic-green p-1 sm:p-2 rounded-full border-2 sm:border-4 border-rust pixel-shadow group-hover/pin:scale-110 transition-transform"
                      animate={isScanned ? { scale: [1, 1.5, 1], rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="text-parchment drop-shadow-md">
                        <pin.Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                    </motion.div>
                    {isScanned && (
                      <motion.div
                        className="absolute inset-0 border-2 border-toxic-green rounded-full pointer-events-none"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                    <div className="w-0.5 sm:w-1 h-4 sm:h-8 bg-rust mt-[-2px]" />
                    <div className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 bg-rust p-2 border-2 border-toxic-green text-toxic-green font-mono-vt font-bold text-[10px] whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity pixel-shadow">
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
