import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-muted/30 py-20 sm:py-28"
      data-icod-id="src_components_herosection_tsx_53a2">
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        data-icod-id="src_components_herosection_tsx_829f">
        <div
          className="mx-auto max-w-3xl text-center"
          data-icod-id="src_components_herosection_tsx_1bcc">
          <h1
            className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            data-icod-id="src_components_herosection_tsx_7b4f">
            Stories, Ideas &amp; Insights
          </h1>
          <p
            className="mb-8 text-lg text-muted-foreground sm:text-xl"
            data-icod-id="src_components_herosection_tsx_5b16">
            Welcome to The Daily Digest — a space for thoughtful writing about technology,
            lifestyle, travel, education, and personal growth. Discover articles that inspire,
            inform, and spark curiosity.
          </p>
          <div
            className="flex justify-center gap-4"
            data-icod-id="src_components_herosection_tsx_783d">
            <Link to="/blog" data-icod-id="src_components_herosection_tsx_bf69">
              <Button size="lg" data-icod-id="src_components_herosection_tsx_9ed4">
                Explore Articles <ArrowRight
                className="ml-2 h-4 w-4"
                data-icod-id="src_components_herosection_tsx_3613" />
              </Button>
            </Link>
            <Link to="/about" data-icod-id="src_components_herosection_tsx_abe0">
              <Button
                variant="outline"
                size="lg"
                data-icod-id="src_components_herosection_tsx_7254">About Me</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
