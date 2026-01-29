"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, LayoutGrid, X as CloseIcon, ChevronLeft } from "lucide-react";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

// Import data
import {
  QUICK_ACTIONS,
  NEWS_TABS,
  NEWS_DATA,
  ACTIVITIES_ONGOING,
  ACTIVITIES_LONGTERM,
} from "../data/newsActivity";

// Import sub-components
import QuickActionButton from "./actions/QuickActionButton";
import NewsTabs from "./news/NewsTabs";
import NewsCard from "./news/NewsCard";
import ActivityCard from "./activity/ActivityCard";
import Pagination from "./ui/Pagination";

/** Main news and activity section for landing page content. */
export default function NewsActivitySection() {
  const [activeNewsTab, setActiveNewsTab] = useState(0);
  const [activeActivityTab] = useState<"ongoing" | "longterm">("ongoing");
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();

    // Listen
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // Filter news based on tab
  const filteredNews = NEWS_DATA.filter((news) => {
    if (activeNewsTab === 0) return true; // Mới nhất (All)
    const categoryName = NEWS_TABS[activeNewsTab];
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

  const activities = activeActivityTab === "ongoing" ? ACTIVITIES_ONGOING : ACTIVITIES_LONGTERM;
  const displayedActivities = activities
    .filter((act) => act.showOnHomepage !== false);

  return (
    <section className="w-full flex justify-center font-sans text-[#2c3e50] relative">
      {/* Mobile Fixed Toggle for Quick Actions */}
      <div className="lg:hidden fixed bottom-6 right-6 z-[9999]">
        {
          !isMobile && (
            <button
          onClick={() => setIsActionsOpen(!isActionsOpen)}
          className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-500/40 border-2 border-white/20 hover:scale-110 active:scale-95 transition-all"
        >
          {isActionsOpen ? <CloseIcon size={24} /> : <LayoutGrid size={24} />}
        </button>
          )
        }
        <AnimatePresence>
          {isActionsOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1]"
                onClick={() => setIsActionsOpen(false)}
              />
              <div className="absolute bottom-20 right-0 flex flex-col items-end gap-3 min-w-[200px]">
                {QUICK_ACTIONS.map((action, idx) => (
                  <div
                    key={action.id}
                    className="w-full"
                  >
                    <QuickActionButton {...action} />
                  </div>
                ))}
              </div>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Quick Actions (Desktop Only) */}
        <div className="hidden lg:flex col-span-2 flex-col z-10 gap-4 h-[440px]">
          {QUICK_ACTIONS.map((action) => (
            <QuickActionButton key={action.id} {...action} />
          ))}
        </div>

        {/* Right Column: News Table */}
        <div className="col-span-1 lg:col-span-10 bg-white border border-slate-100 md:rounded-lg shadow-sm flex flex-col min-h-[400px] overflow-hidden">
          {/* Header Tabs */}
          <div className="flex items-center justify-between px-4 md:px-6 pt-1 border-b border-slate-50 bg-[#fbfcfd]">
            <NewsTabs
              tabs={NEWS_TABS}
              activeTab={activeNewsTab}
              onTabChange={handleTabChange}
            />
          </div>

          {/* News Table List */}
          <div className="flex-1 p-4 md:p-6 flex flex-col">
            <div className="flex-1 space-y-1">
              <AnimatePresence mode="wait">
                {displayedNews.map((news, idx) => (
                  <NewsCard
                    key={news.id}
                    id={news.id}
                    slug={news.slug}
                    title={news.title}
                    date={news.date}
                    category={news.category}
                    isHot={news.isHot}
                    isNew={news.isNew}
                    index={idx}
                  />
                ))}
              </AnimatePresence>

              {displayedNews.length === 0 && (
                <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                  <p>Không có tin tức nào.</p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>

        {/* Activity Section (Bottom) */}
        <div className="col-span-1 lg:col-span-12 bg-white p-4 md:p-8 mt-4 md:rounded-lg border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6 md:mb-8 border-l-4 border-red-600 pl-4">
            <h2 className="text-xl md:text-3xl font-bold font-kiem-hiep text-slate-900 tracking-wide uppercase">
              Hoạt động nổi bật
            </h2>
            
          </div>


          <div className="relative">
            <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={16}
            slidesPerView={2}
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            grabCursor={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="w-full pb-4"
          >
            {displayedActivities.map((act) => (
              <SwiperSlide key={act.id}>
                <ActivityCard
                  id={act.id}
                  title={act.title}
                  subtitle={act.subtitle}
                  dateRange={act.dateRange}
                  image={act.image}
                  imageColor={act.imageColor}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons (Overlay) */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -ml-2 md:-ml-4 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-lg active:scale-95 disabled:opacity-0 opacity-80 hover:opacity-100 duration-300">
            <ChevronLeft size={20} />
          </button>
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 -mr-2 md:-mr-4 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-lg active:scale-95 disabled:opacity-0 opacity-80 hover:opacity-100 duration-300">
            <ChevronRight size={20} />
          </button>
        </div>
        </div>
      </div>
    </section>
  );
}
