"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { ARTICLES_DATA, type ArticleItem } from "../data/newsActivity";
import Card, { CardHeader } from "./ui/Card";
import NewsTabs from "./news/NewsTabs";
import NewsCard from "./news/NewsCard";
import Pagination from "./ui/Pagination";

interface NewsCategory {
  id: string;
  label: string;
}

function buildCategories(articles: ArticleItem[]): NewsCategory[] {
  const unique = Array.from(new Set(articles.map((a) => a.category)));
  return unique.map((cat) => ({ id: cat, label: cat }));
}

function filterByCategory(articles: ArticleItem[], category: string) {
  if (!category) return articles;
  return articles.filter((a) => a.category === category);
}

// NewsList renders the news center tabs và list dựa trên mock JSON.
export default function NewsList() {
  const categories = useMemo(() => buildCategories(ARTICLES_DATA), []);
  const categoryLabels = useMemo(() => categories.map((c) => c.label), [categories]);
  const [activeCategory, setActiveCategory] = useState(0);

  const activeCategoryName = categories[activeCategory]?.id ?? "";
  const activeItems = useMemo(
    () => filterByCategory(ARTICLES_DATA, activeCategoryName),
    [activeCategoryName]
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(activeItems.length / ITEMS_PER_PAGE);
  const displayedItems = activeItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTabChange = (index: number) => {
    setActiveCategory(index);
    setCurrentPage(1);
  };

  return (
    <section className="w-full flex justify-center bg-[#f8fafc] py-12 font-kiem-hiep">
      <div className="w-[1200px] flex flex-col gap-8">
        {/* Title Card */}
        <Card padding="md" className="flex items-center justify-between">
          <CardHeader withAccent>
            <h1 className="text-3xl font-extrabold text-slate-900 uppercase tracking-wide">
              Trung tâm tin tức
            </h1>
          </CardHeader>
          <div className="text-sm text-slate-400 font-sans font-medium">
            Trang chủ <span className="mx-2 text-slate-300">/</span> Danh sách tin{" "}
            <span className="mx-2 text-slate-300">/</span>{" "}
            <span className="text-red-600 font-bold">{activeCategoryName || "Tất cả"}</span>
          </div>
        </Card>

        {/* Main Content Card */}
        <Card padding="none">
          {/* Tab Navigation */}
          <div className="flex items-center border-b border-slate-50 bg-[#fbfcfd] px-8">
            <NewsTabs
              tabs={categoryLabels}
              activeTab={activeCategory}
              onTabChange={handleTabChange}
            />
          </div>

          <div className="p-8">
            <div className="flex flex-col gap-3">
              <AnimatePresence mode="wait">
                {displayedItems.map((item, idx) => (
                  <NewsCard
                    key={item.id}
                    id={item.id}
                    slug={item.slug}
                    title={item.title}
                    date={item.date}
                    category={item.category}
                    isHot={item.isHot}
                    isNew={item.isNew}
                    index={idx}
                  />
                ))}
              </AnimatePresence>

              {displayedItems.length === 0 && (
                <div className="py-20 text-center text-slate-400 font-medium bg-white border border-dashed border-slate-200 rounded-lg">
                  Hiện chưa có tin bài nào trong chuyên mục này.
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="pt-10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
