import Header from "@/components/Header";
import ArticleDetail from "@/components/ArticleDetail";
import { getArticleBySlug } from "@/data/services/articles";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Bài viết không tồn tại - Kiếm Thế PC 2009",
    };
  }

  return {
    title: `${article.title} - Kiếm Thế PC 2009`,
    description: article.summary || `Chi tiết bài viết ${article.title}`,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: article.cover ? [article.cover] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main
      className="mx-auto"
      style={{ minWidth: "1890px", maxWidth: "1890px" }}
    >
      <Header />
      <Hero>
        <ArticleDetail article={article} />
      </Hero>
    </main>
  );
}
