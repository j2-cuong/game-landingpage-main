import Header from "../../components/Header";
import Hero from "../../components/Hero";
import NewsList from "../../components/NewsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin Tức Kiếm Thế PC 2009 - Cập Nhật Mới Nhất",
  description: "Cập nhật tin tức, sự kiện, thông báo bảo trì và các tính năng mới nhất của Kiếm Thế PC 2009. Đừng bỏ lỡ các ưu đãi hấp dẫn.",
};

export default function NewsPage() {
  return (
    <main
      className="mx-auto"
      style={{ minWidth: "1890px", maxWidth: "1890px" }}
    >
      <Header />
      <Hero>
        <NewsList />
      </Hero>
    </main>
  );
}
