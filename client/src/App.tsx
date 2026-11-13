import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import Home from '@/pages/Home';
import Blog from '@/pages/Blog';
import ArticleDetail from '@/pages/ArticleDetail';
import About from '@/pages/About';
import Categories from '@/pages/Categories';
import CategoryDetail from '@/pages/CategoryDetail';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <div
        className="flex min-h-screen flex-col bg-background text-foreground"
        data-icod-id="src_app_tsx_88e7">
        <Routes>
          {/* Login has no layout chrome */}
          <Route path="/login" element={<Login data-icod-id="src_app_tsx_8da5" />} />
          {/* Admin has its own sidebar layout */}
          <Route path="/admin" element={<ProtectedRoute data-icod-id="src_app_tsx_e9c1"><Admin data-icod-id="src_app_tsx_0329" /></ProtectedRoute>} />
          {/* All other pages share navbar + footer */}
          <Route path="*" element={
            <>
              <Navbar data-icod-id="src_app_tsx_a11c" />
              <main className="flex-1" data-icod-id="src_app_tsx_6b99">
                <Routes>
                  <Route path="/" element={<Home data-icod-id="src_app_tsx_0e0f" />} />
                  <Route path="/blog" element={<Blog data-icod-id="src_app_tsx_3c6a" />} />
                  <Route path="/blog/:slug" element={<ArticleDetail data-icod-id="src_app_tsx_ce53" />} />
                  <Route path="/about" element={<About data-icod-id="src_app_tsx_a00d" />} />
                  <Route path="/categories" element={<Categories data-icod-id="src_app_tsx_31b2" />} />
                  <Route path="/categories/:slug" element={<CategoryDetail data-icod-id="src_app_tsx_da4b" />} />
                  <Route path="/contact" element={<Contact data-icod-id="src_app_tsx_c121" />} />
                  <Route path="*" element={<NotFound data-icod-id="src_app_tsx_7381" />} />
                </Routes>
              </main>
              <Footer data-icod-id="src_app_tsx_54fa" />
              <BackToTop data-icod-id="src_app_tsx_5880" />
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
