import bcrypt from 'bcryptjs';
import User from '../models/User';
import Category from '../models/Category';
import Article from '../models/Article';
import Comment from '../models/Comment';
import Subscriber from '../models/Subscriber';

const CATEGORIES = [
  { name: 'Technology', slug: 'technology', description: 'Latest tech trends, AI, software development, and digital innovation' },
  { name: 'Lifestyle', slug: 'lifestyle', description: 'Daily living, wellness, home decor, and personal style' },
  { name: 'Education', slug: 'education', description: 'Learning resources, study tips, online courses, and educational insights' },
  { name: 'Travel', slug: 'travel', description: 'Destination guides, travel tips, adventures, and cultural experiences' },
  { name: 'Business', slug: 'business', description: 'Entrepreneurship, startups, finance, marketing, and career advice' },
  { name: 'Personal Development', slug: 'personal-development', description: 'Self-improvement, productivity, mindfulness, and goal setting' },
];

const ARTICLES = [
  {
    title: 'The Future of AI in Everyday Life',
    slug: 'future-of-ai-in-everyday-life',
    excerpt: 'Artificial intelligence is transforming how we live, work, and interact with technology. Discover what lies ahead.',
    content: `<h2>The Rise of Intelligent Systems</h2><p>Artificial intelligence has moved beyond science fiction into our daily routines. From smart assistants to personalized recommendations, AI is reshaping every aspect of modern life.</p><h2>Healthcare Revolution</h2><p>AI-powered diagnostics are enabling earlier disease detection and more personalized treatment plans. Machine learning algorithms can analyze medical images with accuracy that rivals human specialists.</p><h2>Smart Homes and Cities</h2><p>The integration of AI into our living spaces creates environments that adapt to our needs. Smart thermostats learn our preferences, while city-wide AI systems optimize traffic flow and energy consumption.</p><blockquote>"AI is not just another technology — it's a fundamental shift in how we solve problems."</blockquote><h2>Ethical Considerations</h2><p>As AI becomes more pervasive, questions about privacy, bias, and accountability grow more urgent. Building responsible AI systems requires collaboration between technologists, policymakers, and ethicists.</p><p>The future of AI promises incredible possibilities, but realizing them will require thoughtful stewardship and inclusive development practices.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    author: 'Sarah Chen',
    views: 1250,
  },
  {
    title: '10 Productivity Tips for Remote Workers',
    slug: 'productivity-tips-remote-workers',
    excerpt: 'Working from home comes with unique challenges. Here are proven strategies to stay focused and productive.',
    content: `<h2>Create a Dedicated Workspace</h2><p>Having a specific area for work helps your brain switch into professional mode. Even a small desk in a quiet corner can make a significant difference in your focus and output.</p><h2>Establish Clear Boundaries</h2><p>Set specific working hours and communicate them to family members or roommates. Use visual signals like a closed door or headphones to indicate when you're in deep work mode.</p><h2>The Pomodoro Technique</h2><p>Work in focused 25-minute intervals followed by 5-minute breaks. After four cycles, take a longer 15-30 minute break. This rhythm prevents burnout and maintains high concentration levels.</p><h2>Digital Minimalism</h2><p>Turn off non-essential notifications during work hours. Use website blockers to prevent social media distractions. Your phone should be out of sight unless needed for work.</p><h2>Regular Exercise and Movement</h2><p>Schedule short movement breaks throughout the day. A 10-minute walk can refresh your mind and boost creativity significantly.</p><p>Remember that productivity isn't about working more hours — it's about working smarter and maintaining sustainable habits over the long term.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1593642632823-8f7856677746?w=800&q=80',
    author: 'Marcus Johnson',
    views: 980,
  },
  {
    title: 'Exploring the Mountains of Switzerland',
    slug: 'exploring-mountains-switzerland',
    excerpt: 'A journey through the breathtaking Swiss Alps, from charming villages to majestic peaks.',
    content: `<h2>The Magic of the Swiss Alps</h2><p>Switzerland's mountain landscapes offer some of the most spectacular scenery on Earth. The Swiss Alps stretch across the country, creating a backdrop of snow-capped peaks, emerald valleys, and crystal-clear lakes.</p><h2>Zermatt and the Matterhorn</h2><p>No visit to Switzerland is complete without seeing the iconic Matterhorn. The car-free village of Zermatt provides the perfect base for exploring this legendary peak and its surrounding trails.</p><h2>Jungfrau Region</h2><p>The Jungfrau region offers an incredible diversity of experiences. Take the cogwheel train to Jungfraujoch, the "Top of Europe," at 3,454 meters above sea level. The views from the Sphinx Observatory are simply unforgettable.</p><h2>Hiking Paradise</h2><p>With over 65,000 kilometers of marked hiking trails, Switzerland is a hiker's dream. Trails range from gentle valley walks to challenging alpine routes that reward you with panoramic vistas.</p><blockquote>"In the mountains, there you feel free." — T.S. Eliot</blockquote><p>Whether you're an experienced mountaineer or a casual walker, the Swiss mountains have something extraordinary to offer every visitor.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    author: 'Elena Rossi',
    views: 870,
  },
  {
    title: 'Building a Successful Startup in 2024',
    slug: 'building-successful-startup-2024',
    excerpt: 'Key insights and strategies for entrepreneurs looking to launch and scale their ventures in today\'s market.',
    content: `<h2>Validate Before You Build</h2><p>The most common reason startups fail is building something nobody wants. Before writing a single line of code or investing capital, validate your idea through customer interviews, surveys, and landing page tests.</p><h2>Start Small, Think Big</h2><p>Launch with a minimum viable product (MVP) that solves one core problem exceptionally well. Gather feedback from early users and iterate rapidly. Many successful companies started as simple tools before expanding into platforms.</p><h2>Finding Product-Market Fit</h2><p>Product-market fit occurs when your product satisfies a strong market demand. Signs include organic growth, high retention rates, and customers actively recommending your product to others.</p><h2>Building the Right Team</h2><p>Your founding team is arguably more important than your initial idea. Look for complementary skills, shared values, and resilience. The best teams can pivot successfully; weak teams fail even with great ideas.</p><h2>Fundraising Strategy</h2><p>Raise only what you need to reach your next milestone. Focus on investors who bring strategic value beyond capital. Remember that bootstrapping remains a viable path for many businesses.</p><p>The startup journey is challenging but deeply rewarding for those who approach it with clarity, persistence, and adaptability.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    author: 'David Park',
    views: 1100,
  },
  {
    title: 'Mindfulness: A Beginner\'s Guide',
    slug: 'mindfulness-beginners-guide',
    excerpt: 'Learn the fundamentals of mindfulness meditation and how to incorporate this powerful practice into your daily routine.',
    content: `<h2>What Is Mindfulness?</h2><p>Mindfulness is the practice of paying attention to the present moment without judgment. It involves observing your thoughts, feelings, and sensations with curiosity and acceptance rather than reactivity.</p><h2>Getting Started</h2><p>Begin with just five minutes of seated meditation each day. Find a comfortable position, close your eyes, and focus on your breath. When your mind wanders — and it will — gently return your attention to breathing without self-criticism.</p><h2>Daily Mindfulness Practices</h2><p>You don't need to sit in meditation all day. Practice mindful eating by savoring each bite. Take mindful walks where you notice colors, sounds, and textures. Wash dishes with full attention to the warmth of water and texture of soap.</p><h2>Benefits Backed by Science</h2><p>Research shows regular mindfulness practice reduces stress, improves focus, enhances emotional regulation, and even strengthens immune function. Brain imaging studies reveal structural changes in areas associated with attention and empathy.</p><blockquote>"Mindfulness isn't difficult. What's difficult is remembering to be mindful." — Sharon Salzberg</blockquote><p>Start small, be consistent, and remember that mindfulness is a practice, not a perfection. Every moment of awareness is a success.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    author: 'Lisa Nakamura',
    views: 760,
  },
  {
    title: 'The Complete Guide to Modern Web Development',
    slug: 'complete-guide-modern-web-development',
    excerpt: 'An overview of the current web development landscape, essential tools, and best practices for building modern applications.',
    content: `<h2>The Modern Stack</h2><p>Web development has evolved dramatically. Today's developers choose from frameworks like React, Vue, and Svelte for frontend development, paired with Node.js, Python, or Go for backend services. TypeScript has become the industry standard for type-safe development.</p><h2>Performance First</h2><p>Users expect fast-loading websites. Core Web Vitals measure loading performance, interactivity, and visual stability. Techniques like code splitting, lazy loading, image optimization, and server-side rendering are no longer optional.</p><h2>Accessibility Matters</h2><p>Building accessible websites isn't just ethical — it's often legally required. Semantic HTML, proper ARIA labels, keyboard navigation, and sufficient color contrast ensure your site works for everyone.</p><h2>Security Best Practices</h2><p>Every developer must understand security fundamentals: input validation, output encoding, HTTPS everywhere, secure authentication, and dependency management. Security isn't a feature to add later — it's built in from the start.</p><h2>Testing Strategy</h2><p>A comprehensive testing pyramid includes unit tests, integration tests, and end-to-end tests. Automated testing catches bugs before they reach users and gives teams confidence to refactor and deploy frequently.</p><p>The web development landscape continues to evolve, but mastering fundamentals — HTML, CSS, JavaScript, HTTP, and security principles — remains the foundation of everything else.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    author: 'Alex Rivera',
    views: 1450,
  },
  {
    title: 'Healthy Eating on a Budget',
    slug: 'healthy-eating-on-budget',
    excerpt: 'Nutritious meals don\'t have to break the bank. Practical tips for eating well while keeping costs low.',
    content: `<h2>Plan Your Meals</h2><p>Meal planning is the single most effective strategy for eating healthy on a budget. Plan your week's meals, create a shopping list, and stick to it. This reduces impulse purchases and food waste significantly.</p><h2>Buy Seasonal and Local</h2><p>Seasonal produce is cheaper, fresher, and more flavorful. Visit farmers' markets near closing time for deals. Frozen fruits and vegetables are nutritionally equivalent to fresh and often cost less.</p><h2>Cook at Home</h2><p>Restaurant meals typically cost 3-5 times more than homemade equivalents. Batch cooking on weekends saves both time and money. Invest in basic cooking skills — they pay dividends for life.</p><h2>Protein Alternatives</h2><p>Meat is often the most expensive part of a meal. Incorporate beans, lentils, eggs, and tofu as affordable protein sources. When you do buy meat, use it as a flavoring rather than the main component.</p><blockquote>"Let food be thy medicine and medicine be thy food." — Hippocrates</blockquote><p>Eating well on a budget requires planning and creativity, but the rewards — better health, more savings, and improved cooking skills — are well worth the effort.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
    author: 'Maria Santos',
    views: 650,
  },
  {
    title: 'Online Learning: Maximizing Your Education',
    slug: 'online-learning-maximizing-education',
    excerpt: 'How to get the most out of online courses and build a sustainable self-directed learning habit.',
    content: `<h2>The Online Learning Revolution</h2><p>Platforms like Coursera, edX, and Udemy have democratized education. World-class courses from top universities are now accessible to anyone with an internet connection. But access alone doesn't guarantee learning.</p><h2>Active Learning Strategies</h2><p>Passive video watching produces minimal retention. Take notes by hand, pause to reflect, complete exercises, and apply concepts to real projects. Teaching others what you've learned is one of the most effective study methods.</p><h2>Building Consistency</h2><p>Study in short, regular sessions rather than marathon cramming. Schedule learning time like any other appointment. Track your progress with a simple spreadsheet or journal. Celebrate milestones to maintain motivation.</p><h2>Choosing the Right Courses</h2><p>Focus on courses with hands-on projects and peer communities. Read reviews carefully. Start with foundational courses before advancing. Don't collect certificates — build portfolio pieces that demonstrate real skills.</p><h2>Community and Accountability</h2><p>Join study groups, participate in forums, and find accountability partners. Learning in isolation leads to dropout. Community support transforms online learning from a solitary activity into a social experience.</p><p>The opportunity to learn anything online is unprecedented. The key is approaching it with intention, discipline, and genuine curiosity.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
    author: 'James Wilson',
    views: 520,
  },
  {
    title: 'Digital Nomad Lifestyle: Pros and Cons',
    slug: 'digital-nomad-lifestyle-pros-cons',
    excerpt: 'An honest look at the reality of location-independent work, from freedom and adventure to loneliness and instability.',
    content: `<h2>The Dream vs. Reality</h2><p>Social media paints digital nomad life as endless beaches and laptop sunsets. The reality is more nuanced — co-working spaces, timezone challenges, visa complexities, and the constant search for reliable WiFi.</p><h2>Freedom and Flexibility</h2><p>The ability to design your own schedule and explore new cultures is genuinely transformative. You develop adaptability, cultural sensitivity, and problem-solving skills that enrich both personal and professional life.</p><h2>The Challenges</h2><p>Loneliness is the most commonly cited difficulty. Building deep friendships while constantly moving requires intentional effort. Healthcare, taxes, banking, and legal residency add administrative complexity that few anticipate.</p><h2>Financial Realities</h2><p>While some destinations are cheaper than Western cities, travel costs add up. Budget realistically including flights, accommodation, insurance, coworking memberships, and emergency funds. Income stability matters more than income size.</p><h2>Is It Right for You?</h2><p>Digital nomad life suits people who thrive on change, tolerate uncertainty, and are self-disciplined. If you value stability, deep community roots, and routine, remote work from a home base may serve you better.</p><p>The digital nomad lifestyle offers remarkable opportunities for those prepared for its realities. Honest self-assessment is the first step toward making it work.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    author: 'Anna Kowalski',
    views: 890,
  },
  {
    title: 'Setting Goals That Actually Stick',
    slug: 'setting-goals-that-stick',
    excerpt: 'Why most New Year\'s resolutions fail and a science-backed framework for setting goals you\'ll actually achieve.',
    content: `<h2>Why Goals Fail</h2><p>Research shows that 80% of New Year's resolutions fail by February. The problem isn't lack of motivation — it's poor goal design. Vague aspirations like "get fit" or "save money" lack the specificity needed for action.</p><h2>The SMART Framework</h2><p>Effective goals are Specific, Measurable, Achievable, Relevant, and Time-bound. Instead of "read more," try "read one book per month for six months." Clarity eliminates ambiguity and enables tracking.</p><h2>Systems Over Goals</h2><p>Goals define direction; systems drive progress. A goal is "write a novel"; a system is "write 500 words every morning at 7am." Focus on building daily habits that move you toward your objectives automatically.</p><h2>Accountability and Review</h2><p>Share your goals with someone who'll hold you accountable. Schedule weekly reviews to assess progress and adjust course. Failure isn't fatal — it's data. What matters is consistent recalibration.</p><blockquote>"A goal without a plan is just a wish." — Antoine de Saint-Exupéry</blockquote><p>Sustainable goal achievement combines clear targets, practical systems, supportive environments, and compassionate self-awareness. Start small, stay consistent, and trust the process.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
    author: 'Tom Bradley',
    views: 710,
  },
];

