import { Button } from '@/components/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, pages, onPageChange }: PaginationProps) {
  if (pages <= 1) return null;

  return (
    <div
      className="flex items-center justify-center gap-2 pt-8"
      data-icod-id="src_components_pagination_tsx_e1fb">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        data-icod-id="src_components_pagination_tsx_5b06">
        <ChevronLeft className="h-4 w-4" data-icod-id="src_components_pagination_tsx_0198" /> Prev
      </Button>
      <span
        className="px-4 text-sm text-muted-foreground"
        data-icod-id="src_components_pagination_tsx_8695">
        Page {page} of {pages}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={page >= pages}
        onClick={() => onPageChange(page + 1)}
        data-icod-id="src_components_pagination_tsx_a227">
        Next <ChevronRight className="h-4 w-4" data-icod-id="src_components_pagination_tsx_4767" />
      </Button>
    </div>
  );
}
