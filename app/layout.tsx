import "./globals.css";
import Footer from "@/components/Footer";
import { BackgroundMusic } from "@/components/BackgroundMusic";
import ChatContact from "@/components/ChatContact";

export const metadata = {
  title: "Kiếm Hiệp Thế Giới - Đại cập nhật Nhật Nguyệt Tranh Phong",
  description:
    "Trang chủ Kiếm Hiệp Thế Giới với đại cập nhật Nhật Nguyệt Tranh Phong. Khám phá giang hồ, tải game và tham gia cộng đồng người chơi đông đảo.",
  keywords:
    "Kiếm Hiệp Thế Giới, Nhật Nguyệt Tranh Phong, kiếm hiệp, MMO, tải game, sự kiện",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#dd201e" />
      </head>
      <body className="bg-[#ecede9] text-gray-900">
        <div className="relative">{children}</div>
        <ChatContact />
        <BackgroundMusic />
      </body>
    </html>
  );
}
