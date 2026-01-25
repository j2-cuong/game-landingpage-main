import "./globals.css";
import { BackgroundMusic } from "@/components/BackgroundMusic";
import ChatContact from "@/components/ChatContact";

export const metadata = {
  title: "Kiếm Thế PC 2009 - Tái Hiện Huyền Thoại Kiếm Hiệp",
  description:
    "Trang chủ Kiếm Thế PC 2009. Tái hiện nguyên bản huyền thoại kiếm hiệp trên PC. Tải game ngay để trải nghiệm chiến trường Tống Kim rực lửa.",
  keywords:
    "Kiếm Thế 2009, Kiếm Thế PC, Kiếm Thế Private, tải game kiếm thế, kiếm hiệp, MMO, Tống Kim",
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
