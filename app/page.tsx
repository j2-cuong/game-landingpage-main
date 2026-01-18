
import GameSection from '../components/GameSection';
import Header from '../components/Header';
import Hero from '../components/Hero';
import NewsActivitySection from '../components/NewsActivitySection';
import CooperativeMediaSection from '../components/CooperativeMediaSection';

// Home renders the main landing page with hero and game showcase.
export default function Home() {
  return (
    <main
      className="mx-auto"
      style={{ minWidth: '1920px', maxWidth: '1920px' }}
    >
      <Header />
      <Hero>
        <NewsActivitySection />
      </Hero>
      <GameSection />
      <CooperativeMediaSection />
    </main>
  );
}
