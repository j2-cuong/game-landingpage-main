"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

import { SECTS_DATA, type ISect } from '../data/sects';

// --- 2. COMPONENTS ---

const ELEMENT_SPRITE_DATA: Record<string, { x: number; y: number; w: number; h: number }> = {
  metal: { x: 460, y: 740, w: 250, h: 270 },
  wood: { x: 760, y: 740, w: 250, h: 260 },
  water: { x: 1050, y: 740, w: 260, h: 260 },
  fire: { x: 1350, y: 740, w: 260, h: 260 },
  earth: { x: 1650, y: 740, w: 260, h: 260 },
};

const NATURAL_WIDTH = 3232;

interface ElementDiamondProps {
  active: boolean;
  label: string;
  color: string;
  id: string;
  onClick: () => void;
}

const ElementDiamond = ({ active, id, onClick }: ElementDiamondProps) => {
  const sprite = ELEMENT_SPRITE_DATA[id] || ELEMENT_SPRITE_DATA.metal;

  // Display size for the diamond icon (increased to prevent clipping)
  const displaySize = 110;
  const scale = displaySize / sprite.w;

  return (
    <div className="relative flex items-center justify-center cursor-pointer group z-10 p-2" onClick={onClick}>
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          scale: active ? 1.05 : 0.75,
          filter: active ? 'drop-shadow(0 0 12px rgba(255,215,0,0.6))' : 'grayscale(100%) opacity(0.6)'
        }}
        whileHover={{ scale: active ? 1.1 : 0.95, filter: 'grayscale(0%) opacity(1)' }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div
          className="bg-no-repeat"
          style={{
            backgroundImage: 'url(/mp_icons.png)',
            backgroundSize: `${NATURAL_WIDTH * scale}px auto`,
            backgroundPosition: `-${sprite.x * scale}px -${sprite.y * scale}px`,
            width: `${sprite.w * scale}px`,
            height: `${sprite.h * scale}px`,
          }}
        />
      </motion.div>
    </div>
  );
};

interface SectTabProps {
  active: boolean;
  name: string;
  color: string;
  onClick: () => void;
}

const SectTab = ({ active, name, color, onClick }: SectTabProps) => {
  return (
    <motion.button
      className="relative w-36 h-12 mb-3 flex items-center justify-center cursor-pointer group"
      onClick={onClick}
      whileHover={{ x: -5 }}
    >
      {/* Background Tab Shape */}
      <div
        className={`absolute inset-0 transform skew-x-[-15deg] border transition-all duration-300 ${active ? 'bg-opacity-100 text-white shadow-lg' : 'bg-white bg-opacity-60 text-gray-600 hover:bg-opacity-80'}`}
        style={{
          backgroundColor: active ? color : undefined,
          borderColor: color,
        }}
      />

      {/* Text */}
      <span className={`relative z-10 font-bold text-base uppercase tracking-wide font-kiem-hiep ${active ? 'text-white' : 'text-gray-600'}`}>
        {name}
      </span>

      {/* Active Indicator Arrow */}
      {active && (
        <motion.div
          layoutId="activeTabIndicator"
          className="absolute -left-2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-b-[6px] border-b-transparent"
          style={{ borderRightColor: color }}
        />
      )}
    </motion.button>
  );
};

