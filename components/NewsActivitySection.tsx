"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Smartphone,
  UserPlus,
  CreditCard,
  Star,
  ChevronLeft,
  ChevronRight,
  Flame,
  Zap,
} from "lucide-react";
import Link from "next/link";
import {
  QUICK_ACTIONS,
  NEWS_TABS,
  NEWS_DATA,
  ACTIVITIES_ONGOING,
  ACTIVITIES_LONGTERM,
  type QuickAction,
  type NewsItem,
} from "../data/newsActivity";
import newsConfig from "../data/newsConfig.json";
import { useRouter } from "next/navigation";

/** Helper function to get icon component by name. */
function getQuickActionIcon(
  iconName: QuickAction["iconName"],
  size: number = 28,
) {
  const icons = {
    download: <Download size={size} />,
    mobile: <Smartphone size={size} />,
    register: <UserPlus size={size} />,
    topup: <CreditCard size={size} />,
  };
  return icons[iconName];
}

/** Renders a single quick action button with icon and gradient styling. */
function ActionButton({ item }: { item: QuickAction }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(item.href);
  };

  const isDownload = item.id === "download";

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -4 }}
      className={`w-full ${isDownload ? 'h-[250px]' : 'h-[70px]'} mb-0 rounded-lg flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group shadow-md transition-all duration-300 border border-white/10 ${!item.bgImage ? `${item.gradient} ${item.background}` : ""
        }`}
      style={{
        backgroundImage: item.bgImage ? `url(${item.bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={handleClick}
    >
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity" />

      {/* Dark contrast overlay - specialized for image vs solid bg */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity ${item.bgImage ? 'opacity-70' : 'opacity-30'}`} />

      {/* Main Content Area */}
      <div className={`flex ${isDownload ? 'flex-col' : 'flex-row px-4 gap-3'} items-center justify-center w-full z-10 ${isDownload ? 'h-3/4' : 'h-full'}`}>
        {!isDownload && (
          <div className="text-white drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500">
            {getQuickActionIcon(item.iconName, 28)}
          </div>
        )}

        <div className={`flex flex-col ${isDownload ? 'items-center' : 'items-start min-w-0'}`}>
          <span
            className={`font-kiem-hiep leading-tight transition-all duration-300 ${isDownload
              ? "text-5xl text-amber-400 italic tracking-wider font-bold group-hover:text-white"
              : "text-xl font-bold uppercase text-white truncate"
              }`}
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5), 0 0 10px rgba(0,0,0,0.3)'
            }}
          >
            {item.label}
          </span>
          {!isDownload && (
            <span
              className="text-[9px] opacity-90 font-sans text-white uppercase tracking-tighter group-hover:opacity-100 transition-opacity font-bold truncate"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.9)' }}
            >
              {item.sub}
            </span>
          )}
        </div>
      </div>

      {/* Special Bottom Section for Download */}
      {isDownload && item.extraInfo && (
        <div className="w-full h-1/4 bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center divide-x divide-white/10 z-10">
          <div className="flex-1 flex flex-col items-center justify-center leading-none">
            <span className="text-amber-400 font-bold text-lg" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{item.extraInfo.left.value}</span>
            <span className="text-[9px] text-white/60 uppercase font-medium">{item.extraInfo.left.label}</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center leading-none">
            <span className="text-amber-400 font-bold text-lg" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{item.extraInfo.right.value}</span>
            <span className="text-[9px] text-white/60 uppercase font-medium">{item.extraInfo.right.label}</span>
          </div>
        </div>
      )}

      {/* Hover Light Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
    </motion.button>
  );
}

/** Helper to get color based on tab name */
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

/** Renders a tab item for the news section with active indicator. */
function TabItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const activeColor = getTabColor(label);

  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-4 font-bold transition-all font-kiem-hiep text-lg uppercase tracking-wider ${active ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
      style={{ color: activeColor }}
    >
      {active && (
        <span
          className="absolute left-1 top-1/2 -translate-y-1/2 text-[10px] animate-pulse"
          style={{ color: activeColor }}
        >
          ◆
        </span>
      )}
      {label}
      {active && (
        <motion.div
          layoutId="newsTabUnderline"
          className="absolute bottom-1 left-2 right-2 h-[3px] rounded-full shadow-[0_-2px_8px_rgba(0,0,0,0.1)]"
          style={{ backgroundColor: activeColor }}
        />
      )}
    </button>
  );
}

