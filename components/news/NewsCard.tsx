import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Badge, { getCategoryVariant } from "../ui/Badge";

interface NewsCardProps {
  id: string;
  slug?: string;
  title: string;
  date: string;
  category: string;
  isHot?: boolean;
  isNew?: boolean;
  index?: number;
}

export default function NewsCard({
  slug,
  title,
  date,
  category,
  isHot,
  isNew,
  index = 0,
}: NewsCardProps) {
  const formattedDate = date.split("-").slice(1).reverse().join("/");

  return (
    <Link href={`/news/${slug ?? ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.2 }}
        className="flex items-center gap-2 md:gap-4 py-3 px-3 md:px-5 bg-white border border-slate-100 rounded-lg hover:border-red-100 hover:shadow-md hover:bg-slate-50/30 transition-all group cursor-pointer relative overflow-hidden"
      >
        {/* Ribbon Badge */}
        {isHot ? (
          <div className="absolute -top-[2px] -right-[2px] w-14 md:w-16 h-14 md:h-16 overflow-hidden pointer-events-none z-10">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] md:text-xs font-black px-6 py-1 transform rotate-45 translate-x-[18px] translate-y-[8px] shadow-lg uppercase tracking-widest border-t border-white/20
            bg-red-400/10 font-medium text-red-400 inset-ring inset-ring-red-400/20
            ">
              HOT
            </div>
          </div>
        ) : null}

        {/* Category Badge */}
        <div className="flex-shrink-0">
          <Badge variant={getCategoryVariant(category)}>{category}</Badge>
        </div>

        {/* Title Content */}
        <div className="flex-1 min-w-0 pr-2 md:pr-6">
          <h3 className="truncate text-slate-700 font-bold text-sm md:text-lg font-kiem-hiep group-hover:text-red-700 transition-colors">
            {title}
          </h3>
        </div>

        {/* Date */}
        <div className="flex-shrink-0 flex items-center gap-2 md:gap-4 ml-1 md:ml-4">
          <span className="text-xs md:text-sm text-slate-400 font-sans font-medium tabular-nums group-hover:text-slate-600 hidden xs:block">
            {formattedDate}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
