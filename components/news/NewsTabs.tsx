"use client";

import { motion } from "framer-motion";

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
  return (
    <div className="flex space-x-0">
      {tabs.map((tab, idx) => {
        const isActive = idx === activeTab;
        const activeColor = getTabColor(tab);

        return (
          <button
            key={tab}
            onClick={() => onTabChange(idx)}
            className={`relative px-6 py-4 font-bold transition-all font-kiem-hiep text-lg uppercase tracking-wider ${
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
  );
}
