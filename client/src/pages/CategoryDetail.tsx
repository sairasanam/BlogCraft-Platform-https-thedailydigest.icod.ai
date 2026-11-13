import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, EmptyState } from '@/components/ui';
import ArticleCard from '@/components/ArticleCard';
import { fetchCategoryBySlug } from '@/services/categoryService';
import { fetchArticles } from '@/services/articleService';
import type { Category, Article } from '@/types';

export default function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!slug) return;
      try {
        const catRes = await fetchCategoryBySlug(slug);
        if (catRes.success && catRes.data) {
          setCategory(catRes.data);
          const artRes = await fetchArticles({ category: catRes.data._id });
          if (artRes.success && artRes.data) setArticles(artRes.data.articles);
        }
      } catch { /* handled */ }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      data-icod-id="src_pages_categorydetail_tsx_f0ee"><Spinner size="lg" data-icod-id="src_pages_categorydetail_tsx_7220" /></div>
  );
  if (!category) return (
    <div
      className="flex min-h-[60vh] items-center justify-center text-muted-foreground"
      data-icod-id="src_pages_categorydetail_tsx_d5b3">Category not found</div>
  );

  return (
    <div
      className="min-h-screen bg-background"
      data-icod-id="src_pages_categorydetail_tsx_39b0">
      <div
        className="bg-muted/30 py-12"
        data-icod-id="src_pages_categorydetail_tsx_5692">
        <div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          data-icod-id="src_pages_categorydetail_tsx_7979">
          <h1
            className="mb-4 text-3xl font-bold text-foreground"
            data-icod-id="src_pages_categorydetail_tsx_abaa">{category.name}</h1>
          <p
            className="text-muted-foreground"
            data-icod-id="src_pages_categorydetail_tsx_ccfb">{category.description}</p>
        </div>
      </div>
      <div
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        data-icod-id="src_pages_categorydetail_tsx_e7f4">
        {articles.length === 0 ? (
          <EmptyState
            title="No articles in this category"
            description="Check back later for new content."
            data-icod-id="src_pages_categorydetail_tsx_97b7" />
        ) : (
          <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            data-icod-id="src_pages_categorydetail_tsx_d82c">
            {articles.map((article) => <ArticleCard
              key={article._id}
              article={article}
              data-icod-id={`src_pages_categorydetail_tsx_c6fb_${article._id}`} />)}
          </div>
        )}
      </div>
    </div>
  );
}
