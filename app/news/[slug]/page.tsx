import Header from "../../../components/Header";
import ArticleDetail from "../../../components/ArticleDetail";
import { getArticleBySlug } from "../../../data/newsActivity";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main
      className="mx-auto"
      style={{ minWidth: "1920px", maxWidth: "1920px" }}
    >
      <Header />
      <Hero>
        <ArticleDetail article={article!} />
      </Hero>
    </main>
  );
}
