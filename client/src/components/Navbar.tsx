import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PenSquare } from 'lucide-react';
import { Button, buttonClass } from '@/components/ui';
import { cn } from '@/utils/cn';
import { useAppSelector } from '@/store/hooks';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Categories', to: '/categories' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const user = useAppSelector((s) => s.auth.user);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      data-icod-id="src_components_navbar_tsx_ff48">
      <div
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        data-icod-id="src_components_navbar_tsx_92c7">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-foreground"
          data-icod-id="src_components_navbar_tsx_e4fa">
          <PenSquare
            className="h-6 w-6 text-primary"
            data-icod-id="src_components_navbar_tsx_d31e" />
          <span data-icod-id="src_components_navbar_tsx_a10d">The Daily Digest</span>
        </Link>

        {/* Desktop nav */}
        <div
          className="hidden md:flex md:items-center md:gap-6"
          data-icod-id="src_components_navbar_tsx_4ae8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location.pathname === link.to ? 'text-primary' : 'text-muted-foreground',
              )}
              data-icod-id={`src_components_navbar_tsx_4726_${link.to}`}>
              {link.label}
            </Link>
          ))}
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className={buttonClass({ variant: 'primary', size: 'sm' })}
              data-icod-id="src_components_navbar_tsx_4059">
              Dashboard
            </Link>
          )}
          {!user && (
            <Link
              to="/login"
              className={buttonClass({ variant: 'outline', size: 'sm' })}
              data-icod-id="src_components_navbar_tsx_9d7e">
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-icod-id="src_components_navbar_tsx_124c">
          {mobileOpen ? <X className="h-5 w-5" data-icod-id="src_components_navbar_tsx_28ac" /> : <Menu className="h-5 w-5" data-icod-id="src_components_navbar_tsx_7153" />}
        </Button>
      </div>
      {/* Mobile nav */}
      {mobileOpen && (
        <div
          className="border-t border-border bg-background md:hidden"
          data-icod-id="src_components_navbar_tsx_7152">
          <div
            className="flex flex-col gap-1 p-4"
            data-icod-id="src_components_navbar_tsx_088f">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
                  location.pathname === link.to ? 'bg-muted text-primary' : 'text-muted-foreground',
                )}
                data-icod-id={`src_components_navbar_tsx_72d5_${link.to}`}>
                {link.label}
              </Link>
            ))}
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-primary hover:bg-muted"
                data-icod-id="src_components_navbar_tsx_510c">
                Dashboard
              </Link>
            )}
            {!user && (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
                data-icod-id="src_components_navbar_tsx_132d">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
