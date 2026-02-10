import Link from "next/link";
import { Download, CreditCard, Share2, Printer, ChevronRight, User, Calendar, Tag } from "lucide-react";
import type { ArticleItem } from "../data/types";
import { QUICK_ACTIONS } from "../data/newsActivity";
import Card, { CardWithGradient } from "./ui/Card";

interface ArticleDetailProps {
  article: ArticleItem;
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  const publishedAt = article.createdAt || `${article.date}`;

  return (
    <section className="w-full flex justify-center bg-[#f8fafc] py-8 md:py-12 font-kiem-hiep">
      <div className="w-full max-w-[1200px] px-4 flex flex-col gap-6 md:gap-8">

        {/* Quick Actions Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
          {QUICK_ACTIONS.map((action) => (
            <Link
              href={action.href}
              key={action.id}
              className={`group relative overflow-hidden rounded-lg p-6 flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br ${action.gradient} text-white`}
            >
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-125 transition-transform duration-500">
                {action.id === 'download' ? <Download size={80} /> : <CreditCard size={80} />}
              </div>
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/30">
                {action.id === 'download' ? <Download size={28} /> : <CreditCard size={28} />}
              </div>
              <div>
                <p className="text-xl font-bold leading-tight">{action.label}</p>
                <p className="text-white/70 text-sm uppercase tracking-wider">{action.sub}</p>
              </div>
              <div className="ml-auto w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <ChevronRight size={20} />
              </div>
            </Link>
          ))}
          {/* Third card for interaction */}
          <div className="group border-2 border-dashed border-slate-200 rounded-lg p-6 flex items-center gap-5 hover:border-red-200 hover:bg-red-50/30 transition-all cursor-pointer">
            <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-red-100 group-hover:text-red-500 transition-colors">
              <Tag size={28} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-700 group-hover:text-red-600 transition-colors">Sự Kiện Hot</p>
              <p className="text-slate-400 text-sm uppercase tracking-wider">Join Now</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <CardWithGradient>
          <div className="p-6 md:p-16">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-slate-400 border-b border-slate-50 pb-8">
              <div className="flex items-center gap-2">
                <User size={20} className="text-red-500" />
                <span className="text-slate-700 text-xl font-medium">Người viết: <span className="text-slate-700 text-xl font-medium">{article.author || "BQT Kiếm Hiệp"}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-red-500" />
                <span className="text-slate-700 text-xl font-medium">Phát hành: <span className="text-slate-700 text-xl font-medium">{publishedAt}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={20} className="text-red-500" />
                <span className="text-slate-700 text-xl font-medium">Chuyên mục: <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full font-semibold">{article.category}</span></span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-5xl font-extrabold text-slate-900 mb-6 md:mb-10 leading-[1.3] md:leading-[1.2] tracking-tight">
              {article.title}
            </h1>

            {/* Featured Image */}
            {article.cover && (
              <div className="mb-12 rounded-lg overflow-hidden shadow-2xl shadow-slate-200">
                <img
                  src={article.cover}
                  alt={article.title}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}

            {/* Article Body - Dynamic Content */}
            <div className="prose prose-slate prose-xl max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-strong:text-red-600 prose-a:text-red-600 hover:prose-a:text-red-700 prose-img:rounded-lg prose-img:w-full">
              {article.body ? (
                <article
                  className="space-y-8 text-slate-700 leading-relaxed text-xl"
                  dangerouslySetInnerHTML={{ __html: article.body }}
                />
              ) : (
                <article className="space-y-8 text-slate-700 leading-relaxed text-lg">
                  <p className="text-xl">Kính gửi <strong className="text-red-600">Đại Hiệp</strong>:</p>
                  <p className="text-slate-500 italic">
                    Nội dung bài viết đang được cập nhật. Vui lòng quay lại sau.
                  </p>
                  {article.summary && (
                    <div className="bg-slate-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                      <p className="font-medium text-slate-800">{article.summary}</p>
                    </div>
                  )}
                </article>
              )}
            </div>
          </div>

          {/* Related Links Footer */}

        </CardWithGradient>

        {/* Navigation Between Articles */}
        <div className="flex justify-between items-center px-4">
          <div className="flex gap-4">
            <p className="text-slate-400 text-sm">Bạn đang xem bài viết thuộc mục <strong>{article.category}</strong></p>
          </div>
        </div>

      </div>
    </section>
  );
}
