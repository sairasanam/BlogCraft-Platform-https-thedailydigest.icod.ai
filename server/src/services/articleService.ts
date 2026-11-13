import Article, { type IArticle } from '../models/Article';

interface ArticleFilters {
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export async function getArticles(filters: ArticleFilters): Promise<{ articles: IArticle[]; total: number; page: number; pages: number }> {
  const { search, category, status, page = 1, limit = 9 } = filters;
  const query: Record<string, unknown> = {};

  if (status) {
    query.status = status;
  } else {
    query.status = 'published';
  }

  if (category) {
    query.category = category;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;
  const [articles, total] = await Promise.all([
    Article.find(query).populate('category', 'name slug').sort({ publishedAt: -1 }).skip(skip).limit(limit),
    Article.countDocuments(query),
  ]);

  return { articles, total, page, pages: Math.ceil(total / limit) };
}

export async function getArticleBySlug(slug: string): Promise<IArticle | null> {
  const article = await Article.findOne({ slug }).populate('category', 'name slug');
  if (article) {
    article.views += 1;
    await article.save();
  }
  return article;
}

export async function getArticleById(id: string): Promise<IArticle | null> {
  return Article.findById(id).populate('category', 'name slug');
}

export async function createArticle(data: Partial<IArticle>): Promise<IArticle> {
  if (data.status === 'published') {
    data.publishedAt = new Date();
  }
  return Article.create(data);
}

export async function updateArticle(id: string, data: Partial<IArticle>): Promise<IArticle | null> {
  if (data.status === 'published' && !data.publishedAt) {
    data.publishedAt = new Date();
  }
  return Article.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('category', 'name slug');
}

export async function deleteArticle(id: string): Promise<boolean> {
  const result = await Article.findByIdAndDelete(id);
  return !!result;
}

export async function getRelatedArticles(categoryId: string, excludeId: string, limit = 3): Promise<IArticle[]> {
  return Article.find({
    category: categoryId,
    _id: { $ne: excludeId },
    status: 'published',
  })
    .populate('category', 'name slug')
    .sort({ publishedAt: -1 })
    .limit(limit);
}

export async function getPopularArticles(limit = 5): Promise<IArticle[]> {
  return Article.find({ status: 'published' })
    .populate('category', 'name slug')
    .sort({ views: -1 })
    .limit(limit);
}

export async function getFeaturedArticle(): Promise<IArticle | null> {
  return Article.findOne({ status: 'published' })
    .populate('category', 'name slug')
    .sort({ views: -1 });
}

export async function getTotalViews(): Promise<number> {
  const result = await Article.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]);
  return result.length > 0 ? result[0].total : 0;
}
