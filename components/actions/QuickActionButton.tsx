"use client";

import { motion } from "framer-motion";
import { Download, Smartphone, UserPlus, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

interface QuickActionButtonProps {
  id: string;
  label: string;
  sub: string;
  iconName: "download" | "mobile" | "register" | "topup";
  gradient: string;
  background: string;
  href: string;
  bgImage?: string;
  extraInfo?: {
    left: { value: string; label: string };
    right: { value: string; label: string };
  };
}

function getIcon(iconName: QuickActionButtonProps["iconName"], size: number = 28) {
  const icons = {
    download: <Download size={size} />,
    mobile: <Smartphone size={size} />,
    register: <UserPlus size={size} />,
    topup: <CreditCard size={size} />,
  };
  return icons[iconName];
}

export default function QuickActionButton({
  id,
  label,
  sub,
  iconName,
  gradient,
  background,
  href,
  bgImage,
  extraInfo,
}: QuickActionButtonProps) {
  const router = useRouter();
  const isDownload = id === "download";

  const handleClick = () => {
    router.push(href);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -4 }}
      className={`w-full ${isDownload ? "h-[200px] md:h-[250px]" : "h-[60px] md:h-[70px]"} mb-0 rounded-lg flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group shadow-md transition-all duration-300 border border-white/10 ${!bgImage ? `${gradient} ${background}` : ""
        }`}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={handleClick}
    >
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity" />

      {/* Dark contrast overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity ${bgImage ? "opacity-70" : "opacity-30"
          }`}
      />

      {/* Main Content Area */}
      <div
        className={`flex ${isDownload ? "flex-col" : "flex-row px-4 gap-3"} items-center justify-center w-full z-10 ${isDownload ? "h-3/4" : "h-full"
          }`}
      >
        {!isDownload && (
          <div className="text-white drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500">
            {getIcon(iconName, 28)}
          </div>
        )}

        <div className={`flex flex-col ${isDownload ? "items-center" : "items-start min-w-0"}`}>
          <span
            className={`font-kiem-hiep leading-tight transition-all duration-300 ${isDownload
                ? "text-4xl text-amber-400 italic tracking-wider font-bold group-hover:text-white"
                : "text-xl font-bold uppercase text-white truncate"
              }`}
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5), 0 0 10px rgba(0,0,0,0.3)",
            }}
          >
            {label}
          </span>
          {!isDownload && (
            <span
              className="text-[9px] opacity-90 font-sans text-white uppercase tracking-tighter group-hover:opacity-100 transition-opacity font-bold truncate"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.9)" }}
            >
              {sub}
            </span>
          )}
        </div>
      </div>

      {/* Special Bottom Section for Download */}
      {isDownload && extraInfo && (
        <div className="w-full h-1/4 bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center divide-x divide-white/10 z-10">
          <div className="flex-1 flex flex-col items-center justify-center leading-none">
            <span
              className="text-amber-400 font-bold text-lg"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
            >
              {extraInfo.left.value}
            </span>
            <span className="text-[9px] text-white/60 uppercase font-medium">
              {extraInfo.left.label}
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center leading-none">
            <span
              className="text-amber-400 font-bold text-lg"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
            >
              {extraInfo.right.value}
            </span>
            <span className="text-[9px] text-white/60 uppercase font-medium">
              {extraInfo.right.label}
            </span>
          </div>
        </div>
      )}

      {/* Hover Light Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
    </motion.button>
  );
}
