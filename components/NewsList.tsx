"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ARTICLES_DATA, type ArticleItem } from "../data/newsActivity";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

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
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id ?? "");

  const activeItems = useMemo(
    () => filterByCategory(ARTICLES_DATA, activeCategory),
    [activeCategory]
  );

  return (
    <section className="w-full flex justify-center bg-[#f8fafc] py-12 font-kiem-hiep">
      <div className="w-[1200px] flex flex-col gap-8">
        <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-red-600 rounded-full"></div>
            <h1 className="text-3xl font-extrabold text-slate-900 uppercase tracking-wide">Trung tâm tin tức</h1>
          </div>
          <div className="text-sm text-slate-400 font-sans font-medium">
            Trang chủ <span className="mx-2 text-slate-300">/</span> Danh sách tin <span className="mx-2 text-slate-300">/</span> <span className="text-red-600 font-bold">{activeCategory || "Tất cả"}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex items-center border-b border-slate-50 bg-[#fbfcfd] px-8">
            {categories.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-8 py-5 text-lg font-bold transition-all uppercase tracking-wider ${isActive ? "text-red-600 scale-105" : "text-slate-400 hover:text-slate-600"
                    }`}
                >
                  {cat.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-4 right-4 h-1 bg-red-600 rounded-t-full shadow-[0_-2px_8px_rgba(220,38,38,0.2)]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-8">
            <div className="flex flex-col gap-3">
              {activeItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug ?? ""}`}
                  className="flex items-center gap-4 py-3.5 px-6 bg-white border border-slate-100 rounded-lg hover:border-red-100 hover:shadow-md hover:bg-slate-50/30 transition-all group relative overflow-hidden"
                >
                  {/* Ribbon Badge */}
                  {item.isHot ? (
                    <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                      <div className="absolute top-0 right-0 bg-red-600 text-white text-[8px] font-bold px-4 py-0.5 transform rotate-45 translate-x-4 translate-y-1.5 shadow-sm uppercase text-center w-[60px]">
                        HOT
                      </div>
                    </div>
                  ) : item.isNew ? (
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
                      ${item.category === "Sự kiện"
                          ? "text-amber-600 bg-amber-50"
                          : item.category === "Thông báo"
                            ? "text-blue-600 bg-blue-50"
                            : "text-green-600 bg-green-50"
                        }`}
                    >
                      {item.category}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 pr-6">
                    <h3 className="truncate text-lg font-bold text-slate-700 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex-shrink-0 flex items-center gap-4 ml-4">
                    <span className="text-sm text-slate-400 font-sans font-medium tabular-nums group-hover:text-slate-600">
                      {item.date}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-red-50 group-hover:text-red-500 transition-all">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </Link>
              ))}
              {activeItems.length === 0 && (
                <div className="py-20 text-center text-slate-400 font-medium bg-white border border-dashed border-slate-200 rounded-lg">
                  Hiện chưa có tin bài nào trong chuyên mục này.
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 pt-10">
              <button className="p-2 border border-slate-100 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-red-600 transition-colors">
                <ChevronRight className="rotate-180" size={20} />
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-lg font-bold transition-all shadow-sm ${page === 1 ? "bg-red-600 text-white scale-110" : "bg-white border border-slate-100 text-slate-400 hover:border-red-200 hover:text-red-600"
                    }`}
                >
                  {page}
                </button>
              ))}
              <span className="px-2 text-slate-300">...</span>
              <button className="w-10 h-10 rounded-lg bg-white border border-slate-100 text-slate-400 font-bold hover:border-red-200 hover:text-red-600 transition-all">
                25
              </button>
              <button className="p-2 border border-slate-100 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-red-600 transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

