import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Eye, MessageCircle, Users, Plus, Trash2, Edit3,
  Check, X, LayoutDashboard, FolderOpen, LogOut, Save, Image as ImageIcon,
} from 'lucide-react';
import { Button, Card, Input, Field, Spinner, Alert, Modal, EmptyState } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { fetchArticles, createArticle, updateArticle, deleteArticle, fetchStats } from '@/services/articleService';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '@/services/categoryService';
import { fetchAllComments, approveComment, deleteCommentApi } from '@/services/commentService';
import { fetchSubscribers, deleteSubscriber } from '@/services/subscriberService';
import type { Article, Category, Comment, Subscriber } from '@/types';

type Tab = 'dashboard' | 'articles' | 'editor' | 'categories' | 'comments' | 'subscribers';

export default function Admin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState({ totalArticles: 0, totalViews: 0, totalComments: 0, totalSubscribers: 0 });
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  // Editor state
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editorTitle, setEditorTitle] = useState('');
  const [editorSlug, setEditorSlug] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [editorExcerpt, setEditorExcerpt] = useState('');
  const [editorCategory, setEditorCategory] = useState('');
  const [editorAuthor, setEditorAuthor] = useState('');
  const [editorStatus, setEditorStatus] = useState<'draft' | 'published' | 'scheduled'>('draft');
  const [editorImage, setEditorImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  // Category editor
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [editingCat, setEditingCat] = useState<Category | null>(null);

  async function loadDashboardData() {
    setLoading(true);
    try {
      const [artRes, catRes, comRes, subRes, statsRes] = await Promise.all([
        fetchArticles({ status: '', limit: 100 }),
        fetchCategories(),
        fetchAllComments(),
        fetchSubscribers(),
        fetchStats(),
      ]);
      if (artRes.success && artRes.data) {
        setArticles(artRes.data.articles);
        setStats((s) => ({ ...s, totalArticles: artRes.data!.total }));
      }
      if (catRes.success && catRes.data) setCategories(catRes.data);
      if (comRes.success && comRes.data) {
        setComments(comRes.data);
        setStats((s) => ({ ...s, totalComments: comRes.data!.length }));
      }
      if (subRes.success && subRes.data) {
        setSubscribers(subRes.data);
        setStats((s) => ({ ...s, totalSubscribers: subRes.data!.length }));
      }
      if (statsRes.success && statsRes.data) {
        setStats((s) => ({ ...s, totalViews: statsRes.data!.totalViews }));
      }
    } catch { /* handled */ }
    setLoading(false);
  }

  useEffect(() => { loadDashboardData(); }, []);

  function handleLogout() {
    dispatch(logout());
    navigate('/login');
  }

  function openEditor(article?: Article) {
    if (article) {
      setEditingArticle(article);
      setEditorTitle(article.title);
      setEditorSlug(article.slug);
      setEditorContent(article.content);
      setEditorExcerpt(article.excerpt);
      setEditorCategory(typeof article.category === 'string' ? article.category : article.category._id);
      setEditorAuthor(article.author);
      setEditorStatus(article.status);
    } else {
      setEditingArticle(null);
      setEditorTitle('');
      setEditorSlug('');
      setEditorContent('');
      setEditorExcerpt('');
      setEditorCategory(categories[0]?._id || '');
      setEditorAuthor('');
      setEditorStatus('draft');
    }
    setEditorImage(null);
    setTab('editor');
  }

  async function saveArticle() {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', editorTitle);
      formData.append('slug', editorSlug);
      formData.append('content', editorContent);
      formData.append('excerpt', editorExcerpt);
      formData.append('category', editorCategory);
      formData.append('author', editorAuthor);
      formData.append('status', editorStatus);
      if (editorImage) formData.append('featuredImage', editorImage);

      if (editingArticle) {
        await updateArticle(editingArticle._id, formData);
      } else {
        await createArticle(formData);
      }
      setTab('articles');
      loadDashboardData();
    } catch { /* handled */ }
    setSaving(false);
  }

  async function handleDeleteArticle(id: string) {
    if (!confirm('Delete this article?')) return;
    await deleteArticle(id);
    loadDashboardData();
  }

  async function handleSaveCategory(e: React.FormEvent) {
    e.preventDefault();
    if (editingCat) {
      await updateCategory(editingCat._id, { name: catName, slug: catSlug, description: catDesc });
    } else {
      await createCategory(catName, catSlug, catDesc);
    }
    setCatName('');
    setCatSlug('');
    setCatDesc('');
    setEditingCat(null);
    loadDashboardData();
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm('Delete this category?')) return;
    await deleteCategory(id);
    loadDashboardData();
  }

  async function handleApproveComment(id: string) {
    await approveComment(id);
    loadDashboardData();
  }

  async function handleDeleteComment(id: string) {
    if (!confirm('Delete this comment?')) return;
    await deleteCommentApi(id);
    loadDashboardData();
  }

  async function handleDeleteSubscriber(id: string) {
    if (!confirm('Remove this subscriber?')) return;
    await deleteSubscriber(id);
    loadDashboardData();
  }

  const tabs: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { key: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { key: 'articles', label: 'Articles', icon: FileText },
    { key: 'categories', label: 'Categories', icon: FolderOpen },
    { key: 'comments', label: 'Comments', icon: MessageCircle },
    { key: 'subscribers', label: 'Subscribers', icon: Users },
  ];

  if (loading) return (
    <div
      className="flex min-h-screen items-center justify-center"
      data-icod-id="src_pages_admin_tsx_868d"><Spinner size="lg" data-icod-id="src_pages_admin_tsx_d785" /></div>
  );

  return (
    <div
      className="min-h-screen bg-background"
      data-icod-id="src_pages_admin_tsx_e94b">
      <div
        className="flex flex-col lg:flex-row"
        data-icod-id="src_pages_admin_tsx_4309">
        {/* Sidebar */}
        <aside
          className="w-full border-b border-border bg-muted/20 lg:w-64 lg:min-h-screen lg:border-b-0 lg:border-r"
          data-icod-id="src_pages_admin_tsx_815f">
          <div className="p-4" data-icod-id="src_pages_admin_tsx_f6a4">
            <h2
              className="mb-4 text-lg font-bold text-foreground"
              data-icod-id="src_pages_admin_tsx_45a9">Admin Panel</h2>
            <nav
              className="flex flex-wrap gap-1 lg:flex-col"
              data-icod-id="src_pages_admin_tsx_6b1c">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    tab === t.key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                  data-icod-id={`src_pages_admin_tsx_5d71_${t.key}`}>
                  <t.icon className="h-4 w-4" />
                  {t.label}
                </button>
              ))}
            </nav>
            <div
              className="mt-4 border-t border-border pt-4"
              data-icod-id="src_pages_admin_tsx_d0df">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="w-full justify-start"
                data-icod-id="src_pages_admin_tsx_fe85">
                <LogOut className="mr-2 h-4 w-4" data-icod-id="src_pages_admin_tsx_fb23" /> Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main
          className="flex-1 p-4 sm:p-6 lg:p-8"
          data-icod-id="src_pages_admin_tsx_304c">
          {tab === 'dashboard' && (
            <div data-icod-id="src_pages_admin_tsx_3e66">
              <h1
                className="mb-6 text-2xl font-bold text-foreground"
                data-icod-id="src_pages_admin_tsx_767e">Dashboard Overview</h1>
              <div
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                data-icod-id="src_pages_admin_tsx_b7c1">
                <Card className="p-5" data-icod-id="src_pages_admin_tsx_5dc0">
                  <div
                    className="flex items-center gap-3"
                    data-icod-id="src_pages_admin_tsx_3f6e">
                    <FileText className="h-8 w-8 text-primary" data-icod-id="src_pages_admin_tsx_72cf" />
                    <div data-icod-id="src_pages_admin_tsx_19ee">
                      <p
                        className="text-2xl font-bold text-foreground"
                        data-icod-id="src_pages_admin_tsx_04c8">{stats.totalArticles}</p>
                      <p
                        className="text-xs text-muted-foreground"
                        data-icod-id="src_pages_admin_tsx_1352">Total Articles</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-5" data-icod-id="src_pages_admin_tsx_c4b3">
                  <div
                    className="flex items-center gap-3"
                    data-icod-id="src_pages_admin_tsx_d6dd">
                    <Eye className="h-8 w-8 text-primary" data-icod-id="src_pages_admin_tsx_bc90" />
                    <div data-icod-id="src_pages_admin_tsx_5b84">
                      <p
                        className="text-2xl font-bold text-foreground"
                        data-icod-id="src_pages_admin_tsx_03da">{stats.totalViews}</p>
                      <p
                        className="text-xs text-muted-foreground"
                        data-icod-id="src_pages_admin_tsx_927b">Total Views</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-5" data-icod-id="src_pages_admin_tsx_7bce">
                  <div
                    className="flex items-center gap-3"
                    data-icod-id="src_pages_admin_tsx_398a">
                    <MessageCircle className="h-8 w-8 text-primary" data-icod-id="src_pages_admin_tsx_3370" />
                    <div data-icod-id="src_pages_admin_tsx_5f64">
                      <p
                        className="text-2xl font-bold text-foreground"
                        data-icod-id="src_pages_admin_tsx_cddb">{stats.totalComments}</p>
                      <p
                        className="text-xs text-muted-foreground"
                        data-icod-id="src_pages_admin_tsx_9160">Comments</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-5" data-icod-id="src_pages_admin_tsx_fad3">
                  <div
                    className="flex items-center gap-3"
                    data-icod-id="src_pages_admin_tsx_780a">
                    <Users className="h-8 w-8 text-primary" data-icod-id="src_pages_admin_tsx_ea21" />
                    <div data-icod-id="src_pages_admin_tsx_15de">
                      <p
                        className="text-2xl font-bold text-foreground"
                        data-icod-id="src_pages_admin_tsx_d90f">{stats.totalSubscribers}</p>
                      <p
                        className="text-xs text-muted-foreground"
                        data-icod-id="src_pages_admin_tsx_da8b">Subscribers</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {tab === 'articles' && (
            <div data-icod-id="src_pages_admin_tsx_b4b7">
              <div
                className="mb-6 flex items-center justify-between"
                data-icod-id="src_pages_admin_tsx_a05e">
                <h1
                  className="text-2xl font-bold text-foreground"
                  data-icod-id="src_pages_admin_tsx_c38b">Articles</h1>
                <Button onClick={() => openEditor()} data-icod-id="src_pages_admin_tsx_0281"><Plus className="mr-2 h-4 w-4" data-icod-id="src_pages_admin_tsx_7472" /> New Article</Button>
              </div>
              {articles.length === 0 ? (
                <EmptyState
                  title="No articles yet"
                  description="Create your first article."
                  action={<Button onClick={() => openEditor()} data-icod-id="src_pages_admin_tsx_032b">Create Article</Button>}
                  data-icod-id="src_pages_admin_tsx_ba23" />
              ) : (
                <div className="space-y-3" data-icod-id="src_pages_admin_tsx_ce4c">
                  {articles.map((a) => (
                    <Card
                      key={a._id}
                      className="flex items-center justify-between p-4"
                      data-icod-id={`src_pages_admin_tsx_ce3d_${a._id}`}>
                      <div
                        className="min-w-0 flex-1"
                        data-icod-id={`src_pages_admin_tsx_3b97_${a._id}`}>
                        <h3
                          className="truncate font-semibold text-foreground"
                          data-icod-id={`src_pages_admin_tsx_bebd_${a._id}`}>{a.title}</h3>
                        <p
                          className="text-xs text-muted-foreground"
                          data-icod-id={`src_pages_admin_tsx_5d24_${a._id}`}>
                          {a.status} &middot; {new Date(a.createdAt).toLocaleDateString()} &middot; {a.views} views
                        </p>
                      </div>
                      <div
                        className="ml-4 flex shrink-0 gap-1"
                        data-icod-id={`src_pages_admin_tsx_39bb_${a._id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Edit"
                          onClick={() => openEditor(a)}
                          data-icod-id={`src_pages_admin_tsx_4438_${a._id}`}>
                          <Edit3 className="h-4 w-4" data-icod-id={`src_pages_admin_tsx_349a_${a._id}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Delete"
                          onClick={() => handleDeleteArticle(a._id)}
                          data-icod-id={`src_pages_admin_tsx_9f12_${a._id}`}>
                          <Trash2 className="h-4 w-4" data-icod-id={`src_pages_admin_tsx_df99_${a._id}`} />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'editor' && (
            <div data-icod-id="src_pages_admin_tsx_1fb4">
              <div
                className="mb-6 flex items-center justify-between"
                data-icod-id="src_pages_admin_tsx_25a1">
                <h1
                  className="text-2xl font-bold text-foreground"
                  data-icod-id="src_pages_admin_tsx_5fcf">{editingArticle ? 'Edit Article' : 'New Article'}</h1>
                <Button
                  variant="ghost"
                  onClick={() => setTab('articles')}
                  data-icod-id="src_pages_admin_tsx_1927">Cancel</Button>
              </div>
              <div className="space-y-4" data-icod-id="src_pages_admin_tsx_a08a">
                <Field label="Title" required data-icod-id="src_pages_admin_tsx_ca37">
                  <Input
                    value={editorTitle}
                    onChange={(e) => setEditorTitle(e.target.value)}
                    placeholder="Article title"
                    data-icod-id="src_pages_admin_tsx_cfb4" />
                </Field>
                <Field label="Slug" required data-icod-id="src_pages_admin_tsx_078a">
                  <Input
                    value={editorSlug}
                    onChange={(e) => setEditorSlug(e.target.value)}
                    placeholder="url-friendly-slug"
                    data-icod-id="src_pages_admin_tsx_60dc" />
                </Field>
                <div
                  className="grid gap-4 sm:grid-cols-2"
                  data-icod-id="src_pages_admin_tsx_aa2c">
                  <Field label="Author" required data-icod-id="src_pages_admin_tsx_ad3e">
                    <Input
                      value={editorAuthor}
                      onChange={(e) => setEditorAuthor(e.target.value)}
                      placeholder="Author name"
                      data-icod-id="src_pages_admin_tsx_7b17" />
                  </Field>
                  <Field label="Category" required data-icod-id="src_pages_admin_tsx_6263">
                    <select
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      value={editorCategory}
                      onChange={(e) => setEditorCategory(e.target.value)}
                      data-icod-id="src_pages_admin_tsx_204f">
                      <option value="" data-icod-id="src_pages_admin_tsx_30fa">Select category</option>
                      {categories.map((c) => <option
                        key={c._id}
                        value={c._id}
                        data-icod-id={`src_pages_admin_tsx_dd85_${c._id}`}>{c.name}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Status" data-icod-id="src_pages_admin_tsx_896e">
                  <select
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    value={editorStatus}
                    onChange={(e) => setEditorStatus(e.target.value as 'draft' | 'published' | 'scheduled')}
                    data-icod-id="src_pages_admin_tsx_b720">
                    <option value="draft" data-icod-id="src_pages_admin_tsx_2aa9">Draft</option>
                    <option value="published" data-icod-id="src_pages_admin_tsx_fe05">Published</option>
                    <option value="scheduled" data-icod-id="src_pages_admin_tsx_6734">Scheduled</option>
                  </select>
                </Field>
                <Field label="Excerpt" data-icod-id="src_pages_admin_tsx_56d0">
                  <textarea
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    rows={2}
                    value={editorExcerpt}
                    onChange={(e) => setEditorExcerpt(e.target.value)}
                    placeholder="Short description..."
                    data-icod-id="src_pages_admin_tsx_2923" />
                </Field>
                <Field label="Featured Image" data-icod-id="src_pages_admin_tsx_a1c0">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditorImage(e.target.files?.[0] || null)}
                    className="text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                    data-icod-id="src_pages_admin_tsx_74ba" />
                </Field>
                <Field label="Content (HTML)" required data-icod-id="src_pages_admin_tsx_29dd">
                  <textarea
                    className="min-h-[300px] w-full rounded-lg border border-input bg-background px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    rows={15}
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    placeholder="<h2>Heading</h2>&#10;<p>Paragraph content...</p>"
                    data-icod-id="src_pages_admin_tsx_6849" />
                </Field>
                <div className="flex gap-3 pt-2" data-icod-id="src_pages_admin_tsx_e464">
                  <Button
                    onClick={saveArticle}
                    loading={saving}
                    data-icod-id="src_pages_admin_tsx_ed32"><Save className="mr-2 h-4 w-4" data-icod-id="src_pages_admin_tsx_5a2e" /> Save Article</Button>
                  <Button
                    variant="outline"
                    onClick={() => setTab('articles')}
                    data-icod-id="src_pages_admin_tsx_5774">Cancel</Button>
                </div>
              </div>
            </div>
          )}

          {tab === 'categories' && (
            <div data-icod-id="src_pages_admin_tsx_cce9">
              <h1
                className="mb-6 text-2xl font-bold text-foreground"
                data-icod-id="src_pages_admin_tsx_73d6">Categories</h1>
              <Card className="mb-6 p-5" data-icod-id="src_pages_admin_tsx_f8e0">
                <h3
                  className="mb-3 font-semibold text-foreground"
                  data-icod-id="src_pages_admin_tsx_1885">{editingCat ? 'Edit Category' : 'Add Category'}</h3>
                <form
                  onSubmit={handleSaveCategory}
                  className="space-y-3"
                  data-icod-id="src_pages_admin_tsx_5eee">
                  <Field label="Name" required data-icod-id="src_pages_admin_tsx_3178">
                    <Input
                      value={catName}
                      onChange={(e) => setCatName(e.target.value)}
                      placeholder="Category name"
                      required
                      data-icod-id="src_pages_admin_tsx_7ebf" />
                  </Field>
                  <Field label="Slug" required data-icod-id="src_pages_admin_tsx_5780">
                    <Input
                      value={catSlug}
                      onChange={(e) => setCatSlug(e.target.value)}
                      placeholder="category-slug"
                      required
                      data-icod-id="src_pages_admin_tsx_3581" />
                  </Field>
                  <Field label="Description" data-icod-id="src_pages_admin_tsx_ebac">
                    <Input
                      value={catDesc}
                      onChange={(e) => setCatDesc(e.target.value)}
                      placeholder="Brief description"
                      data-icod-id="src_pages_admin_tsx_97b5" />
                  </Field>
                  <div className="flex gap-2" data-icod-id="src_pages_admin_tsx_1a02">
                    <Button type="submit" size="sm" data-icod-id="src_pages_admin_tsx_e72e">{editingCat ? 'Update' : 'Add'}</Button>
                    {editingCat && <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => { setEditingCat(null); setCatName(''); setCatSlug(''); setCatDesc(''); }}
                      data-icod-id="src_pages_admin_tsx_2db3">Cancel</Button>}
                  </div>
                </form>
              </Card>
              <div className="space-y-2" data-icod-id="src_pages_admin_tsx_c738">
                {categories.map((c) => (
                  <Card
                    key={c._id}
                    className="flex items-center justify-between p-3"
                    data-icod-id={`src_pages_admin_tsx_bf75_${c._id}`}>
                    <div data-icod-id={`src_pages_admin_tsx_80fe_${c._id}`}>
                      <span
                        className="font-semibold text-foreground"
                        data-icod-id={`src_pages_admin_tsx_d782_${c._id}`}>{c.name}</span>
                      <span
                        className="ml-2 text-xs text-muted-foreground"
                        data-icod-id={`src_pages_admin_tsx_1f5d_${c._id}`}>/{c.slug}</span>
                    </div>
                    <div className="flex gap-1" data-icod-id={`src_pages_admin_tsx_bce1_${c._id}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Edit"
                        onClick={() => { setEditingCat(c); setCatName(c.name); setCatSlug(c.slug); setCatDesc(c.description); }}
                        data-icod-id={`src_pages_admin_tsx_89d6_${c._id}`}>
                        <Edit3 className="h-4 w-4" data-icod-id={`src_pages_admin_tsx_36d0_${c._id}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete"
                        onClick={() => handleDeleteCategory(c._id)}
                        data-icod-id={`src_pages_admin_tsx_50a4_${c._id}`}>
                        <Trash2 className="h-4 w-4" data-icod-id={`src_pages_admin_tsx_453b_${c._id}`} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {tab === 'comments' && (
            <div data-icod-id="src_pages_admin_tsx_e0af">
              <h1
                className="mb-6 text-2xl font-bold text-foreground"
                data-icod-id="src_pages_admin_tsx_3118">Comments</h1>
              {comments.length === 0 ? (
                <EmptyState
                  title="No comments"
                  description="Comments will appear here once readers submit them."
                  data-icod-id="src_pages_admin_tsx_fc00" />
              ) : (
                <div className="space-y-3" data-icod-id="src_pages_admin_tsx_0d6e">
                  {comments.map((c) => (
                    <Card
                      key={c._id}
                      className="p-4"
                      data-icod-id={`src_pages_admin_tsx_3c60_${c._id}`}>
                      <div
                        className="mb-2 flex items-center justify-between"
                        data-icod-id={`src_pages_admin_tsx_315f_${c._id}`}>
                        <div data-icod-id={`src_pages_admin_tsx_0fa1_${c._id}`}>
                          <span
                            className="font-semibold text-foreground"
                            data-icod-id={`src_pages_admin_tsx_75d5_${c._id}`}>{c.author}</span>
                          <span
                            className="ml-2 text-xs text-muted-foreground"
                            data-icod-id={`src_pages_admin_tsx_7523_${c._id}`}>{c.email}</span>
                        </div>
                        <div
                          className="flex items-center gap-2"
                          data-icod-id={`src_pages_admin_tsx_0f85_${c._id}`}>
                          {!c.approved && <span
                            className="rounded bg-warning/20 px-2 py-0.5 text-xs font-medium text-warning"
                            data-icod-id={`src_pages_admin_tsx_bc50_${c._id}`}>Pending</span>}
                          {c.approved && <span
                            className="rounded bg-success/20 px-2 py-0.5 text-xs font-medium text-success"
                            data-icod-id={`src_pages_admin_tsx_74e1_${c._id}`}>Approved</span>}
                        </div>
                      </div>
                      <p
                        className="mb-2 text-sm text-muted-foreground"
                        data-icod-id={`src_pages_admin_tsx_df10_${c._id}`}>{c.content}</p>
                      <p
                        className="mb-3 text-xs text-muted-foreground"
                        data-icod-id={`src_pages_admin_tsx_5936_${c._id}`}>
                        Article: {typeof c.articleId === 'string' ? c.articleId : (c.articleId as Article).title}
                      </p>
                      <div className="flex gap-1" data-icod-id={`src_pages_admin_tsx_41be_${c._id}`}>
                        {!c.approved && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApproveComment(c._id)}
                            data-icod-id={`src_pages_admin_tsx_1a54_${c._id}`}>
                            <Check
                              className="mr-1 h-3 w-3"
                              data-icod-id={`src_pages_admin_tsx_040f_${c._id}`} /> Approve
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteComment(c._id)}
                          data-icod-id={`src_pages_admin_tsx_4c12_${c._id}`}>
                          <Trash2
                            className="mr-1 h-3 w-3"
                            data-icod-id={`src_pages_admin_tsx_f0e5_${c._id}`} /> Delete
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'subscribers' && (
            <div data-icod-id="src_pages_admin_tsx_9856">
              <div
                className="mb-6 flex items-center justify-between"
                data-icod-id="src_pages_admin_tsx_9f57">
                <h1
                  className="text-2xl font-bold text-foreground"
                  data-icod-id="src_pages_admin_tsx_e0fd">Subscribers</h1>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const csv = 'Email,Date\n' + subscribers.map((s) => `${s.email},${new Date(s.createdAt).toLocaleDateString()}`).join('\n');
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'subscribers.csv';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  data-icod-id="src_pages_admin_tsx_e504">Export CSV</Button>
              </div>
              {subscribers.length === 0 ? (
                <EmptyState
                  title="No subscribers"
                  description="Newsletter subscribers will appear here."
                  data-icod-id="src_pages_admin_tsx_7ff9" />
              ) : (
                <div className="space-y-2" data-icod-id="src_pages_admin_tsx_6334">
                  {subscribers.map((s) => (
                    <Card
                      key={s._id}
                      className="flex items-center justify-between p-3"
                      data-icod-id={`src_pages_admin_tsx_b879_${s._id}`}>
                      <div data-icod-id={`src_pages_admin_tsx_ada1_${s._id}`}>
                        <span
                          className="text-foreground"
                          data-icod-id={`src_pages_admin_tsx_c2bf_${s._id}`}>{s.email}</span>
                        <span
                          className="ml-2 text-xs text-muted-foreground"
                          data-icod-id={`src_pages_admin_tsx_e959_${s._id}`}>{new Date(s.createdAt).toLocaleDateString()}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Remove"
                        onClick={() => handleDeleteSubscriber(s._id)}
                        data-icod-id={`src_pages_admin_tsx_7685_${s._id}`}>
                        <Trash2 className="h-4 w-4" data-icod-id={`src_pages_admin_tsx_5c28_${s._id}`} />
                      </Button>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
