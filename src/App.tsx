import { Routes, Route, Navigate } from "react-router-dom";

import './config/i18n';
import Articles from "./pages/Articles";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Course from "./pages/Course";
import AboutAuthor from "./pages/AboutAuthor";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import HomePage from "./pages/HomePage";
import Books from "./pages/Books";
import SearchResultsPage from "./pages/SearchResultsPage";
import Error from "./pages/Error";
import PageNotFound from "./pages/PageNotFound";
import Contact from "./pages/Contact";
import ArticlesArchives from "./pages/ArticlesArchives";
import Blog from "./pages/Blog";
import BlogArticles from "./pages/BlogArticles";
import i18n from './config/i18n';

// Lista de idiomas permitidos
const supportedLanguages = ['en', 'ca', 'es', 'it', 'fr'];

function App() { 
  const userLang = i18n.language;
  const redirectLang = supportedLanguages.includes(userLang) ? userLang : 'en';
 
  return (
    <>
      <NavBar />
      <div className="principal">
        <Routes>
        <Route path="/" element={<Navigate to={`/${redirectLang}/homepage`} />} />
          <Route path="/en" element={<Navigate to="/en/homepage" />} />
          <Route path="/ca" element={<Navigate to="/ca/homepage" />} />
          <Route path="/es" element={<Navigate to="/es/homepage" />} />
          <Route path="/it" element={<Navigate to="/it/homepage" />} />
          <Route path="/fr" element={<Navigate to="/fr/homepage" />} />

          <Route path="/homepage" element={<Navigate to="/en/homepage" />} />

          <Route path="/:lang/homepage" element={<HomePage />} />
          <Route path="/:lang/course/:nameCourse/" element={<Course />} />
          <Route path="/:lang/article/:nameArticle" element={<Articles />} />

          <Route
            path="/:lang/history-archives"
            element={<ArticlesArchives />}
          />

          <Route path="/:lang/about-author" element={<AboutAuthor />} />
          <Route path="/:lang/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/:lang/contact" element={<Contact />} />

          <Route
            path="/about-author"
            element={<Navigate to="/en/about-author" />}
          />
          <Route
            path="/privacy-policy"
            element={<Navigate to="/en/privacy-policy" />}
          />
          <Route path="/contact" element={<Navigate to="/en/contact" />} />

          <Route path="/:lang/books" element={<Books />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:blogArticle" element={<BlogArticles />} />

          <Route path="/:lang/search-results" element={<SearchResultsPage />} />

          <Route path="/error" element={<Error />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
