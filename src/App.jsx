import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
//import { AuthContext } from './context/auth.context';

import Articles from "./pages/Articles"
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Course from './pages/Course'
import AboutAuthor from './pages/AboutAuthor'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ProfileEdit from './pages/ProfileEdit'
import PrivacyPolicy from './pages/PrivacyPolicy'
import IsPrivate from './components/isPrivate'
import HomePage from './pages/HomePage';
import Books from './pages/Books';
import SearchResultsPage from './pages/SearchResultsPage';

import Error from './pages/Error';
import PageNotFound from './pages/PageNotFound';
import Contact from './pages/Contact';
import ArticlesArchives from './pages/ArticlesArchives';
import Blog from './pages/Blog';
import BlogArticles from './pages/BlogArticles';

function App() {
  //const { isUserActive, userLang, langUrlDinamico } = useContext(AuthContext);

  const isUserActive = false;
  const userLang = "en";
  const langUrlDinamico = "en";

  //estado para controlar los cambios en userLang
  const [userLangRedirect, setUserLangRedirect] = useState("")

  useEffect(() => {
    setUserLangRedirect(userLang)
  }, []); // 

  useEffect(() => {
    setUserLangRedirect(userLang)
  }, [userLang])


  return (
    <>
      <NavBar lang={isUserActive ? userLang : langUrlDinamico} />
      <div className="principal">
        <Routes>

          {isUserActive ?
            (
              <>
                <Route path="/" element={<Navigate to={`/${userLang}/homepage`} />} />
              </>
            )
            : (
              <>
                <Route path="/" element={<Navigate to="/en/homepage" />} />
              </>
            )

          }

          <Route path="/en" element={<Navigate to="/en/homepage" />} />
          <Route path="/ca" element={<Navigate to="/ca/homepage" />} />
          <Route path="/es" element={<Navigate to="/es/homepage" />} />
          <Route path="/it" element={<Navigate to="/it/homepage" />} />
          <Route path="/fr" element={<Navigate to="/fr/homepage" />} />

          <Route path="/homepage" element={<Navigate to="/en/homepage" />} />

          <Route path="/:lang/homepage" element={<HomePage />} />
          <Route path="/:lang/course/:nameCourse/" element={<Course />} />
          <Route path="/:lang/article/:nameArticle" element={<Articles />} />

          <Route path="/:lang/history-archives" element={<ArticlesArchives />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<IsPrivate> <Profile /> </IsPrivate>} />
          <Route path="/profile/edit" element={<IsPrivate> <ProfileEdit /> </IsPrivate>} />

          <Route path="/:lang/about-author" element={<AboutAuthor />} />
          <Route path="/:lang/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/:lang/contact" element={<Contact />} />

          <Route path="/about-author" element={<Navigate to="/en/about-author" />} />
          <Route path="/privacy-policy" element={<Navigate to="/en/privacy-policy" />} />
          <Route path="/contact" element={<Navigate to="/en/contact" />} />

          <Route path="/books" element={<Books />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:blogArticle" element={<BlogArticles />} />

          <Route path="/:lang/search-results" element={<SearchResultsPage />} />

          <Route path="/error" element={<Error />} />
          <Route path="*" element={<PageNotFound />} />

        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App;