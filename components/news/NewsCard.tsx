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
        className="flex items-center gap-4 py-3 px-5 bg-white border border-slate-100 rounded-lg hover:border-red-100 hover:shadow-md hover:bg-slate-50/30 transition-all group cursor-pointer relative overflow-hidden"
      >
        {/* Ribbon Badge */}
        {isHot ? (
          <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 bg-red-600 text-white text-[8px] font-bold px-4 py-0.5 transform rotate-45 translate-x-4 translate-y-1.5 shadow-sm uppercase text-center w-[60px]">
              HOT
            </div>
          </div>
        ) : isNew ? (
          <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute top-0 right-0 bg-green-500 text-white text-[8px] font-bold px-4 py-0.5 transform rotate-45 translate-x-4 translate-y-1.5 shadow-sm uppercase text-center w-[60px]"
            >
              NEW
            </motion.div>
          </div>
        ) : null}

        {/* Category Badge */}
        <div className="flex-shrink-0">
          <Badge variant={getCategoryVariant(category)}>{category}</Badge>
        </div>

        {/* Title Content */}
        <div className="flex-1 min-w-0 pr-6">
          <h3 className="truncate text-slate-700 font-bold text-lg font-kiem-hiep group-hover:text-red-700 transition-colors">
            {title}
          </h3>
        </div>

        {/* Date */}
        <div className="flex-shrink-0 flex items-center gap-4 ml-4">
          <span className="text-sm text-slate-400 font-sans font-medium tabular-nums group-hover:text-slate-600">
            {formattedDate}
          </span>
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-red-50 group-hover:text-red-500 transition-all">
            <ChevronRight size={18} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
