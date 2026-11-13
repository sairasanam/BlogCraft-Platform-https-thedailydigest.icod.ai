import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = 'Search articles...' }: SearchBarProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => onSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="relative" data-icod-id="src_components_searchbar_tsx_4f7f">
      <Search
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        data-icod-id="src_components_searchbar_tsx_8ac4" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="pl-10"
        data-icod-id="src_components_searchbar_tsx_e337" />
    </div>
  );
}