const COMMENTS = [
  { author: 'John Smith', email: 'john@example.com', content: 'Great article! Really insightful perspective on AI development.', approved: true },
  { author: 'Emily Davis', email: 'emily@example.com', content: 'I found the section on healthcare particularly interesting. Thanks for sharing!', approved: true },
  { author: 'Michael Brown', email: 'michael@example.com', content: 'These productivity tips changed my remote work routine completely.', approved: true },
  { author: 'Sophie Martin', email: 'sophie@example.com', content: 'Switzerland is on my bucket list. Beautiful photos and great travel advice.', approved: true },
  { author: 'Ryan Lee', email: 'ryan@example.com', content: 'As a startup founder, I wish I had read this two years ago. Solid advice.', approved: true },
  { author: 'Priya Patel', email: 'priya@example.com', content: 'Started meditating after reading this. Two weeks in and already noticing differences.', approved: true },
  { author: 'Carlos Mendez', email: 'carlos@example.com', content: 'Comprehensive guide! Bookmarking this for reference.', approved: true },
  { author: 'Test User', email: 'test@test.com', content: 'This is a test comment pending approval.', approved: false },
];

const SUBSCRIBERS = [
  { email: 'reader1@example.com' },
  { email: 'subscriber2@example.com' },
  { email: 'newsletter_fan@example.com' },
  { email: 'blog.reader@example.com' },
  { email: 'updates@example.com' },
];

