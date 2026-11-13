import { Link } from 'react-router-dom';
import { PenSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="border-t border-border bg-muted/30"
      data-icod-id="src_components_footer_tsx_5681">
      <div
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        data-icod-id="src_components_footer_tsx_8fe9">
        <div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          data-icod-id="src_components_footer_tsx_0ae0">
          {/* Brand */}
          <div className="space-y-3" data-icod-id="src_components_footer_tsx_3c03">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-bold text-foreground"
              data-icod-id="src_components_footer_tsx_f5c0">
              <PenSquare
                className="h-5 w-5 text-primary"
                data-icod-id="src_components_footer_tsx_84f7" />
              <span data-icod-id="src_components_footer_tsx_1d24">The Daily Digest</span>
            </Link>
            <p
              className="text-sm text-muted-foreground"
              data-icod-id="src_components_footer_tsx_1a40">
              A modern personal blog sharing insights on technology, lifestyle, travel, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div data-icod-id="src_components_footer_tsx_aeb8">
            <h3
              className="mb-3 text-sm font-semibold text-foreground"
              data-icod-id="src_components_footer_tsx_5290">Quick Links</h3>
            <ul
              className="space-y-2 text-sm text-muted-foreground"
              data-icod-id="src_components_footer_tsx_2837">
              <li data-icod-id="src_components_footer_tsx_564c"><Link
                to="/"
                className="hover:text-primary"
                data-icod-id="src_components_footer_tsx_e075">Home</Link></li>
              <li data-icod-id="src_components_footer_tsx_3474"><Link
                to="/blog"
                className="hover:text-primary"
                data-icod-id="src_components_footer_tsx_5ae8">Blog</Link></li>
              <li data-icod-id="src_components_footer_tsx_842c"><Link
                to="/about"
                className="hover:text-primary"
                data-icod-id="src_components_footer_tsx_8605">About</Link></li>
              <li data-icod-id="src_components_footer_tsx_3f13"><Link
                to="/contact"
                className="hover:text-primary"
                data-icod-id="src_components_footer_tsx_9beb">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div data-icod-id="src_components_footer_tsx_c2db">
            <h3
              className="mb-3 text-sm font-semibold text-foreground"
              data-icod-id="src_components_footer_tsx_2812">Categories</h3>
            <ul
              className="space-y-2 text-sm text-muted-foreground"
              data-icod-id="src_components_footer_tsx_ec08">
              <li data-icod-id="src_components_footer_tsx_4c46"><Link
                to="/categories/technology"
                className="hover:text-primary"
                data-icod-id="src_components_footer_tsx_af21">Technology</Link></li>
              <li data-icod-id="src_components_footer_tsx_2d74"><Link
                to="/categories/lifestyle"
                className="hover:text-primary"
                data-icod-id="src_components_footer_tsx_d0ab">Lifestyle</Link></li>
              <li data-icod-id="src_components_footer_tsx_b2ab"><Link
                to="/categories/travel"
                className="hover:text-primary"
                data-icod-id="src_components_footer_tsx_ebc0">Travel</Link></li>
              <li data-icod-id="src_components_footer_tsx_7b4c"><Link
                to="/categories/business"
                className="hover:text-primary"
                data-icod-id="src_components_footer_tsx_412d">Business</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div data-icod-id="src_components_footer_tsx_00a6">
            <h3
              className="mb-3 text-sm font-semibold text-foreground"
              data-icod-id="src_components_footer_tsx_a058">Legal</h3>
            <ul
              className="space-y-2 text-sm text-muted-foreground"
              data-icod-id="src_components_footer_tsx_1ac7">
              <li data-icod-id="src_components_footer_tsx_c9e9"><span className="cursor-default" data-icod-id="src_components_footer_tsx_d7d8">Privacy Policy</span></li>
              <li data-icod-id="src_components_footer_tsx_1e86"><span className="cursor-default" data-icod-id="src_components_footer_tsx_acfe">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div
          className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground"
          data-icod-id="src_components_footer_tsx_950b">
          &copy; {new Date().getFullYear()} The Daily Digest. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