/** Main news and activity section for landing page content. */
export default function NewsActivitySection() {
  const [activeNewsTab, setActiveNewsTab] = useState(0);
  const [activeActivityTab, setActiveActivityTab] = useState<
    "ongoing" | "longterm"
  >("ongoing");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // Filter news based on tab
  const filteredNews = NEWS_DATA.filter((news) => {
    if (activeNewsTab === 0) return true; // Mới nhất (All)
    const categoryName = NEWS_TABS[activeNewsTab];
    // Map tab names to categories if needed, currently direct match assumed
    // Adjust logic if tab name !== category in data
    return news.category.toLowerCase() === categoryName.toLowerCase();
  });

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const displayedNews = filteredNews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTabChange = (index: number) => {
    setActiveNewsTab(index);
    setCurrentPage(1); // Reset to page 1 on tab change
  };

  return (
    <section className="w-full flex justify-center font-sans text-[#2c3e50]">
      <div className="w-full max-w-[1200px] grid grid-cols-12 gap-4">
        {/* Left Column: Quick Actions */}
        <div className="col-span-2 flex flex-col z-10 gap-4 h-[440px]">
          {QUICK_ACTIONS.map((action) => (
            <ActionButton key={action.id} item={action} />
          ))}
        </div>

        {/* Right Column: News Table (Expanded to 10 cols) */}
        <div className="col-span-10 bg-white border border-slate-100 rounded-lg shadow-sm flex flex-col min-h-[400px] overflow-hidden">
          {/* Header Tabs */}
          <div className="flex items-center justify-between px-6 pt-1 border-b border-slate-50 bg-[#fbfcfd]">
            <div className="flex space-x-0">
              {NEWS_TABS.map((tab, idx) => (
                <TabItem
                  key={tab}
                  label={tab}
                  active={idx === activeNewsTab}
                  onClick={() => handleTabChange(idx)}
                />
              ))}
            </div>

            <Link href="/news" className="text-sm font-bold font-kiem-hiep text-slate-400 hover:text-red-600 mr-2 flex items-center gap-1 transition-all hover:translate-x-1">
              XEM THÊM <ChevronRight size={16} />
            </Link>
          </div>

          {/* News Table List */}
          <div className="flex-1 p-6 flex flex-col">


            <div className="flex-1 space-y-1">
              <AnimatePresence mode="wait">
                {displayedNews.map((news, idx) => (
                  <motion.div
                    key={news.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.2 }}
                    className="flex items-center gap-4 py-3 px-5 bg-white border border-slate-100 rounded-lg hover:border-red-100 hover:shadow-md hover:bg-slate-50/30 transition-all group cursor-pointer relative overflow-hidden"
                  >
                    {/* Ribbon Badge */}
                    {news.isHot ? (
                      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 bg-red-600 text-white text-[8px] font-bold px-4 py-0.5 transform rotate-45 translate-x-4 translate-y-1.5 shadow-sm uppercase text-center w-[60px]">
                          HOT
                        </div>
                      </div>
                    ) : news.isNew ? (
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

                    {/* Robinhood Style Tag */}
                    <div className="flex-shrink-0">
                      <span
                        className={`text-[10px] font-bold font-sans uppercase tracking-[0.05em] py-1 px-3 rounded-full
                        ${news.category === "Sự kiện"
                            ? "text-amber-600 bg-amber-50"
                            : news.category === "Thông báo"
                              ? "text-blue-600 bg-blue-50"
                              : "text-green-600 bg-green-50"
                          }`}
                      >
                        {news.category}
                      </span>
                    </div>

                    {/* Title Content */}
                    <div className="flex-1 min-w-0 pr-6">
                      <h3 className="truncate text-slate-700 font-bold text-lg font-kiem-hiep group-hover:text-red-700 transition-colors">
                        {news.title}
                      </h3>
                    </div>

                    {/* Clean Date (No Author) */}
                    <div className="flex-shrink-0 text-right ml-4">
                      <span className="text-sm text-slate-400 font-sans font-medium tabular-nums group-hover:text-slate-600">
                        {news.date.split('-').slice(1).reverse().join('/')}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {displayedNews.length === 0 && (
                <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                  <p>Không có tin tức nào.</p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-center items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded text-sm font-bold transition-all ${currentPage === page
                      ? "bg-[#b92b27] text-white shadow-md scale-110"
                      : "text-gray-500 hover:bg-gray-100"
                      }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Activity Section (Bottom) */}
        <div className="col-span-12 bg-white p-8 mt-4 rounded-lg border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8 border-l-4 border-red-600 pl-4">
            <h2 className="text-3xl font-bold font-kiem-hiep text-slate-900 tracking-wide uppercase">
              Hoạt động thế giới
            </h2>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse delay-75"></span>
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse delay-150"></span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {(activeActivityTab === "ongoing"
              ? ACTIVITIES_ONGOING
              : ACTIVITIES_LONGTERM
            )
              .filter((act) => act.showOnHomepage !== false)
              .slice(0, 6)
              .map((act) => (
                <motion.div
                  key={act.id}
                  whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                  className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden group cursor-pointer transition-all duration-300"
                >
                  <div
                    className={`h-42 ${act.imageColor} relative overflow-hidden`}
                  >
                    {act.image ? (
                      <>
                        <img
                          src={act.image}
                          alt={act.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-slate-900/0 transition-colors" />
                        <div className="w-full h-full flex items-center justify-center opacity-20">
                          <Star className="text-slate-900 w-12 h-12" />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-4 bg-white">
                    <h4 className="font-bold font-kiem-hiep text-xl leading-tight mb-2 truncate text-slate-900 group-hover:text-red-600 transition-colors">
                      {act.title}
                    </h4>
                    <p className="text-xs text-slate-400 mb-3 truncate font-medium">
                      {act.subtitle}
                    </p>
                    <div
                      className={`text-[10px] font-bold border-2 border-slate-100 px-2.5 py-1 inline-block rounded-lg shadow-sm text-slate-600 bg-slate-50`}
                    >
                      {act.dateRange}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
