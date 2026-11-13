import { Button } from '@/components/ui';
import { cn } from '@/utils/cn';
import type { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  selected: string;
  onSelect: (slug: string) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      data-icod-id="src_components_categoryfilter_tsx_6014">
      <Button
        variant={selected === '' ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => onSelect('')}
        data-icod-id="src_components_categoryfilter_tsx_f321">
        All
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat._id}
          variant={selected === cat.slug ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onSelect(cat.slug)}
          className={cn(selected === cat.slug ? '' : '')}
          data-icod-id={`src_components_categoryfilter_tsx_8a97_${cat._id}`}>
          {cat.name}
        </Button>
      ))}
    </div>
  );
}