// SectsShowcase presents the Ngũ Hành and môn phái carousel with animations.
export default function SectsShowcase() {
  const [activeElIdx, setActiveElIdx] = useState(0);
  const [activeSectIdx, setActiveSectIdx] = useState(0);

  const currentElement = SECTS_DATA[activeElIdx];
  const currentSect = currentElement.sects[activeSectIdx];

  const handleNext = () => {
    if (activeSectIdx < currentElement.sects.length - 1) {
      setActiveSectIdx(prev => prev + 1);
    } else {
      const nextElIdx = (activeElIdx + 1) % SECTS_DATA.length;
      setActiveElIdx(nextElIdx);
      setActiveSectIdx(0);
    }
  };

  const handlePrev = () => {
    if (activeSectIdx > 0) {
      setActiveSectIdx(prev => prev - 1);
    } else {
      const prevElIdx = activeElIdx === 0 ? SECTS_DATA.length - 1 : activeElIdx - 1;
      setActiveElIdx(prevElIdx);
      setActiveSectIdx(SECTS_DATA[prevElIdx].sects.length - 1);
    }
  };

  const handleSelectElement = (idx: number) => {
    setActiveElIdx(idx);
    setActiveSectIdx(0);
  };

  return (
    <div
      className={`relative w-full h-[800px] overflow-hidden bg-gradient-to-b ${currentElement.bgGradient} transition-colors duration-700 select-none flex flex-col items-center bg-cover bg-center bg-no-repeat`}
    // style={{ backgroundImage: 'url("/bg-section-2.png")' }}
    >
      {/* --- HEADER DECORATION --- */}
      <div
        className="absolute top-8 w-[600px] h-[88px] bg-no-repeat"
        style={{
          backgroundImage: 'url(/mp_icons.png)',
          backgroundSize: `${NATURAL_WIDTH * (600 / 1080)}px auto`,
          backgroundPosition: `-${1096 * (600 / 1080)}px 0px`,
        }}
      >
        <span className="sr-only">Thập Thất Môn Phái</span>
      </div>

      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Faded Character for Element */}
        <motion.div
          key={`bg-char-${currentElement.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          className="absolute right-[10%] top-[10%] text-[400px] font-black font-kiem-hiep leading-none"
        >
          {currentElement.label}
        </motion.div>

        {/* Cloud/Fog Overlay (Bottom) */}
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="relative w-full max-w-7xl h-full flex items-center justify-between px-10 z-20">

        {/* 1. LEFT SIDEBAR (Five Elements) */}
        <div className="flex flex-col items-center relative h-full justify-center mr-10 gap-4">
          <div className="absolute top-[15%] bottom-[15%] w-px border-l-2 border-dashed border-gray-400 opacity-50" />

          {SECTS_DATA.map((el, idx) => (
            <ElementDiamond
              key={el.id}
              id={el.id}
              label={el.label}
              color={el.color}
              active={idx === activeElIdx}
              onClick={() => handleSelectElement(idx)}
            />
          ))}
        </div>

        {/* 2. NAVIGATION ARROW (LEFT) */}
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-white/50 transition opacity-60 hover:opacity-100 group"
        >
          <ChevronLeft className="w-8 h-8 text-gray-700 group-hover:scale-110 transition-transform" />
        </button>

        {/* 3. CENTER DISPLAY AREA */}
        <div className="flex-1 h-full relative flex items-center justify-center">
          <AnimatePresence mode='wait'>
            <div key={currentSect.id} className="relative w-full h-full flex items-center justify-center">

              {/* A. INFO PLAQUE (Left of Character) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="absolute left-[2%] top-[22%] bottom-[22%] w-72 z-30 flex flex-col "
              >

                <div
                  style={{
                    backgroundImage: 'url(/mp_desc_bg.png)',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                  }}
                  className="flex-1 text-white p-6 relative overflow-hidden rounded-sm flex flex-col"
                >
                  {/* Header (Sect Name) */}
                  <div className="flex items-center justify-between mb-6 pb-4 mt-2">
                    <div className="text-[#d4af37] font-bold text-2xl writing-vertical-lr h-28 tracking-widest pr-3 mr-3 font-kiem-hiep drop-shadow-md">
                      {currentElement.label}
                    </div>
                    <h2 className="text-5xl font-bold uppercase tracking-wider flex-1 text-center font-kiem-hiep text-[#f1c40f]" style={{ textShadow: "2px 2px 0px #000" }}>
                      {currentSect.name}
                    </h2>
                  </div>

                  {/* Slogan */}
                  <div className="mb-6 text-center">
                    <p className="text-white font-bold italic text-xl font-kiem-hiep tracking-wide">
                      "{currentSect.slogan}"
                    </p>
                  </div>

                  {/* Description */}
                  <div className="flex-1 overflow-y-auto pr-2">
                    <p className="text-base leading-loose text-gray-200 text-justify font-body">
                      {currentSect.description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* B. CHARACTER & CIRCLE (Center) */}
              <div className="relative h-[85%] aspect-square flex items-center justify-center translate-x-16 translate-y-4">
                {/* Rotating Magic Circle */}
                <motion.div
                  className="absolute inset-0 m-auto w-[90%] h-[90%] rounded-full border-[1px] border-dashed border-gray-400 opacity-50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-4 rounded-full border border-gray-400 opacity-30" />
                  {/* Ancient Text Ring */}
                  <svg className="w-full h-full absolute inset-0 text-gray-500 opacity-40 p-4" viewBox="0 0 100 100">
                    <path id="curve" d="M 12, 50 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="transparent" />
                    <text width="500">
                      <textPath xlinkHref="#curve" className="text-[3px] uppercase tracking-[3px] font-kiem-hiep fill-current font-bold">
                        Kim Mộc Thủy Hỏa Thổ • Tương Sinh Tương Khắc • Thiên Địa Hợp Nhất • Vạn Vật Quy Tông
                      </textPath>
                    </text>
                  </svg>
                </motion.div>

                {/* Element Glow behind character */}
                <div
                  className="absolute w-2/3 h-2/3 rounded-full blur-[80px] opacity-50 mix-blend-multiply"
                  style={{ backgroundColor: currentElement.color }}
                />

                {/* Character Image */}
                <motion.div
                  key={currentSect.id + "img"}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-20 w-full h-full flex items-center justify-center"
                >
                  {currentSect.characterImage ? (
                    <div className="relative w-full h-full">
                      <img
                        src={currentSect.characterImage}
                        alt={currentSect.name}
                        className="object-contain w-full h-full drop-shadow-2xl"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-[60%] h-[90%] ${currentSect.imagePlaceholderColor} opacity-90 mask-image-gradient flex items-end justify-center pb-10 rounded-2xl shadow-2xl`}
                      style={{
                        background: `linear-gradient(to top, ${currentElement.color}, transparent)`
                      }}
                    >
                      <span className="text-white font-bold opacity-70 font-kiem-hiep text-2xl">Character Asset</span>
                    </div>
                  )}
                </motion.div>
              </div>

            </div>
          </AnimatePresence>
        </div>

        {/* 4. NAVIGATION ARROW (RIGHT) */}
        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-white/50 transition opacity-60 hover:opacity-100 group"
        >
          <ChevronRight className="w-8 h-8 text-gray-700 group-hover:scale-110 transition-transform" />
        </button>

        {/* 5. RIGHT SIDEBAR (Sect Tabs) */}
        <div className="flex flex-col items-end ml-4 justify-center h-[60%] relative">
          <div className="absolute top-0 bottom-0 right-[-10px] w-px bg-gray-300" />

          {currentElement.sects.map((sect, idx) => (
            <SectTab
              key={sect.id}
              name={sect.name}
              color={currentElement.color}
              active={idx === activeSectIdx}
              onClick={() => setActiveSectIdx(idx)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}