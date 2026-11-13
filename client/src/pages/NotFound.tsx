import { Link } from 'react-router-dom';
import { Ghost } from 'lucide-react';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div
      className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center"
      data-icod-id="src_pages_notfound_tsx_dcf9">
      <Ghost
        className="mb-6 h-20 w-20 text-muted-foreground"
        data-icod-id="src_pages_notfound_tsx_6b67" />
      <h1
        className="mb-2 text-6xl font-extrabold text-foreground"
        data-icod-id="src_pages_notfound_tsx_678c">404</h1>
      <h2
        className="mb-4 text-xl font-semibold text-foreground"
        data-icod-id="src_pages_notfound_tsx_5c63">Page Not Found</h2>
      <p
        className="mb-8 max-w-md text-muted-foreground"
        data-icod-id="src_pages_notfound_tsx_5fe8">
        The page you're looking for doesn't exist or has been moved. Try browsing our blog or head back home.
      </p>
      <div className="flex gap-3" data-icod-id="src_pages_notfound_tsx_550b">
        <Link to="/" data-icod-id="src_pages_notfound_tsx_2420"><Button data-icod-id="src_pages_notfound_tsx_8489">Go Home</Button></Link>
        <Link to="/blog" data-icod-id="src_pages_notfound_tsx_3141"><Button variant="outline" data-icod-id="src_pages_notfound_tsx_1228">Browse Blog</Button></Link>
      </div>
    </div>
  );
}
