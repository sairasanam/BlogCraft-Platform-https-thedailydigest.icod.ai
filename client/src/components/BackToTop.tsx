import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <Button
      variant="primary"
      size="icon"
      className="fixed bottom-6 right-6 z-40 rounded-full shadow-lg"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      data-icod-id="src_components_backtotop_tsx_5c57">
      <ArrowUp className="h-5 w-5" data-icod-id="src_components_backtotop_tsx_deb5" />
    </Button>
  );
}
