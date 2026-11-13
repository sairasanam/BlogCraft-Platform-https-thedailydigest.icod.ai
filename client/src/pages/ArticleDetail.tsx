import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Spinner, Card, Button } from '@/components/ui';
import ArticleCard from '@/components/ArticleCard';
import CommentSection from '@/components/CommentSection';
import { fetchArticleBySlug, fetchRelatedArticles } from '@/services/articleService';
import type { Article, Category } from '@/types';

function getCategoryObj(category: Category | string): Category | null {
  if (typeof category === 'string') return null;
  return category;
}

function estimateReadingTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function extractHeadings(html: string): { id: string; text: string; level: number }[] {
  const regex = /<h([23])\b[^>]*>(.*?)<\/h[23]>/gi;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]*>/g, '');
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    headings.push({ id, text, level: parseInt(match[1]) });
  }
  return headings;
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!slug) return;
      try {
        const res = await fetchArticleBySlug(slug);
        if (res.success && res.data) {
          setArticle(res.data);
          const cat = getCategoryObj(res.data.category);
          if (cat) {
            const relRes = await fetchRelatedArticles(cat._id, res.data._id);
            if (relRes.success && relRes.data) setRelated(relRes.data);
          }
        }
      } catch { /* handled by UI */ }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      data-icod-id="src_pages_articledetail_tsx_8d02"><Spinner size="lg" data-icod-id="src_pages_articledetail_tsx_8457" /></div>
  );
  if (!article) return (
    <div
      className="flex min-h-[60vh] items-center justify-center text-muted-foreground"
      data-icod-id="src_pages_articledetail_tsx_ba62">Article not found</div>
  );

  const cat = getCategoryObj(article.category);
  const readingTime = estimateReadingTime(article.content);
  const dateStr = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
  const headings = extractHeadings(article.content);

  // Add IDs to headings in content
  let processedContent = article.content;
  headings.forEach((h) => {
    processedContent = processedContent.replace(
      new RegExp(`(<h${h.level}\\b[^>]*>)(${h.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i'),
      `$1<span id="${h.id}"></span>$2`,
    );
  });

  return (
    <article
      className="min-h-screen bg-background"
      data-icod-id="src_pages_articledetail_tsx_a5b1">
      {/* Hero Image */}
      {article.featuredImage && (
        <div
          className="h-64 w-full bg-muted sm:h-80 lg:h-96"
          data-icod-id="src_pages_articledetail_tsx_8e07">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="h-full w-full object-cover"
            data-icod-id="src_pages_articledetail_tsx_74d7" />
        </div>
      )}
      <div
        className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8"
        data-icod-id="src_pages_articledetail_tsx_60ac">
        {/* Meta */}
        <div
          className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
          data-icod-id="src_pages_articledetail_tsx_9b50">
          {cat && (
            <Link
              to={`/categories/${cat.slug}`}
              className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary hover:bg-primary/20"
              data-icod-id="src_pages_articledetail_tsx_6a31">
              {cat.name}
            </Link>
          )}
          <span
            className="flex items-center gap-1"
            data-icod-id="src_pages_articledetail_tsx_c011"><Calendar className="h-3.5 w-3.5" data-icod-id="src_pages_articledetail_tsx_32d0" /> {dateStr}</span>
          <span
            className="flex items-center gap-1"
            data-icod-id="src_pages_articledetail_tsx_7f0e"><Clock className="h-3.5 w-3.5" data-icod-id="src_pages_articledetail_tsx_9a4a" /> {readingTime} min read</span>
          <span
            className="flex items-center gap-1"
            data-icod-id="src_pages_articledetail_tsx_7613"><User className="h-3.5 w-3.5" data-icod-id="src_pages_articledetail_tsx_525e" /> {article.author}</span>
        </div>

        {/* Title */}
        <h1
          className="mb-8 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl"
          data-icod-id="src_pages_articledetail_tsx_19bf">
          {article.title}
        </h1>

        <div
          className="flex gap-8 lg:gap-12"
          data-icod-id="src_pages_articledetail_tsx_8e3c">
          {/* Table of Contents (sidebar) */}
          {headings.length > 2 && (
            <aside
              className="hidden w-56 shrink-0 lg:block"
              data-icod-id="src_pages_articledetail_tsx_16be">
              <nav className="sticky top-24" data-icod-id="src_pages_articledetail_tsx_ae36">
                <h4
                  className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  data-icod-id="src_pages_articledetail_tsx_a677">Table of Contents</h4>
                <ul
                  className="space-y-2 border-l-2 border-border pl-4"
                  data-icod-id="src_pages_articledetail_tsx_d6c6">
                  {headings.map((h, i) => (
                    <li
                      key={i}
                      className={h.level === 3 ? 'pl-3' : ''}
                      data-icod-id={`src_pages_articledetail_tsx_d3b0_${i}`}>
                      <a
                        href={`#${h.id}`}
                        className="block text-sm text-muted-foreground hover:text-primary"
                        data-icod-id={`src_pages_articledetail_tsx_b5df_${i}`}>
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

          {/* Content */}
          <div
            className="min-w-0 flex-1"
            data-icod-id="src_pages_articledetail_tsx_764d">
            <div
              className="prose prose-slate max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: processedContent }}
              data-icod-id="src_pages_articledetail_tsx_b501" />

            {/* Social sharing */}
            <div
              className="mt-10 flex items-center gap-3 border-t border-border pt-6"
              data-icod-id="src_pages_articledetail_tsx_c1f9">
              <span
                className="text-sm font-medium text-foreground"
                data-icod-id="src_pages_articledetail_tsx_49c4">Share this article:</span>
              <Button
                variant="outline"
                size="sm"
                aria-label="Share on Twitter"
                data-icod-id="src_pages_articledetail_tsx_9c96">
                <Share2 className="mr-1 h-3 w-3" data-icod-id="src_pages_articledetail_tsx_3ba0" /> Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                aria-label="Share on Facebook"
                data-icod-id="src_pages_articledetail_tsx_21f1">
                <Share2 className="mr-1 h-3 w-3" data-icod-id="src_pages_articledetail_tsx_d202" /> Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                aria-label="Share on LinkedIn"
                data-icod-id="src_pages_articledetail_tsx_0fc2">
                <Share2 className="mr-1 h-3 w-3" data-icod-id="src_pages_articledetail_tsx_06de" /> LinkedIn
              </Button>
            </div>

            {/* Related Articles */}
            {related.length > 0 && (
              <section className="mt-12" data-icod-id="src_pages_articledetail_tsx_55f0">
                <h3
                  className="mb-6 text-xl font-bold text-foreground"
                  data-icod-id="src_pages_articledetail_tsx_41ba">Related Articles</h3>
                <div
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  data-icod-id="src_pages_articledetail_tsx_f1ec">
                  {related.map((a) => <ArticleCard
                    key={a._id}
                    article={a}
                    data-icod-id={`src_pages_articledetail_tsx_fce0_${a._id}`} />)}
                </div>
              </section>
            )}

            {/* Comments */}
            <CommentSection articleId={article._id} data-icod-id="src_pages_articledetail_tsx_f12a" />
          </div>
        </div>
      </div>
    </article>
  );
}
