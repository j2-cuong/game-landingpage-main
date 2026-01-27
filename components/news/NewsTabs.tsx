"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";

interface NewsTabsProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

function getTabColor(tab: string) {
  switch (tab.toLowerCase()) {
    case "thông báo":
      return "#0284c7"; // sky-600
    case "tin tức":
      return "#16a34a"; // green-600
    case "sự kiện":
      return "#d97706"; // amber-600
    default:
      return "#b92b27"; // Default Red
  }
}

export default function NewsTabs({ tabs, activeTab, onTabChange }: NewsTabsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeTabName = tabs[activeTab];
  const activeColor = getTabColor(activeTabName);

  return (
    <div className="w-full md:w-auto relative z-20">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden w-full">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-lg shadow-sm transition-all hover:bg-slate-50"
          style={{ borderColor: isMenuOpen ? activeColor : undefined }}
        >
          <span className="font-bold font-kiem-hiep text-lg uppercase tracking-wider" style={{ color: activeColor }}>
            {activeTabName}
          </span>
          <div style={{ color: activeColor }}>
            {isMenuOpen ? <X size={24} /> : <Plus size={24} />}
          </div>
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-lg shadow-xl overflow-hidden z-30 flex flex-col p-2"
            >
              {tabs.map((tab, idx) => {
                const isActive = idx === activeTab;
                if (isActive) return null; // Hide active tab from dropdown

                const tabColor = getTabColor(tab);
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      onTabChange(idx);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-md font-bold font-kiem-hiep uppercase tracking-wider transition-all hover:bg-slate-50 text-slate-600"
                    style={{ color: undefined }} // Removed dynamic color for inactive items to keep it clean
                  >
                    {tab}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:flex space-x-0 overflow-visible whitespace-nowrap p-2">
        {tabs.map((tab, idx) => {
          const isActive = idx === activeTab;
          const activeColor = getTabColor(tab);

          return (
            <button
              key={tab}
              onClick={() => onTabChange(idx)}
              className={`relative px-6 py-4 font-bold transition-all font-kiem-hiep text-lg uppercase tracking-wider flex-shrink-0 ${
                isActive ? "opacity-100 scale-105" : "opacity-60 hover:opacity-100 hover:scale-105"
              }`}
              style={{ color: activeColor }}
            >
              {isActive && (
                <span
                  className="absolute left-1 top-1/2 -translate-y-1/2 text-[10px] animate-pulse"
                  style={{ color: activeColor }}
                >
                  ◆
                </span>
              )}
              {tab}
              {isActive && (
                <motion.div
                  layoutId="newsTabUnderline"
                  className="absolute bottom-1 left-2 right-2 h-[3px] rounded-full shadow-[0_-2px_8px_rgba(0,0,0,0.1)]"
                  style={{ backgroundColor: activeColor }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
