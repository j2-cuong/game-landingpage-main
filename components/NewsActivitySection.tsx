"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

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
    .filter((act) => act.showOnHomepage !== false)
    .slice(0, 6);

  return (
    <section className="w-full flex justify-center font-sans text-[#2c3e50]">
      <div className="w-full max-w-[1200px] grid grid-cols-12 gap-4">
        {/* Left Column: Quick Actions */}
        <div className="col-span-2 flex flex-col z-10 gap-4 h-[440px]">
          {QUICK_ACTIONS.map((action) => (
            <QuickActionButton key={action.id} {...action} />
          ))}
        </div>

        {/* Right Column: News Table */}
        <div className="col-span-10 bg-white border border-slate-100 rounded-lg shadow-sm flex flex-col min-h-[400px] overflow-hidden">
          {/* Header Tabs */}
          <div className="flex items-center justify-between px-6 pt-1 border-b border-slate-50 bg-[#fbfcfd]">
            <NewsTabs
              tabs={NEWS_TABS}
              activeTab={activeNewsTab}
              onTabChange={handleTabChange}
            />
          </div>

          {/* News Table List */}
          <div className="flex-1 p-6 flex flex-col">
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
            {displayedActivities.map((act) => (
              <ActivityCard
                key={act.id}
                id={act.id}
                title={act.title}
                subtitle={act.subtitle}
                dateRange={act.dateRange}
                image={act.image}
                imageColor={act.imageColor}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
