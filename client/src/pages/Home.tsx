import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Card, Spinner, EmptyState } from '@/components/ui';
import HeroSection from '@/components/HeroSection';
import ArticleCard from '@/components/ArticleCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadArticles, loadFeaturedArticle, loadPopularArticles } from '@/store/slices/articlesSlice';
import { loadCategories } from '@/store/slices/categoriesSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const { items, featured, popular, status } = useAppSelector((s) => s.articles);
  const { items: categories } = useAppSelector((s) => s.categories);

  useEffect(() => {
    dispatch(loadArticles({ limit: 6 }));
    dispatch(loadFeaturedArticle());
    dispatch(loadPopularArticles());
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <div className="min-h-screen" data-icod-id="src_pages_home_tsx_8314">
      <HeroSection data-icod-id="src_pages_home_tsx_9ea9" />
      {/* Featured Article */}
      {featured && (
        <section
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
          data-icod-id="src_pages_home_tsx_a376">
          <h2
            className="mb-8 text-2xl font-bold text-foreground"
            data-icod-id="src_pages_home_tsx_6420">Featured Article</h2>
          <Link to={`/blog/${featured.slug}`} data-icod-id="src_pages_home_tsx_89e1">
            <Card
              className="group overflow-hidden transition-shadow hover:shadow-md md:flex"
              data-icod-id="src_pages_home_tsx_736a">
              {featured.featuredImage && (
                <div
                  className="aspect-video w-full bg-muted md:w-1/2 lg:w-3/5"
                  data-icod-id="src_pages_home_tsx_0df8">
                  <img
                    src={featured.featuredImage}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    data-icod-id="src_pages_home_tsx_94d5" />
                </div>
              )}
              <div
                className="flex flex-col justify-center p-6 md:w-1/2 lg:w-2/5 lg:p-10"
                data-icod-id="src_pages_home_tsx_ca1f">
                <span
                  className="mb-2 inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  data-icod-id="src_pages_home_tsx_0321">
                  Featured
                </span>
                <h3
                  className="mb-3 text-2xl font-bold text-foreground group-hover:text-primary"
                  data-icod-id="src_pages_home_tsx_4046">
                  {featured.title}
                </h3>
                <p
                  className="mb-4 text-muted-foreground"
                  data-icod-id="src_pages_home_tsx_cdaa">{featured.excerpt}</p>
                <span
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary"
                  data-icod-id="src_pages_home_tsx_0d32">
                  Read More <ArrowRight className="h-3 w-3" data-icod-id="src_pages_home_tsx_b427" />
                </span>
              </div>
            </Card>
          </Link>
        </section>
      )}
      {/* Latest Posts */}
      <section
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        data-icod-id="src_pages_home_tsx_c81e">
        <div
          className="mb-8 flex items-center justify-between"
          data-icod-id="src_pages_home_tsx_528d">
          <h2
            className="text-2xl font-bold text-foreground"
            data-icod-id="src_pages_home_tsx_c976">Latest Posts</h2>
          <Link
            to="/blog"
            className="text-sm font-medium text-primary hover:underline"
            data-icod-id="src_pages_home_tsx_bb0e">
            View All &rarr;
          </Link>
        </div>
        {status === 'loading' ? (
          <div
            className="flex justify-center py-16"
            data-icod-id="src_pages_home_tsx_822b"><Spinner size="lg" data-icod-id="src_pages_home_tsx_96b8" /></div>
        ) : items.length === 0 ? (
          <EmptyState
            title="No articles yet"
            description="Check back soon for new content."
            data-icod-id="src_pages_home_tsx_eec0" />
        ) : (
          <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            data-icod-id="src_pages_home_tsx_f3c6">
            {items.map((article) => (
              <ArticleCard
                key={article._id}
                article={article}
                data-icod-id={`src_pages_home_tsx_75dd_${article._id}`} />
            ))}
          </div>
        )}
      </section>
      {/* Popular Articles */}
      {popular.length > 0 && (
        <section className="bg-muted/30 py-16" data-icod-id="src_pages_home_tsx_364e">
          <div
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
            data-icod-id="src_pages_home_tsx_e258">
            <div
              className="mb-8 flex items-center gap-2"
              data-icod-id="src_pages_home_tsx_e2fd">
              <TrendingUp className="h-5 w-5 text-primary" data-icod-id="src_pages_home_tsx_80a5" />
              <h2
                className="text-2xl font-bold text-foreground"
                data-icod-id="src_pages_home_tsx_8884">Popular Articles</h2>
            </div>
            <div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              data-icod-id="src_pages_home_tsx_5e65">
              {popular.slice(0, 3).map((article) => (
                <ArticleCard
                  key={article._id}
                  article={article}
                  data-icod-id={`src_pages_home_tsx_b2d0_${article._id}`} />
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Categories Showcase */}
      {categories.length > 0 && (
        <section
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
          data-icod-id="src_pages_home_tsx_2f5d">
          <h2
            className="mb-8 text-2xl font-bold text-foreground"
            data-icod-id="src_pages_home_tsx_bcff">Explore Categories</h2>
          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            data-icod-id="src_pages_home_tsx_7ff8">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/categories/${cat.slug}`}
                data-icod-id={`src_pages_home_tsx_fb83_${cat._id}`}>
                <Card
                  className="p-6 transition-all hover:border-primary/50 hover:shadow-md"
                  data-icod-id={`src_pages_home_tsx_98b1_${cat._id}`}>
                  <h3
                    className="mb-1 text-lg font-semibold text-foreground"
                    data-icod-id={`src_pages_home_tsx_67c5_${cat._id}`}>{cat.name}</h3>
                  <p
                    className="text-sm text-muted-foreground"
                    data-icod-id={`src_pages_home_tsx_1950_${cat._id}`}>{cat.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
      <NewsletterSignup data-icod-id="src_pages_home_tsx_b5f5" />
    </div>
  );
}
