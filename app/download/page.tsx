import Header from "../../components/Header";
import DownloadDetail from "../../components/DownloadDetail";
import Hero from "@/components/Hero";

// DownloadPage renders the download page with download detail component.
export default function DownloadPage() {
  return (
    <main
      className="mx-auto"
      style={{ minWidth: "1920px", maxWidth: "1920px" }}
    >
      <Header />
      <Hero>
        <DownloadDetail />
      </Hero>
    </main>
  );
}

