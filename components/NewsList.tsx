"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ARTICLES_DATA, type ArticleItem } from "../data/newsActivity";

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
    <section className="w-full flex justify-center bg-white py-12">
      <div className="w-[1200px] bg-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">Trung tâm tin tức</span>
          </div>
          <div className="text-sm text-gray-500">
            Vị trí của bạn: Trang chủ &gt; Danh sách tin &gt; {activeCategory || "Tất cả"}
          </div>
        </div>

        <div className="flex items-center border-b border-gray-200 mb-6">
          {categories.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 text-base font-bold border-b-2 ${
                  isActive ? "text-red-600 border-red-600" : "text-gray-600 border-transparent"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
          {activeItems.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug ?? ""}`}
              className="flex items-center justify-between h-14 px-4 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="truncate hover:text-red-600">{item.title}</span>
              <span className="text-gray-500 text-sm">{item.date}</span>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 pt-6">
          <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
            Trước
          </button>
          {[1, 2, 3, 4, 5, 6, 7].map((page) => (
            <button
              key={page}
              className={`w-9 h-9 border border-gray-300 rounded ${
                page === 1 ? "bg-gray-700 text-white" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="px-2 text-gray-500">...</span>
          <button className="w-12 h-9 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
            251
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
            Sau
          </button>
        </div>
      </div>
    </section>
  );
}

