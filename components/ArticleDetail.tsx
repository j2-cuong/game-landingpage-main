import Link from "next/link";
import { Download, ChevronDown, Headphones, Phone, Clock } from "lucide-react";
import { type ArticleItem } from "../data/newsActivity";
import newsConfig from "../data/newsConfig.json";
import navigation from "../data/navigation.json";

interface ArticleDetailProps {
  article: ArticleItem;
}

// ArticleDetail renders the full content of a news article.
export default function ArticleDetail({ article }: ArticleDetailProps) {
  const publishedAt = article.createdAt || `${article.date} 00:00:00`;

  return (
    <section className="w-full flex justify-center bg-white py-10">
      <div className="w-[1200px] bg-white">
        <div className="grid grid-cols-[280px_1fr] gap-6">
          {/* Left Sidebar */}
          <aside className="flex flex-col gap-4">
            {/* Download Button */}
            <button className="w-full bg-gradient-to-b from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold py-3 px-4 rounded flex flex-col items-center justify-center gap-1 transition-all shadow-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Download size={24} className="mb-1" />
              <span className="text-base font-bold">Tải Game</span>
            </button>

            {/* Register and Top-up Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-gradient-to-b from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium py-2.5 px-3 rounded text-sm transition-all shadow-sm">
                Đăng Ký Nhận Quà
              </button>
              <button className="bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 px-3 rounded text-sm transition-all shadow-sm">
                Trung Tâm Nạp Tiền
              </button>
            </div>

            {/* Promotional Banners */}
            {newsConfig.sidebar.promotions.map((promo, idx) => (
              <div key={idx} className="relative rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow group">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <p className="text-xs font-medium mb-1">{promo.title}</p>
                  <p className="text-[10px] text-white/90">{promo.subtitle}</p>
                </div>
              </div>
            ))}

            {/* QR Codes Section */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                <div className="flex items-center gap-1 mb-2">
                  <div className="w-8 h-4 bg-gray-300 rounded text-[8px] text-gray-600 flex items-center justify-center">
                    Quét Mã
                  </div>
                </div>
                <div className="bg-white p-1.5 rounded border border-gray-200 mb-1.5">
                  <div className="w-full aspect-square bg-gray-100 rounded flex items-center justify-center relative">
                    <span className="text-[8px] text-gray-400">QR Code</span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-700 text-center font-medium">Kiếm Hiệp Thế Giới</p>
                <p className="text-[9px] text-gray-500 text-center">Trợ Lý</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                <div className="flex items-center gap-1 mb-2">
                  <div className="w-8 h-4 bg-gray-300 rounded text-[8px] text-gray-600 flex items-center justify-center">
                    Quét Mã
                  </div>
                </div>
                <div className="bg-white p-1.5 rounded border border-gray-200 mb-1.5">
                  <div className="w-full aspect-square bg-gray-100 rounded flex items-center justify-center relative">
                    <span className="text-[8px] text-gray-400">QR Code</span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-700 text-center font-medium">Kiếm Hiệp Thế Giới</p>
                <p className="text-[9px] text-gray-500 text-center">Game PC</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 mt-2">
              <div className="flex items-start gap-2 mb-2">
                <Phone size={14} className="text-gray-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-0.5">Hotline hỗ trợ:</p>
                  <p className="text-xs font-semibold text-gray-900">{newsConfig.sidebar.contact.hotline}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-gray-200">
                <Clock size={14} className="text-gray-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-0.5">Thời gian bảo trì:</p>
                  <p className="text-xs font-semibold text-gray-900">{newsConfig.sidebar.contact.maintenance}</p>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-500 pt-2 border-t border-gray-200">
              {navigation.footer.bottomLinks.map((link, idx) => (
                <Link key={idx} href={link.href} className="hover:text-red-600 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex flex-col">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 mb-4 gap-1">
              <Link href="/" className="hover:text-red-600">
                Trang chủ
              </Link>
              <span className="text-gray-400">›</span>
              <Link href="/news" className="hover:text-red-600">
                Tin tức
              </Link>
              <span className="text-gray-400">›</span>
              <span className="text-gray-700">{article.category}</span>
              <span className="text-gray-400">›</span>
              <span className="text-gray-900 truncate">{article.title}</span>
            </div>

            {/* Title + meta */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
              {article.title}
            </h1>
            <div className="text-xs text-gray-500 mb-6">
              {publishedAt}
            </div>

            {/* Cover */}
            {article.cover && (
              <div className="mb-8">
                <img
                  src={article.cover}
                  alt={article.title}
                  className="w-full h-auto rounded shadow-sm"
                />
              </div>
            )}

            {/* Body */}
            <div className="prose prose-lg max-w-none text-gray-800">
              <div className="article-content space-y-4">
                <p className="mb-4">
                  Kính gửi <strong>Đại Hiệp</strong>:
                </p>
                <p className="mb-4 indent-8">
                  Để đảm bảo máy chủ hoạt động ổn định và chất lượng dịch vụ, tất cả các máy chủ sẽ tiến hành <strong>bảo trì phiên bản toàn bộ khu vực và máy chủ vào Thứ Ba, ngày 9 tháng 12 lúc 07:30</strong>, dự kiến bảo trì xong lúc <strong>10:30</strong>. Trong thời gian bảo trì máy chủ, tất cả các hoạt động trong game sẽ tạm dừng.
                </p>
                <p className="mb-4 indent-8">
                  Số phiên bản client sau khi cập nhật: 2.646
                </p>

                <div className="my-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    【Đại Lễ Hội Cuối Năm Sôi Động Khai Mở!】
                  </h2>
                  <p className="mb-4 indent-4">
                    Chào đón năm mới, tạm biệt năm cũ. Sau khi bảo trì ngày 9 tháng 12 kết thúc, chúng ta sẽ chào đón Đại Lễ Hội Cuối Năm thường niên! Các hoạt động hấp dẫn như <strong>Cá Chép Hiện Thế</strong>, <strong>Bằng Hữu Quay Về</strong> và <strong>Nghê Thường Khởi Mộng</strong> đang chờ đón sự tham gia của quý vị Đại Hiệp!
                  </p>
                  <p className="mb-4">
                    → Chi tiết hoạt động Đại Lễ Hội Cuối Năm đã được đăng tải trên trang chủ, Đại Hiệp có thể nhấp vào đây để xem:{" "}
                    <a
                      href="https://jxsj.xoyo.com/show-3415-11838-1.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 underline"
                    >
                      年终盛典活动详情
                    </a>
                  </p>
                  <div className="my-6">
                    <img
                      src="https://static-kefu.xoyo.com/kefu_xoyo/ue/20251205181045_7398_image - 2025-12-05T180707.020.png"
                      alt="Đại Lễ Hội Cuối Năm"
                      className="w-full h-auto rounded-lg shadow-sm"
                    />
                  </div>
                </div>

                <div className="my-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    1、Cá Chép Hiện Thế, Phúc Lợi Tràn Đầy
                  </h3>
                  <p className="mb-2 indent-4">
                    Thời gian hoạt động: Sau khi bảo trì ngày 9 tháng 12 kết thúc - 21:00 ngày 23 tháng 12
                  </p>
                  <p className="mb-4 indent-4">
                    Lễ hội nâng cấp, phúc lợi tối đa! Đại Hiệp nhận gói quà miễn phí hàng ngày, mua gói <strong>Trân Châu Bối</strong> siêu giá trị, sẽ có cơ hội nhận được phúc lợi miễn phí hóa đơn! Hơn nữa còn có thể tham gia rút thăm trúng thưởng <strong>một năm Lương Phiếu Kiếm Thế, danh hiệu giới hạn và dây chuyền ngọc trai vàng Chow Tai Fook</strong>!
                  </p>
                  <div className="my-6">
                    <img
                      src="https://static-kefu.xoyo.com/kefu_xoyo/ue/20251205181117_3194_image - 2025-12-05T180715.703.png"
                      alt="Cá Chép Hiện Thế"
                      className="w-full h-auto rounded-lg shadow-sm"
                    />
                  </div>
                </div>

                <div className="my-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    2、Bằng Hữu Quay Về, Tái Nối Duyên Xưa
                  </h3>
                  <p className="mb-2 indent-4">
                    Thời gian hoạt động: Sau khi bảo trì ngày 9 tháng 12 kết thúc - Ngày 9 tháng 1 năm sau
                  </p>
                  <p className="mb-4 indent-4">
                    Mời bằng hữu quay về, sẽ có cơ hội nhận được số lượng lớn <strong>Kim Khóa, Ngân Khóa, Trân Châu Bối và Đá Hồn Ngũ Hành</strong>! Đồng thời, đảm nhận vai trò đội trưởng dẫn dắt Đại Hiệp tái xuất giang hồ tham gia hoạt động, sẽ có cơ hội nhận thêm <strong>Gói Quà Đội Trưởng</strong>!
                  </p>
                </div>

                <div className="my-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    3、Trang Phục Tinh Xảo, Giới Hạn Trở Lại
                  </h3>
                  <p className="mb-2 indent-4">
                    Thời gian hoạt động cầu nguyện: Sau khi bảo trì ngày 9 tháng 12 kết thúc - 23:59 ngày 16 tháng 12
                  </p>
                  <p className="mb-4 indent-4">
                    Cuồng hoan cuối năm, trang phục tinh xảo giới hạn trở lại! Lần này không chỉ có cơ hội nhận được <strong>Thời trang hiếm</strong>, mà còn có cơ hội nhận được <strong>Trang phục thú cưỡi hiếm</strong>!
                  </p>
                  <div className="my-6 space-y-4">
                    <img
                      src="https://static-kefu.xoyo.com/kefu_xoyo/ue/20251205181135_2067_image - 2025-12-05T180720.861.png"
                      alt="Trang Phục Tinh Xảo 1"
                      className="w-full h-auto rounded-lg shadow-sm"
                    />
                    <img
                      src="https://static-kefu.xoyo.com/kefu_xoyo/ue/20251205181148_7075_image - 2025-12-05T180725.500.png"
                      alt="Trang Phục Tinh Xảo 2"
                      className="w-full h-auto rounded-lg shadow-sm"
                    />
                  </div>
                </div>

                <div className="my-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    【Cập Nhật Nội Dung】
                  </h2>

                  <div className="my-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      1、Trang Bị Đồng Hành
                    </h3>
                    <p className="mb-4 indent-4">
                      Sau bản cập nhật này, chúng tôi sẽ điều chỉnh các nội dung liên quan đến trang bị đồng hành như sau:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mb-4 indent-4">
                      <li>
                        Thời gian đổi <strong>Mặt Dây Đồng Hành</strong> được điều chỉnh từ mở sau 120 ngày mở server thành mở ngay sau <strong>90 ngày</strong> mở server.
                      </li>
                      <li>
                        Thời gian đổi <strong>Phù Hộ Thân Đồng Hành</strong> được điều chỉnh từ mở sau 150 ngày mở server thành mở ngay sau <strong>90 ngày</strong> mở server.
                      </li>
                      <li>
                        Tùy chọn tại NPC <strong>Dung Chú</strong> ở Phượng Tường Phủ đã được <strong>tích hợp và tối ưu hóa</strong>: Các tùy chọn ban đầu như "Xin hủy liên kết trang bị đồng hành" và "Hủy liên kết trang bị đồng hành" đã được chuyển đến mục "Thao tác liên quan đến trang bị đồng hành". Đồng thời, khi server mở được <strong>90 ngày</strong>, tùy chọn đổi Mặt Dây Đồng Hành và Phù Hộ Thân Đồng Hành sẽ được mở.
                      </li>
                    </ul>
                    <p className="mb-4 indent-4">
                      Các máy chủ khác nhau có thể có sự khác biệt về thời gian mở chức năng, Đại Hiệp vui lòng xem thông báo mở chức năng/nội dung liên quan của máy chủ mình tại <strong>Tuế Nguyệt Canh Điệt</strong>.
                    </p>
                    <div className="my-6">
                      <img
                        src="https://static-kefu.xoyo.com/kefu_xoyo/ue/20251205181210_8703_image - 2025-12-05T180731.570.png"
                        alt="Trang Bị Đồng Hành"
                        className="w-full h-auto rounded-lg shadow-sm"
                      />
                    </div>
                    <p className="mb-4 indent-4">
                      （4）Khi nhấp chuột phải để sử dụng <strong>Thiên Tàm Tơ (Cấp 1)</strong>, đã thêm tùy chọn: <strong>Đổi Tinh Thể Trang Bị Đồng Hành</strong>.
                    </p>
                  </div>

                  <div className="my-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      2、Phần Thưởng Quay Về Tái Xuất Giang Hồ
                    </h3>
                    <p className="mb-4 indent-4">
                      Sau bản cập nhật này, chúng tôi sẽ nâng cấp và tối ưu hóa phần thưởng quay về, hiện tại người chơi quay về sẽ có cơ hội nhận được nhiều phần thưởng hơn! Điều chỉnh cụ thể như sau:
                    </p>
                    <p className="mb-4 indent-4">
                      Đại Hiệp quay về thỏa mãn các điều kiện: thời gian mở server ≥ 30 ngày, đã gia nhập môn phái và cấp độ nhân vật ≥ 60, chưa đăng nhập liên tục ≥ 14 ngày, và cách lần kích hoạt Tái Xuất Giang Hồ gần nhất ≥ 30 ngày, khi đăng nhập nhân vật thỏa mãn điều kiện trên sẽ kích hoạt hoạt động <strong>Tái Xuất Giang Hồ</strong>.
                    </p>

                    <div className="my-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        （1）Tối ưu hóa giao diện tinh gọn
                      </h4>
                      <p className="mb-4 indent-4">
                        Nội dung phần thưởng Tái Xuất Giang Hồ chủ yếu được <strong>tinh giản và tích hợp thành ba phần</strong>: Đăng nhập 7 ngày, Giang Hồ Chinh Chiến Lệnh và Cửa Hàng Quay Về.
                      </p>
                    </div>

                    <div className="my-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        （2）Đăng nhập 7 ngày, thêm phần thưởng!
                      </h4>
                      <p className="mb-2 indent-4">
                        So với trước đây, Đại Hiệp quay về đăng nhập game mỗi ngày đều có thể nhận được <strong>số lượng lớn Phong Vân Tệ, Cống Hiến Gia Tộc, Kim Khóa, Ngân Khóa và Trân Châu Bối</strong>, có thể nhận tổng cộng 7 ngày!
                      </p>
                      <p className="mb-4 indent-4">
                        Tổng cộng 7 ngày đăng nhập tích lũy có thể nhận được: <strong>96011 Phong Vân Tệ, 191151 Cống Hiến Gia Tộc, 21429 Kim Khóa, 549360 Ngân Khóa, 48292 Trân Châu Bối!</strong>
                      </p>
                      <div className="my-6">
                        <img
                          src="https://static-kefu.xoyo.com/kefu_xoyo/ue/20251205181257_7017_image - 2025-12-05T180736.043.png"
                          alt="Phần Thưởng Đăng Nhập"
                          className="w-full h-auto rounded-lg shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="my-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        （3）Hoạt động Giang Hồ Chinh Chiến Lệnh tinh giản!
                      </h4>
                      <p className="mb-2 indent-4">
                        Hiện tại Đại Hiệp quay về chỉ cần tham gia <strong>Tiêu Dao Cốc, Quân Doanh, Lệnh Truy Nã Quan Phủ Mới, Tàng Bảo Đồ, Thừa Thiên Tháp, Tranh Đoạt Lãnh Thổ, Tống Kim Chiến Trường, Thần Binh Chiến Trường, Bạch Hổ Đường, Thái Hư Huyễn Cảnh, Anh Hùng Thách Đấu, Tần Thủy Hoàng Lăng, Vân Đỉnh Chi Chiến, Mộng Cảnh Bang Hội</strong> và <strong>Bang Hội Cạnh Võ</strong> là có thể nhận được số lượng lớn Phong Vân Tệ!
                      </p>
                      <p className="mb-4 indent-4 text-sm text-gray-600 italic">
                        *Lưu ý: Các hoạt động thuộc Giang Hồ Chinh Chiến Lệnh của mỗi máy chủ sẽ khác nhau tùy thuộc vào thời gian mở máy chủ hiện tại, Đại Hiệp vui lòng xem hoạt động được hiển thị trong Giang Hồ Chinh Chiến Lệnh trong game. Đồng thời, có thể truy cập <strong>Kiếm Hiệp Lịch - Tuế Nguyệt Canh Điệt</strong> để biết thời gian mở các hoạt động của máy chủ hiện tại.
                      </p>
                      <div className="my-6">
                        <img
                          src="https://static-kefu.xoyo.com/kefu_xoyo/ue/20251205181319_6074_image - 2025-12-05T180740.207.png"
                          alt="Giang Hồ Chinh Chiến Lệnh"
                          className="w-full h-auto rounded-lg shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="my-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        （4）Cửa Hàng Quay Về
                      </h4>
                      <p className="mb-2 indent-4">
                        Cửa Hàng Quay Về bao gồm Cửa Hàng Thẻ Tháng (cần mua Thẻ Tháng và trong thời gian Thẻ Tháng có hiệu lực), Cửa Hàng Trân Châu Bối và Cửa Hàng Phong Vân Tệ. So với trước đây, số lượng phần thưởng có thể đổi trong Cửa Hàng Thẻ Tháng và Trân Châu Bối đã tăng đáng kể!
                      </p>
                      <p className="mb-4 indent-4 text-sm text-gray-600 italic">
                        *Lưu ý: Nội dung phần thưởng có thể đổi trong Cửa Hàng Quay Về của mỗi máy chủ sẽ khác nhau tùy thuộc vào nội dung hiện tại của máy chủ đó, Đại Hiệp vui lòng xem nội dung có thể đổi trong Cửa Hàng Quay Về trong game. Đồng thời, có thể truy cập <strong>Kiếm Hiệp Lịch - Tuế Nguyệt Canh Điệt</strong> để biết giai đoạn mở các chức năng của máy chủ hiện tại.
                      </p>
                      <div className="my-6 space-y-4">
                        <img
                          src="https://static-kefu.xoyo.com/kefu_xoyo/ue/20251205181338_7611_image - 2025-12-05T180744.047.png"
                          alt="Cửa Hàng Quay Về 1"
                          className="w-full h-auto rounded-lg shadow-sm"
                        />
                        <img
                          src="https://static-kefu.xoyo.com/kefu_xoyo/ue/20251205181405_5520_image - 2025-12-05T180747.680.png"
                          alt="Cửa Hàng Quay Về 2"
                          className="w-full h-auto rounded-lg shadow-sm"
                        />
                        <img
                          src="https://static-kefu.xoyo.com/kefu_xoyo/ue/20251205181420_9446_image - 2025-12-05T180751.737.png"
                          alt="Cửa Hàng Quay Về 3"
                          className="w-full h-auto rounded-lg shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="my-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      3、Phụ bản Cổ Thành Lâu Lan
                    </h3>
                    <p className="mb-4 indent-4">
                      Sau bản cập nhật này, khi Đại Hiệp vượt qua phụ bản <strong>Cổ Thành Lâu Lan</strong>, ngay cả khi đội giải tán, vẫn có thể nói chuyện với <strong>Thẩm Hà Diệp</strong> để rời khỏi phụ bản.
                    </p>
                  </div>

                  <div className="my-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      4、Hoạt động hàng tháng - Người Tuyết Vui Vẻ
                    </h3>
                    <p className="mb-4 indent-4">
                      Sau bản cập nhật này, NPC <strong>Siêu Người Tuyết</strong> của hoạt động hàng tháng - Người Tuyết Vui Vẻ, trong mục nhận thưởng tích điểm đã thêm tùy chọn "<strong>Nhận một lần</strong>".
                    </p>
                    <div className="my-6">
                      <img
                        src="https://static-kefu.xoyo.com/kefu_xoyo/ue/20251205181444_6812_image - 2025-12-05T180757.950.png"
                        alt="Người Tuyết Vui Vẻ"
                        className="w-full h-auto rounded-lg shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="my-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      5、Độ mạnh BOSS
                    </h3>
                    <p className="mb-4 indent-4">
                      Sau bản cập nhật này, sẽ có sự điều chỉnh thích hợp đối với độ mạnh của <strong>BOSS Võ Lâm Cao Thủ</strong> ở máy chủ <strong>Long Chiến Vu Dã</strong>, để phù hợp hơn với nhịp độ game hiện tại.
                    </p>
                  </div>
                </div>

                <div className="my-8 pt-6 border-t border-gray-200">
                  <p className="mb-4 indent-4 italic text-gray-700">
                    Giang hồ dù xa, có bạn không cô độc; đao kiếm vô tình, vì yêu mà vô úy. Hồi tưởng giang hồ kinh điển, tái tạo truyền kỳ võ lâm, <strong>《Kiếm Hiệp Thế Giới》</strong> mở ra cuộc đời mới của bạn.
                  </p>
                  <p className="text-right text-gray-600">
                    Đội ngũ vận hành 【Kiếm Hiệp Thế Giới】
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

