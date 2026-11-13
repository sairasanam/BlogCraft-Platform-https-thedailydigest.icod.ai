import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Spinner, EmptyState } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadCategories } from '@/store/slices/categoriesSlice';

export default function Categories() {
  const dispatch = useAppDispatch();
  const { items: categories, status } = useAppSelector((s) => s.categories);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <div
      className="min-h-screen bg-background"
      data-icod-id="src_pages_categories_tsx_a37a">
      <div
        className="bg-muted/30 py-12"
        data-icod-id="src_pages_categories_tsx_c6e7">
        <div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          data-icod-id="src_pages_categories_tsx_a8dd">
          <h1
            className="mb-4 text-3xl font-bold text-foreground"
            data-icod-id="src_pages_categories_tsx_3108">Categories</h1>
          <p
            className="text-muted-foreground"
            data-icod-id="src_pages_categories_tsx_6f71">Browse articles by topic.</p>
        </div>
      </div>
      <div
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        data-icod-id="src_pages_categories_tsx_7eda">
        {status === 'loading' ? (
          <div
            className="flex justify-center py-16"
            data-icod-id="src_pages_categories_tsx_4511"><Spinner size="lg" data-icod-id="src_pages_categories_tsx_ca45" /></div>
        ) : categories.length === 0 ? (
          <EmptyState
            title="No categories yet"
            description="Categories will appear once articles are published."
            data-icod-id="src_pages_categories_tsx_ec69" />
        ) : (
          <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            data-icod-id="src_pages_categories_tsx_92b2">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/categories/${cat.slug}`}
                data-icod-id={`src_pages_categories_tsx_560d_${cat._id}`}>
                <Card
                  className="h-full p-6 transition-all hover:border-primary/50 hover:shadow-md"
                  data-icod-id={`src_pages_categories_tsx_3926_${cat._id}`}>
                  <h2
                    className="mb-2 text-xl font-bold text-foreground"
                    data-icod-id={`src_pages_categories_tsx_5084_${cat._id}`}>{cat.name}</h2>
                  <p
                    className="text-sm text-muted-foreground"
                    data-icod-id={`src_pages_categories_tsx_f979_${cat._id}`}>{cat.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
