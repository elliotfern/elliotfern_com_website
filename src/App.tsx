import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import i18n from "./config/i18n";
import React, { useEffect } from "react";
import ReactGA from "react-ga4";

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
import Links from "./pages/Links";
import CookieBanner from "./components/CookieBanner";
import BookAuthors from "./pages/BookAuthors"
import BookDetails from "./pages/BookDetails"
import BookAuthorDetails from "./pages/BookAuthorDetails";

// Lista de idiomas permitidos
const supportedLanguages = ["en", "ca", "es", "it", "fr"];

function App() {
  const location = useLocation();
  const userLang = i18n.language;
  const redirectLang = supportedLanguages.includes(userLang) ? userLang : "en";

  const getCookie = (name: string): string | null => {
    const cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].split("=");
      if (name === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  };

  useEffect(() => {
    // Verificar si las cookies ya fueron aceptadas
    const cookiesAccepted = getCookie("cookiesAccepted");

    if (cookiesAccepted === "true") {
      // Inicializar Google Analytics solo una vez
      ReactGA.initialize("G-0L7VP04REK", {
        gaOptions: {
          anonymizeIp: true,
        },
      });
    }
  }, []); // Solo ejecutar al montar el componente

  useEffect(() => {
    const cookiesAccepted = getCookie("cookiesAccepted");

    if (cookiesAccepted === "true") {
      // Enviar un pageview cada vez que cambie location.pathname
      ReactGA.send({ hitType: "pageview", page: location.pathname });
    }
  }, [location.pathname]); // Ejecutar cuando cambie location.pathname

  return (
    <>
      <NavBar />
      <CookieBanner /> {/* Asegúrate de renderizar el banner de cookies */}
      <div className="principal">
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/${redirectLang}/homepage`} />}
          />
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

          <Route path="/:lang/links" element={<Links />} />

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
          <Route path="/:lang/books/:slug" element={<BookDetails />} />
          <Route path="/:lang/authors" element={<BookAuthors />} />
          <Route path="/:lang/authors/:slug" element={<BookAuthorDetails />} />

          <Route path="/blog" element={<Navigate to="/en/blog" />} />
          <Route path="/:lang/blog" element={<Blog />} />
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
