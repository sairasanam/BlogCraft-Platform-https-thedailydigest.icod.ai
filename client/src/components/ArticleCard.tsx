import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import type { Article, Category } from '@/types';

interface ArticleCardProps {
  article: Article;
  className?: string;
}

function getCategoryName(category: Category | string): string {
  if (typeof category === 'string') return category;
  return category.name;
}

function getCategorySlug(category: Category | string): string {
  if (typeof category === 'string') return '';
  return category.slug;
}

function estimateReadingTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function ArticleCard({ article, className }: ArticleCardProps) {
  const readingTime = estimateReadingTime(article.content);
  const dateStr = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <Card
      className={`group flex flex-col overflow-hidden transition-all hover:shadow-md ${className || ''}`}
      data-icod-id="src_components_articlecard_tsx_f81c">
      {article.featuredImage && (
        <div
          className="aspect-video overflow-hidden bg-muted"
          data-icod-id="src_components_articlecard_tsx_4508">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            data-icod-id="src_components_articlecard_tsx_dbca" />
        </div>
      )}
      <div
        className="flex flex-1 flex-col p-5"
        data-icod-id="src_components_articlecard_tsx_b16b">
        <div
          className="mb-3 flex items-center gap-3 text-xs text-muted-foreground"
          data-icod-id="src_components_articlecard_tsx_1dd7">
          {getCategorySlug(article.category) && (
            <Link
              to={`/categories/${getCategorySlug(article.category)}`}
              className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary hover:bg-primary/20"
              data-icod-id="src_components_articlecard_tsx_9cef">
              {getCategoryName(article.category)}
            </Link>
          )}
          {dateStr && (
            <span
              className="flex items-center gap-1"
              data-icod-id="src_components_articlecard_tsx_62e3">
              <Calendar className="h-3 w-3" data-icod-id="src_components_articlecard_tsx_3fe9" />
              {dateStr}
            </span>
          )}
          <span
            className="flex items-center gap-1"
            data-icod-id="src_components_articlecard_tsx_c4b9">
            <Clock className="h-3 w-3" data-icod-id="src_components_articlecard_tsx_af8a" />
            {readingTime} min read
          </span>
        </div>
        <h3
          className="mb-2 text-lg font-semibold leading-snug text-foreground group-hover:text-primary"
          data-icod-id="src_components_articlecard_tsx_0ccc">
          <Link
            to={`/blog/${article.slug}`}
            data-icod-id="src_components_articlecard_tsx_d5c8">{article.title}</Link>
        </h3>
        <p
          className="mb-4 line-clamp-3 flex-1 text-sm text-muted-foreground"
          data-icod-id="src_components_articlecard_tsx_bbf7">
          {article.excerpt}
        </p>
        <Link
          to={`/blog/${article.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          data-icod-id="src_components_articlecard_tsx_9174">
          Read More <ArrowRight className="h-3 w-3" data-icod-id="src_components_articlecard_tsx_4684" />
        </Link>
      </div>
    </Card>
  );
}
