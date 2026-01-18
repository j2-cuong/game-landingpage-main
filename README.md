# Kiếm Hiệp Thế Giới - Landing Page

Dự án landing page cho trò chơi **Kiếm Hiệp Thế Giới**, được xây dựng với hiệu năng cao, giao diện hiện đại và quản lý dữ liệu linh hoạt.

## 🚀 Công nghệ sử dụng

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://reactjs.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Music:** HTML5 Audio API với giao diện điều khiển tùy chỉnh
- **Slider:** [Swiper](https://swiperjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## 📂 Cấu trúc dự án

```text
root/
├── app/                  # Next.js App Router (Layouts & Pages)
│   ├── download/         # Trang tải game chuyên biệt
│   ├── news/             # Trung tâm tin tức
│   │   └── [slug]/       # Chi tiết bài viết (Dynamic Route)
│   ├── layout.tsx        # Root layout (TopBar, Footer, Music)
│   ├── page.tsx          # Trang chủ (Landing Page)
│   └── globals.css       # Styles toàn cục & Tailwind config
├── components/           # Các component UI tái sử dụng
│   ├── Hero.tsx          # Banner chính của trang
│   ├── NewsActivity.tsx  # Khu vực tin tức & hoạt động
│   ├── GameSection.tsx   # Giới thiệu môn phái & tính năng
│   ├── BackgroundMusic.tsx # Trình phát nhạc nền toàn cục
│   └── ...               # Các UI components khác
├── data/                 # Lớp quản lý dữ liệu (Modular JSON)
│   ├── *.json            # Dữ liệu nội dung (tin tức, hoạt động, môn phái...)
│   ├── newsActivity.ts   # Service xử lý logic dữ liệu tin tức
│   └── sects.ts          # Định nghĩa model & data môn phái
└── public/               # Tài nguyên tĩnh (Images, Videos, Music)
```

## 🗺️ Bản đồ Route (Route Map)

Dự án hiện có các đường dẫn (routes) sau:

| Route | File Path | Chức năng | Thành phần chính |
|-------|-----------|-----------|------------------|
| `/` | `app/page.tsx` | Trang chủ chính thức | `Hero`, `NewsActivitySection`, `GameSection`, `CooperativeMediaSection` |
| `/news` | `app/news/page.tsx` | Trung tâm tin tức | `Hero`, `NewsList` |
| `/news/[slug]` | `app/news/[slug]/page.tsx` | Chi tiết một bài viết | `ArticleDetail` |
| `/download` | `app/download/page.tsx` | Trang hướng dẫn tải game | `DownloadDetail` |

## ✨ Tính năng nổi bật

1.  **Quản lý dữ liệu tập trung:** Toàn bộ nội dung hiển thị (văn bản, link, ảnh) được tách biệt hoàn toàn vào thư mục `data/*.json`, giúp dễ dàng cập nhật mà không cần can thiệp vào code UI.
2.  **Nhạc nền (Background Music):** Trình phát nhạc nền tự động (khi có tương tác) với giao diện floating button mượt mà, hỗ trợ bật/tắt nhạc toàn trang.
3.  **Hiệu ứng Kiếm Hiệp:** Sử dụng font chữ phong cách kiếm hiệp kết hợp với hiệu ứng Hover/Animation từ Framer Motion tạo cảm giác nhập vai cao.
4.  **Tối ưu hóa SEO:** Đã cấu hình Meta Tags, Title động và cấu trúc HTML Semantic theo chuẩn SEO của Next.js.
5.  **Giao diện linh hoạt:** Thiết kế cố định (Fixed Width 1920px) cho trải nghiệm PC chuẩn xác, kết hợp các thành phần linh hoạt.

## 🛠 Hướng dẫn phát triển

### 1. Cài đặt

```bash
npm install
# hoặc
yarn install
```

### 2. Chạy môi trường Dev

```bash
npm run dev
```
Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

### 3. Cập nhật nội dung
Để thay đổi thông tin trên trang, hãy chỉnh sửa các file tương ứng trong thư mục `src/data/`:
- `navigation.json`: Header, Footer & TopBar links.
- `newsArticles.json`: Danh sách bài viết tin tức.
- `activities.json`: Các hoạt động đang diễn ra.
- `downloadInfo.json`: Thông tin các phiên bản tải về.

## 📝 Giấy phép
Bản quyền thuộc về đội ngũ phát triển dự án.
