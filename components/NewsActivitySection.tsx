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
      className={`w-full flex-1 mb-0 rounded flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group shadow-lg border-2 border-yellow-600/30 ${!item.bgImage ? `${item.gradient} ${item.background}` : ""
        }`}
      style={{
        backgroundImage: item.bgImage ? `url(${item.bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={handleClick}
    >
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      {/* Main Content Area */}
      <div className={`flex flex-col items-center justify-center w-full ${isDownload ? 'h-3/4' : 'h-full'}`}>
        {!isDownload && (
          <div className="text-white mb-2 drop-shadow-md scale-125">
            {getQuickActionIcon(item.iconName, 32)}
          </div>
        )}

        <div className="flex flex-col items-center">
          <span className={`font-kiem-hiep leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${isDownload
              ? "text-5xl text-yellow-400 italic tracking-wider font-bold"
              : "text-xl font-bold uppercase text-white"
            }`}>
            {item.label}
          </span>
          {!isDownload && (
            <span className="text-xs opacity-80 font-sans mt-1 text-white uppercase tracking-tighter">
              {item.sub}
            </span>
          )}
        </div>
      </div>

      {/* Special Bottom Section for Download */}
      {isDownload && item.extraInfo && (
        <div className="w-full h-1/4 bg-black/40 backdrop-blur-sm border-t border-yellow-500/30 flex items-center divide-x divide-yellow-500/20">
          <div className="flex-1 flex flex-col items-center justify-center leading-none">
            <span className="text-yellow-500 font-bold text-lg">{item.extraInfo.left.value}</span>
            <span className="text-[10px] text-gray-300 uppercase">{item.extraInfo.left.label}</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center leading-none">
            <span className="text-yellow-500 font-bold text-lg">{item.extraInfo.right.value}</span>
            <span className="text-[10px] text-gray-300 uppercase">{item.extraInfo.right.label}</span>
          </div>
        </div>
      )}

      {/* Hover Light Effect */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
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
      className="relative px-5 py-3 font-bold transition-colors font-kiem-hiep text-base uppercase"
      style={{ color: activeColor }}
    >
      {active && (
        <span
          className="absolute left-1 top-1/2 -translate-y-1/2 text-xs"
          style={{ color: activeColor }}
        >
          ◆
        </span>
      )}
      {label}
      {active && (
        <motion.div
          layoutId="newsTabUnderline"
          className="absolute bottom-0 left-2 right-2 h-0.5"
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
        <div className="col-span-10 bg-white border border-gray-200 rounded shadow-sm flex flex-col min-h-[400px]">
          {/* Header Tabs */}
          <div className="flex items-center justify-between px-4 pt-2 border-b border-gray-100 bg-gray-50/50">
            <div className="flex space-x-2">
              {NEWS_TABS.map((tab, idx) => (
                <TabItem
                  key={tab}
                  label={tab}
                  active={idx === activeNewsTab}
                  onClick={() => handleTabChange(idx)}
                />
              ))}
            </div>

            <a href="/news" className="text-sm text-gray-400 hover:text-[#b92b27] mr-2 flex items-center gap-1 transition-colors">
              Xem thêm <ChevronRight size={14} />
            </a>
          </div>

          {/* News Table List */}
          <div className="flex-1 p-4 flex flex-col">


            <div className="flex-1 space-y-1">
              <AnimatePresence mode="wait">
                {displayedNews.map((news, idx) => (
                  <motion.div
                    key={news.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.2 }}
                    className="grid grid-cols-12 gap-2 items-center py-2.5 px-2 hover:bg-gray-50 rounded transition-colors group cursor-pointer border-b border-gray-50 last:border-0"
                  >
                    {/* Category */}
                    <div className="col-span-2">
                      <span
                        className={`text-xs font-bold font-kiem-hiep py-0.5 px-2 rounded border
                        ${news.category === "Sự kiện" || news.category === "Thông báo"
                            ? "animate-pulse border-red-200 text-[#b92b27] bg-red-50"
                            : "border-gray-200 text-gray-500 bg-gray-100"
                          }`}
                      >
                        [{news.category}]
                      </span>
                    </div>

                    {/* Title */}
                    <div className="col-span-7 min-w-0 pr-4">
                      <div className="flex items-center">
                        <span className="truncate group-hover:text-[#b92b27] transition-colors text-gray-700 font-medium text-[15px]">
                          {news.title}
                        </span>

                        {/* Tags */}
                        {news.isHot && (
                          <span className="ml-2 inline-flex items-center text-[10px] uppercase font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 px-1.5 py-0.5 rounded shadow-sm animate-bounce duration-2000">
                            <Flame size={10} className="mr-0.5" fill="currentColor" /> HOT
                          </span>
                        )}
                        {news.isNew && (
                          <span className="ml-2 inline-flex items-center text-[10px] uppercase font-bold text-white bg-gradient-to-r from-blue-400 to-blue-600 px-1.5 py-0.5 rounded shadow-sm">
                            <Zap size={10} className="mr-0.5" fill="currentColor" /> NEW
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Author */}
                    <div className="col-span-2">
                      <span className="text-xs text-gray-500 font-medium flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 group-hover:bg-[#b92b27] transition-colors"></span>
                        {news.author || "Admin"}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="col-span-1 text-right">
                      <span className="text-sm text-gray-400 font-sans tabular-nums">
                        {news.date.split('-').slice(1).join('/')}
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
        <div className="col-span-12 bg-white p-4 mt-2">
          <div className="flex items-center mb-4 border-l-4 border-[#b92b27] pl-3">
            <h2 className="text-2xl font-bold font-kiem-hiep text-gray-800 mr-6">
              Hoạt động hàng ngày
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-2">
            {(activeActivityTab === "ongoing"
              ? ACTIVITIES_ONGOING
              : ACTIVITIES_LONGTERM
            )
              .filter((act) => act.showOnHomepage !== false)
              .slice(0, 6)
              .map((act) => (
                <motion.div
                  key={act.id}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden group cursor-pointer"
                >
                  <div
                    className={`h-42 ${act.imageColor} relative overflow-hidden`}
                  >
                    {act.image ? (
                      <>
                        <img
                          src={act.image}
                          alt={act.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        <div className="w-full h-full flex items-center justify-center opacity-50">
                          <Star className="text-white w-12 h-12" />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold font-kiem-hiep text-lg leading-tight mb-1 truncate group-hover:text-[#b92b27]">
                      {act.title}
                    </h4>
                    <p className="text-xs text-gray-500 mb-2 truncate">
                      {act.subtitle}
                    </p>
                    <div
                      className={`text-xs font-bold border border-current px-2 py-0.5 inline-block rounded-sm ${act.statusColor}`}
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
