import Header from "../../components/Header";
import DownloadDetail from "../../components/DownloadDetail";
import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tải Game Kiếm Thế PC 2009 - Client Chính Thức",
  description: "Tải xuống bộ cài Kiếm Thế PC 2009 bản đầy đủ hoặc bản rút gọn. Hướng dẫn cài đặt chi tiết để tham gia thế giới kiếm hiệp ngay.",
};

// DownloadPage renders the download page with download detail component.
export default function DownloadPage() {
  return (
    <main
      className="mx-auto"
      style={{ minWidth: "1890px", maxWidth: "1890px" }}
    >
      <Header />
      <Hero>
        <DownloadDetail />
      </Hero>
    </main>
  );
}
