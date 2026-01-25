import Header from "../components/Header";
import Hero from "../components/Hero";
import NewsActivitySection from "../components/NewsActivitySection";

// Home renders the main landing page with hero and game showcase.
export default function Home() {
  return (
    <main className="mx-auto w-full overflow-x-hidden">
      <Header />
      <Hero>
        <NewsActivitySection />
      </Hero>
    </main>
  );
}