export async function seedDatabase(): Promise<void> {
  // Seed admin user
  const password = await bcrypt.hash('Admin@1234', 10);
  await User.updateOne(
    { email: 'admin@blog.com' },
    { $set: { name: 'Blog Admin', email: 'admin@blog.com', password, role: 'admin' } },
    { upsert: true },
  );
  console.log('[SEED] Admin user created');

  // Seed categories
  const categoryCount = await Category.countDocuments();
  if (categoryCount === 0) {
    await Category.insertMany(CATEGORIES);
    console.log('[SEED] Categories created');
  }

  // Seed articles
  const articleCount = await Article.countDocuments();
  if (articleCount === 0) {
    const cats = await Category.find();
    const catMap = new Map(cats.map((c) => [c.slug, c._id]));

    const categorySlugs = ['technology', 'lifestyle', 'travel', 'business', 'personal-development', 'technology', 'lifestyle', 'education', 'travel', 'personal-development'];

    const articlesWithRefs = ARTICLES.map((a, i) => ({
      ...a,
      category: catMap.get(categorySlugs[i]) || cats[0]._id,
      status: 'published' as const,
      publishedAt: new Date(Date.now() - (i * 86400000 * 3)),
    }));

    await Article.insertMany(articlesWithRefs);
    console.log('[SEED] Articles created');
  }

  // Seed comments
  const commentCount = await Comment.countDocuments();
  if (commentCount === 0) {
    const articles = await Article.find().limit(COMMENTS.length);
    const commentsWithRefs = COMMENTS.map((c, i) => ({
      ...c,
      articleId: articles[i % articles.length]._id,
    }));
    await Comment.insertMany(commentsWithRefs);
    console.log('[SEED] Comments created');
  }

  // Seed subscribers
  const subscriberCount = await Subscriber.countDocuments();
  if (subscriberCount === 0) {
    await Subscriber.insertMany(SUBSCRIBERS);
    console.log('[SEED] Subscribers created');
  }

  console.log('[SEED] Database seeding complete');
}
