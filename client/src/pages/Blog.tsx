import { useState, useEffect, useCallback } from 'react';
import { Spinner, EmptyState } from '@/components/ui';
import ArticleCard from '@/components/ArticleCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import Pagination from '@/components/Pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadArticles } from '@/store/slices/articlesSlice';
import { loadCategories } from '@/store/slices/categoriesSlice';

export default function Blog() {
  const dispatch = useAppDispatch();
  const { items, total, page, pages, status } = useAppSelector((s) => s.articles);
  const { items: categories } = useAppSelector((s) => s.categories);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const fetchArticles = useCallback(() => {
    dispatch(loadArticles({ search: search || undefined, category: category || undefined, page: currentPage, limit: 9 }));
  }, [dispatch, search, category, currentPage]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  function handleSearch(query: string) {
    setSearch(query);
    setCurrentPage(1);
  }

  function handleCategorySelect(slug: string) {
    setCategory(slug);
    setCurrentPage(1);
  }

  return (
    <div
      className="min-h-screen bg-background"
      data-icod-id="src_pages_blog_tsx_4496">
      <div className="bg-muted/30 py-12" data-icod-id="src_pages_blog_tsx_7f7c">
        <div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          data-icod-id="src_pages_blog_tsx_fee9">
          <h1
            className="mb-4 text-3xl font-bold text-foreground"
            data-icod-id="src_pages_blog_tsx_6ffa">Blog</h1>
          <p
            className="mb-6 text-muted-foreground"
            data-icod-id="src_pages_blog_tsx_cb19">Discover articles across technology, lifestyle, travel, and more.</p>
          <div className="max-w-xl" data-icod-id="src_pages_blog_tsx_26d7">
            <SearchBar onSearch={handleSearch} data-icod-id="src_pages_blog_tsx_5d4e" />
          </div>
        </div>
      </div>
      <div
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        data-icod-id="src_pages_blog_tsx_c28d">
        {categories.length > 0 && (
          <div className="mb-8" data-icod-id="src_pages_blog_tsx_3e56">
            <CategoryFilter
              categories={categories}
              selected={category}
              onSelect={handleCategorySelect}
              data-icod-id="src_pages_blog_tsx_34e1" />
          </div>
        )}

        <div
          className="mb-4 text-sm text-muted-foreground"
          data-icod-id="src_pages_blog_tsx_c088">
          Showing {total} article{total !== 1 ? 's' : ''}
        </div>

        {status === 'loading' ? (
          <div
            className="flex justify-center py-16"
            data-icod-id="src_pages_blog_tsx_a872"><Spinner size="lg" data-icod-id="src_pages_blog_tsx_3866" /></div>
        ) : items.length === 0 ? (
          <EmptyState
            title="No articles found"
            description="Try adjusting your search or filters."
            data-icod-id="src_pages_blog_tsx_db84" />
        ) : (
          <>
            <div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              data-icod-id="src_pages_blog_tsx_51ed">
              {items.map((article) => (
                <ArticleCard
                  key={article._id}
                  article={article}
                  data-icod-id={`src_pages_blog_tsx_f9dc_${article._id}`} />
              ))}
            </div>
            <Pagination
              page={page}
              pages={pages}
              onPageChange={setCurrentPage}
              data-icod-id="src_pages_blog_tsx_1d7d" />
          </>
        )}
      </div>
    </div>
  );
}
