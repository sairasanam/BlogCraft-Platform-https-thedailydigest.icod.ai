import Category, { type ICategory } from '../models/Category';

export async function getCategories(): Promise<ICategory[]> {
  return Category.find().sort({ name: 1 });
}

export async function getCategoryBySlug(slug: string): Promise<ICategory | null> {
  return Category.findOne({ slug });
}

export async function getCategoryById(id: string): Promise<ICategory | null> {
  return Category.findById(id);
}

export async function createCategory(name: string, slug: string, description: string): Promise<ICategory> {
  const existing = await Category.findOne({ slug });
  if (existing) throw Object.assign(new Error('Category slug already exists'), { statusCode: 400 });
  return Category.create({ name, slug, description });
}

export async function updateCategory(id: string, data: Partial<ICategory>): Promise<ICategory | null> {
  return Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteCategory(id: string): Promise<boolean> {
  const result = await Category.findByIdAndDelete(id);
  return !!result;
}
