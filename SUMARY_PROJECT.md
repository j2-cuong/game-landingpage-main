# Dự án Kiếm Hiệp Thế Giới - Landing Page

## Tổng quan dự án
- **Mục tiêu:** Xây dựng landing page chuyên nghiệp cho game Kiếm Hiệp Thế Giới.
- **Công nghệ:** Next.js 15, React 19, Tailwind CSS 4, Lucide React, Framer Motion.
- **Đặc điểm:** Giao diện đậm chất kiếm hiệp, tối ưu hiệu năng và SEO.

## Cập nhật gần đây (25/01/2026) - HOÀN THÀNH
- **Responsive Mobile:** 
    - [x] Loại bỏ kích thước cố định 1890px để hỗ trợ đa thiết bị.
    - [x] Header: Logo căn giữa và menu toggle trên mobile - DONE: Logo to hơn, ẩn BG mobile, luôn hiện icon Menu.
    - [x] Các components (NewsCard, NewsTabs, BgMusic, ChatContact, CoopMedia, QuickAction): Responsive hoàn chỉnh.
    - [x] Hero: Hiển thị ảnh nền riêng cho mobile (`hero-bg-mb.jpeg`) và điều chỉnh spacing (`pt-450px`).
    - [x] News & Activity: Chuyển sang layout full width trên mobile (stack vertically).
    - [x] Quick Actions: Chuyển thành dạng fixed toggle (nút nổi) trên mobile.
    - [x] Các trang con (Tin tức, Chi tiết, Tải game): Loại bỏ giới hạn width và tối ưu padding mobile.

## Cấu trúc thư mục chính
- `app/`: Chứa các trang và layout (Next.js App Router).
- `components/`: Các thành phần UI tái sử dụng.
- `data/`: Dữ liệu JSON cho nội dung trang web.
- `public/`: Assets tĩnh (hình ảnh, font, nhạc).
