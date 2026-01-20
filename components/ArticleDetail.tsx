import Link from "next/link";
import { Download, CreditCard, Share2, Printer, ChevronRight, User, Calendar, Tag } from "lucide-react";
import { type ArticleItem, QUICK_ACTIONS } from "../data/newsActivity";
import navigation from "../data/navigation.json";

interface ArticleDetailProps {
  article: ArticleItem;
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  const publishedAt = article.createdAt || `${article.date} 00:00:00`;

  return (
    <section className="w-full flex justify-center bg-[#f8fafc] py-12 font-kiem-hiep">
      <div className="w-[1200px] flex flex-col gap-8">

        {/* Top Breadcrumb & Actions Bar */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-slate-100">
          <div className="flex items-center text-sm text-slate-500 gap-2">
            <Link href="/" className="hover:text-red-600 transition-colors">Trang chủ</Link>
            <ChevronRight size={14} />
            <Link href="/news" className="hover:text-red-600 transition-colors">Tin tức</Link>
            <ChevronRight size={14} />
            <span className="text-red-600 font-medium">{article.category}</span>
          </div>
          <div className="flex gap-3">
            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-red-600" title="Chia sẻ">
              <Share2 size={18} />
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-red-600" title="In bài viết">
              <Printer size={18} />
            </button>
          </div>
        </div>

        {/* Quick Actions Grid - Inspired by Download Page */}
        <div className="grid grid-cols-3 gap-6">
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
        <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
          {/* Article Header Background */}
          <div className="h-2 bg-gradient-to-r from-red-500 via-amber-500 to-red-500"></div>

          <div className="p-10 md:p-16">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-slate-400 border-b border-slate-50 pb-8">
              <div className="flex items-center gap-2">
                <User size={16} className="text-red-500" />
                <span>Người viết: <span className="text-slate-700 font-medium">BQT Kiếm Hiệp</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-red-500" />
                <span>Phát hành: <span className="text-slate-700 font-medium">{publishedAt}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-red-500" />
                <span>Chuyên mục: <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full font-semibold">{article.category}</span></span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-10 leading-[1.2] tracking-tight">
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

            {/* Article Body */}
            <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-strong:text-red-600 prose-a:text-red-600 hover:prose-a:text-red-700">
              {/* 
                  Note: In a real app, this would be dangerouslySetInnerHTML={ { __html: article.body } }
                  For now we replicate the static content provided previously but with enhanced styling classes.
               */}
              <article className="space-y-8 text-slate-700 leading-relaxed text-lg">
                <p className="text-xl">Kính gửi <strong className="text-red-600">Đại Hiệp</strong>:</p>

                <p className="indent-8">
                  Để đảm bảo máy chủ hoạt động ổn định và chất lượng dịch vụ, tất cả các máy chủ sẽ tiến hành {" "}
                  <span className="font-bold text-slate-900 bg-amber-50 px-1 italic">
                    bảo trì phiên bản toàn bộ khu vực và máy chủ vào Thứ Ba, ngày 9 tháng 12 lúc 07:30
                  </span>,
                  dự kiến bảo trì xong lúc <strong className="text-red-600">10:30</strong>. Trong thời gian bảo trì máy chủ, tất cả các hoạt động trong game sẽ tạm dừng.
                </p>

                <div className="bg-slate-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                  <p className="font-medium text-slate-800">Số phiên bản client sau khi cập nhật: <span className="text-red-600">2.646</span></p>
                </div>

                <section className="space-y-6">
                  <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="w-2 h-8 bg-red-600 rounded-full"></span>
                    【Đại Lễ Hội Cuối Năm Sôi Động Khai Mở!】
                  </h2>
                  <p className="indent-8">
                    Chào đón năm mới, tạm biệt năm cũ. Sau khi bảo trì ngày 9 tháng 12 kết thúc, chúng ta sẽ chào đón Đại Lễ Hội Cuối Năm thường niên! Các hoạt động hấp dẫn như <strong>Cá Chép Hiện Thế</strong>, <strong>Bằng Hữu Quay Về</strong> và <strong>Nghê Thường Khởi Mộng</strong> đang chờ đón sự tham gia của quý vị Đại Hiệp!
                  </p>
                  <div className="rounded-lg overflow-hidden border border-slate-100 shadow-md">
                    <img src="/news/news_detail_1.jpg" alt="Đại Lễ Hội Cuối Năm" className="w-full h-auto" />
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-800">1. Cá Chép Hiện Thế</h3>
                    <p className="text-slate-600">Lễ hội nâng cấp, phúc lợi tối đa! Đại Hiệp nhận gói quà miễn phí hàng ngày, cơ hội trúng vàng Chow Tai Fook.</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-800">2. Bằng Hữu Quay Về</h3>
                    <p className="text-slate-600">Mời bằng hữu quay về, nhận Kim Khóa, Ngân Khóa và Trân Châu Bối cực phẩm.</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-10 mt-16 flex flex-col items-center gap-6">
                  <div className="text-center italic text-slate-400 mb-4">
                    "Giang hồ dù xa, có bạn không cô độc; đao kiếm vô tình, vì yêu mà vô úy."
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-1 bg-red-600 mb-4"></div>
                    <p className="font-bold text-slate-900">Đội ngũ vận hành 【Kiếm Hiệp Thế Giới】</p>
                    <p className="text-sm text-slate-400 uppercase tracking-widest mt-1">Sovereign Team</p>
                  </div>
                </div>
              </article>
            </div>
          </div>

          {/* Related Links Footer inside the article card */}
          <div className="bg-slate-50/50 border-t border-slate-100 p-8 flex justify-center gap-6 text-sm">
            {navigation.footer.bottomLinks.slice(0, 4).map((link, idx) => (
              <Link key={idx} href={link.href} className="text-slate-500 hover:text-red-600 transition-colors font-medium">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Between Articles */}
        <div className="flex justify-between items-center px-4">
          <Link href="/news" className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-all font-medium group">
            <span className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-red-50 group-hover:border-red-200 transition-colors">
              <ChevronRight className="rotate-180" size={16} />
            </span>
            Quay lại Tin Tức
          </Link>
          <div className="flex gap-4">
            <p className="text-slate-400 text-sm">Bạn đang xem bài viết thuộc mục <strong>{article.category}</strong></p>
          </div>
        </div>

      </div>
    </section>
  );
}
