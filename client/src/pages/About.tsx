import { BookOpen, Heart, Compass, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui';

export default function About() {
  return (
    <div
      className="min-h-screen bg-background"
      data-icod-id="src_pages_about_tsx_e566">
      <div className="bg-muted/30 py-16" data-icod-id="src_pages_about_tsx_b236">
        <div
          className="mx-auto max-w-3xl px-4 text-center sm:px-6"
          data-icod-id="src_pages_about_tsx_8a6a">
          <h1
            className="mb-4 text-3xl font-bold text-foreground sm:text-4xl"
            data-icod-id="src_pages_about_tsx_81eb">About Me</h1>
          <p
            className="text-lg text-muted-foreground"
            data-icod-id="src_pages_about_tsx_0e22">
            Welcome! I'm the writer behind The Daily Digest. Here's a little about my journey and what drives me.
          </p>
        </div>
      </div>
      <div
        className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8"
        data-icod-id="src_pages_about_tsx_02c7">
        {/* Profile Section */}
        <div
          className="mb-12 flex flex-col items-center gap-6 sm:flex-row sm:items-start"
          data-icod-id="src_pages_about_tsx_fa23">
          <div
            className="h-32 w-32 shrink-0 overflow-hidden rounded-full bg-muted"
            data-icod-id="src_pages_about_tsx_0d25">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
              alt="Author profile"
              className="h-full w-full object-cover"
              data-icod-id="src_pages_about_tsx_27d0" />
          </div>
          <div data-icod-id="src_pages_about_tsx_696a">
            <h2
              className="mb-2 text-2xl font-bold text-foreground"
              data-icod-id="src_pages_about_tsx_fe03">Hello, I'm Alex</h2>
            <p className="text-muted-foreground" data-icod-id="src_pages_about_tsx_ffd0">
              Writer, thinker, and lifelong learner. I started The Daily Digest as a way to share ideas that
              matter — from technology trends to personal growth strategies, travel adventures to practical
              life advice. My goal is to create content that informs, inspires, and sparks meaningful conversations.
            </p>
          </div>
        </div>

        {/* Interests */}
        <div
          className="mb-12 grid gap-4 sm:grid-cols-2"
          data-icod-id="src_pages_about_tsx_d993">
          <Card
            className="flex items-start gap-4 p-5"
            data-icod-id="src_pages_about_tsx_2c29">
            <BookOpen
              className="mt-1 h-6 w-6 shrink-0 text-primary"
              data-icod-id="src_pages_about_tsx_7245" />
            <div data-icod-id="src_pages_about_tsx_1a1a">
              <h3
                className="mb-1 font-semibold text-foreground"
                data-icod-id="src_pages_about_tsx_1f57">Writing & Storytelling</h3>
              <p
                className="text-sm text-muted-foreground"
                data-icod-id="src_pages_about_tsx_df5c">Crafting narratives that connect with readers and make complex topics accessible.</p>
            </div>
          </Card>
          <Card
            className="flex items-start gap-4 p-5"
            data-icod-id="src_pages_about_tsx_7530">
            <Compass
              className="mt-1 h-6 w-6 shrink-0 text-primary"
              data-icod-id="src_pages_about_tsx_dc82" />
            <div data-icod-id="src_pages_about_tsx_4300">
              <h3
                className="mb-1 font-semibold text-foreground"
                data-icod-id="src_pages_about_tsx_ffe6">Travel & Culture</h3>
              <p
                className="text-sm text-muted-foreground"
                data-icod-id="src_pages_about_tsx_7749">Exploring new places, experiencing different cultures, and sharing the journey.</p>
            </div>
          </Card>
          <Card
            className="flex items-start gap-4 p-5"
            data-icod-id="src_pages_about_tsx_7188">
            <Lightbulb
              className="mt-1 h-6 w-6 shrink-0 text-primary"
              data-icod-id="src_pages_about_tsx_9054" />
            <div data-icod-id="src_pages_about_tsx_b9f1">
              <h3
                className="mb-1 font-semibold text-foreground"
                data-icod-id="src_pages_about_tsx_3ede">Technology & Innovation</h3>
              <p
                className="text-sm text-muted-foreground"
                data-icod-id="src_pages_about_tsx_a310">Understanding how tech shapes our world and preparing for what comes next.</p>
            </div>
          </Card>
          <Card
            className="flex items-start gap-4 p-5"
            data-icod-id="src_pages_about_tsx_8a33">
            <Heart
              className="mt-1 h-6 w-6 shrink-0 text-primary"
              data-icod-id="src_pages_about_tsx_109b" />
            <div data-icod-id="src_pages_about_tsx_1cf3">
              <h3
                className="mb-1 font-semibold text-foreground"
                data-icod-id="src_pages_about_tsx_7c2e">Personal Growth</h3>
              <p
                className="text-sm text-muted-foreground"
                data-icod-id="src_pages_about_tsx_42b6">Continuous self-improvement through mindfulness, learning, and intentional living.</p>
            </div>
          </Card>
        </div>

        {/* Journey */}
        <div className="mb-12" data-icod-id="src_pages_about_tsx_0ae6">
          <h2
            className="mb-4 text-xl font-bold text-foreground"
            data-icod-id="src_pages_about_tsx_1d75">My Blogging Journey</h2>
          <div
            className="space-y-4 text-muted-foreground"
            data-icod-id="src_pages_about_tsx_bafb">
            <p data-icod-id="src_pages_about_tsx_ff73">
              I began writing online over five years ago, initially as a way to document my travels and
              technical experiments. What started as a personal journal gradually evolved into something
              bigger — a platform where ideas could be shared, discussed, and refined.
            </p>
            <p data-icod-id="src_pages_about_tsx_011d">
              The Daily Digest was born from the belief that thoughtful, well-researched content still
              matters in an age of information overload. Every article is crafted with care, aiming to
              provide genuine value rather than just filling space.
            </p>
          </div>
        </div>

        {/* Vision */}
        <Card className="bg-primary/5 p-6" data-icod-id="src_pages_about_tsx_7251">
          <h2
            className="mb-3 text-xl font-bold text-foreground"
            data-icod-id="src_pages_about_tsx_e809">Goals & Vision</h2>
          <p className="text-muted-foreground" data-icod-id="src_pages_about_tsx_137e">
            My vision is simple: build a community of curious minds who value depth over clickbait, substance
            over sensationalism. Whether you're here for tech insights, travel inspiration, or personal development
            tips, I hope you leave each article feeling a little more informed and inspired than when you arrived.
          </p>
        </Card>

        {/* Friendly message */}
        <div className="mt-12 text-center" data-icod-id="src_pages_about_tsx_9cb1">
          <p
            className="text-lg italic text-muted-foreground"
            data-icod-id="src_pages_about_tsx_6ec3">
            "Thank you for being here. Your readership means the world to me, and I look forward to continuing
            this journey together."
          </p>
        </div>
      </div>
    </div>
  );
}
