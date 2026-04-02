/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PlanetScene from './components/PlanetScene';

const PLANETS = [
  { id: 'pluto', name: 'PLUTO', distance: '39.5 AU', color: '#8B7355', description: 'ONCE CONSIDERED THE NINTH PLANET, PLUTO IS A DWARF PLANET IN THE KUIPER BELT. IT HAS A COMPLEX SURFACE WITH MOUNTAINS OF WATER ICE.' },
  { id: 'neptune', name: 'NEPTUNE', distance: '30.06 AU', color: '#274687', description: 'DARK, COLD, AND WHIPPED BY SUPERSONIC WINDS, ICE GIANT NEPTUNE IS THE EIGHTH AND MOST DISTANT PLANET IN OUR SOLAR SYSTEM.' },
  { id: 'uranus', name: 'URANUS', distance: '19.18 AU', color: '#82b3d1', description: 'URANUS IS THE SEVENTH PLANET FROM THE SUN. IT HAS THE THIRD-LARGEST PLANETARY RADIUS AND FOURTH-LARGEST PLANETARY MASS.' },
  { id: 'saturn', name: 'SATURN', distance: '9.539 AU', color: '#e3cb8f', description: 'ADORNED WITH A DAZZLING, COMPLEX SYSTEM OF ICY RINGS, SATURN IS UNIQUE IN OUR SOLAR SYSTEM. IT IS THE SECOND-LARGEST PLANET.' },
  { id: 'jupiter', name: 'JUPITER', distance: '5.203 AU', color: '#c99b75', description: 'JUPITER IS MORE THAN TWICE AS MASSIVE THAN THE OTHER PLANETS OF OUR SOLAR SYSTEM COMBINED. THE GIANT PLANET\'S GREAT RED SPOT IS A CENTURIES-OLD STORM.' },
  { id: 'mars', name: 'MARS', distance: '1.524 AU', color: '#c1440e', description: 'MARS IS A DUSTY, COLD, DESERT WORLD WITH A VERY THIN ATMOSPHERE. THERE IS STRONG EVIDENCE MARS WAS - BILLIONS OF YEARS AGO - WETTER AND WARMER.' },
  { id: 'earth', name: 'EARTH', distance: '1 AU', color: '#4b759e', description: 'OUR HOME PLANET IS THE ONLY PLACE WE KNOW OF SO FAR THAT\'S INHABITED BY LIVING THINGS. IT\'S ALSO THE ONLY PLANET IN OUR SOLAR SYSTEM WITH LIQUID WATER ON THE SURFACE.' },
  { id: 'venus', name: 'VENUS', distance: '0.723 AU', color: '#e89c51', description: 'NAMED FOR THE ROMAN GODDESS OF LOVE AND BEAUTY. IN ANCIENT TIMES, VENUS WAS OFTEN THOUGHT TO BE TWO DIFFERENT STARS, THE EVENING STAR AND THE MORNING STAR.' },
  { id: 'mercury', name: 'MERCURY', distance: '0.39 AU', color: '#888888', description: 'THE SMALLEST PLANET IN OUR SOLAR SYSTEM AND NEAREST TO THE SUN, MERCURY IS ONLY SLIGHTLY LARGER THAN EARTH\'S MOON.' },
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(7); // Venus is default
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 2200); // Wait for the 2.5s GSAP animation to mostly finish
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const activePlanet = PLANETS[activeIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans selection:bg-orange-500/30 select-none">
      <PlanetScene activeIndex={activeIndex} onPlanetChange={setActiveIndex} />

      {/* Top Header */}
      <div className="absolute top-[4%] md:top-[6%] left-1/2 -translate-x-1/2 text-center tracking-[0.4em] z-10 pl-[0.4em]">
        <h1 className="text-[10px] md:text-sm font-light text-gray-200">SOLAR EXPLORER</h1>
        <p className="text-[8px] md:text-[10px] text-[#e89c51] mt-1 md:mt-2">IN ONLY THREE.JS</p>
      </div>

      {/* Top Planet Bottom Half Shadow Overlay */}
      {activeIndex > 0 && (
        <div 
          className={`absolute left-0 right-0 z-10 pointer-events-none transition-opacity ${isTransitioning ? 'opacity-0 duration-0' : 'opacity-100 duration-1000'}`}
          style={{
            top: '16%',
            height: '34%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,1) 100%)',
          }}
        />
      )}

      {/* Center Content (Next Planet Name) */}
      {activeIndex > 0 && (
        <div 
          className="absolute top-[14%] md:top-[18%] left-1/2 -translate-x-1/2 text-center tracking-[0.2em] z-20 cursor-pointer opacity-60 hover:opacity-100 transition-opacity pl-[0.2em]"
          onClick={() => setActiveIndex(activeIndex - 1)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`next-${activeIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
            >
              <p className="text-[8px] text-gray-400 mb-1">PLANET</p>
              <h2 className="text-xs text-gray-200">
                {PLANETS[activeIndex - 1].name}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Bottom Content (Active Planet Info) */}
      <div className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2 text-center z-10 w-full max-w-2xl px-4 md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`info-${activeIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
          >
            <p className="text-[8px] md:text-[10px] tracking-[0.3em] text-[#e89c51] mb-1 md:mb-2 pl-[0.3em]">PLANET</p>
            <h2 className="text-4xl md:text-6xl tracking-[0.4em] font-thin mb-4 md:mb-6 pl-[0.4em]">{activePlanet.name}</h2>
            
            <p className="text-[10px] md:text-xs leading-loose tracking-[0.2em] text-gray-300 max-w-xl mx-auto mb-6 md:mb-8 pl-[0.2em]">
              {activePlanet.description}
            </p>

            <button className="text-[8px] md:text-[10px] tracking-[0.3em] text-[#e89c51] uppercase border-b border-[#e89c51] pb-1 hover:text-white hover:border-white transition-colors pl-[0.3em]">
              READ MORE
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left Sidebar */}
      <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4 md:gap-8 scale-75 md:scale-100 origin-left">
        {PLANETS.map((planet, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={planet.id}
              onClick={() => setActiveIndex(idx)}
              className="flex items-center gap-4 group text-left"
            >
              <div className="relative flex items-center justify-center w-4 h-4">
                <div className={`absolute w-3 h-3 rounded-full border transition-all duration-300 ${isActive ? 'border-white' : 'border-white opacity-40 group-hover:opacity-80'}`} />
                {isActive && <div className="absolute w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
              
              <div className="flex items-center gap-3">
                {isActive ? (
                  <div className="w-8 h-[2px] bg-[#e89c51]" />
                ) : (
                  <div 
                    className="w-6 h-6 rounded-full shadow-inner opacity-50 group-hover:opacity-100 transition-opacity" 
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${planet.color} 0%, #000 80%)`,
                      boxShadow: `inset -2px -2px 4px rgba(0,0,0,0.8), 0 0 4px ${planet.color}40`
                    }}
                  />
                )}
                
                <div className={`flex flex-col transition-all duration-300 ${isActive ? 'translate-x-2' : ''}`}>
                  <span className={`text-xs tracking-[0.2em] ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                    {planet.name}
                  </span>
                  <span className={`text-[9px] tracking-wider ${isActive ? 'text-[#e89c51]' : 'text-gray-700 group-hover:text-gray-500'}`}>
                    {planet.distance}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
