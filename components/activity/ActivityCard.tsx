"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface ActivityCardProps {
  id: string;
  title: string;
  subtitle: string;
  dateRange: string;
  image?: string;
  imageColor: string;
}

export default function ActivityCard({
  title,
  subtitle,
  dateRange,
  image,
  imageColor,
}: ActivityCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
      className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden group/card cursor-pointer transition-all duration-300"
    >
      <div className={`h-42 ${imageColor} relative overflow-hidden`}>
        {image ? (
          <>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-slate-900/5 group-hover/card:bg-slate-900/0 transition-colors" />
            <div className="w-full h-full flex items-center justify-center opacity-20">
              <Star className="text-slate-900 w-12 h-12" />
            </div>
          </>
        )}
      </div>
      <div className="p-4 bg-white">
        <h4 className="font-bold font-kiem-hiep text-xl leading-tight mb-2 truncate text-slate-900 group-hover/card:text-red-600 transition-colors">
          {title}
        </h4>
        <p className="text-xs text-slate-400 mb-3 truncate font-medium">
          {subtitle}
        </p>
        <div className="text-[10px] font-bold border-2 border-slate-100 px-2.5 py-1 inline-block rounded-lg shadow-sm text-slate-600 bg-slate-50">
          {dateRange}
        </div>
      </div>
    </motion.div>
  );
}
