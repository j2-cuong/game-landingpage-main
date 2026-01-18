import Header from '../../components/Header';
import Hero from '../../components/Hero';
import NewsList from '../../components/NewsList';

// NewsPage renders the news center view inside the hero layout wrapper.
export default function NewsPage() {
  return (
    <main
      className="mx-auto"
      style={{ minWidth: '1920px', maxWidth: '1920px' }}
    >
      <Header />
      <Hero>
        <NewsList />
      </Hero>
    </main>
  );
}

