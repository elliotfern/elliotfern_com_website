import { Routes, Route, Navigate, Switch } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './context/auth.context';
import { Container } from 'react-bootstrap';

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

function App() {
  const { isUserActive, userLang, langUrlDinamico } = useContext(AuthContext);

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
      <Container className="principal">
        <Routes>

          {isUserActive ?
            (
              <>
                <Switch>
                  <Route path="/" element={<Navigate to={`/${userLang}/homepage`} />} />
                </Switch>

              </>
            )
            : (
              <>
                <Switch> <Route path="/" element={<Navigate to="/en/homepage" />} />
                </Switch>

              </>
            )

          }

          <Switch><Route path="/en" element={<Navigate to="/en/homepage" />} /></Switch>

          <Switch><Route path="/ca" element={<Navigate to="/ca/homepage" />} /></Switch>
          <Switch><Route path="/es" element={<Navigate to="/es/homepage" />} /></Switch>
          <Switch><Route path="/it" element={<Navigate to="/it/homepage" />} /></Switch>
          <Switch><Route path="/fr" element={<Navigate to="/fr/homepage" />} /></Switch>

          <Switch><Route path="/homepage" element={<Navigate to="/en/homepage" />} /></Switch>

          <Switch><Route path="/:lang/homepage" element={<HomePage />} /></Switch>
          <Switch><Route path="/:lang/course/:nameCourse/" element={<Course />} /></Switch>
          <Switch><Route path="/:lang/article/:nameArticle" element={<Articles />} /></Switch>
          <Switch><Route path="/signup" element={<Signup />} /></Switch>
          <Switch><Route path="/login" element={<Login />} /></Switch>
          <Switch><Route path="/profile" element={<IsPrivate> <Profile /> </IsPrivate>} /></Switch>
          <Switch><Route path="/profile/edit" element={<IsPrivate> <ProfileEdit /> </IsPrivate>} /></Switch>

          <Switch><Route path="/:lang/about-author" element={<AboutAuthor />} /></Switch>
          <Switch><Route path="/:lang/privacy-policy" element={<PrivacyPolicy />} /></Switch>
          <Switch><Route path="/:lang/contact" element={<Contact />} /></Switch>

          <Switch><Route path="/about-author" element={<Navigate to="/en/about-author" />} /></Switch>
          <Switch><Route path="/privacy-policy" element={<Navigate to="/en/privacy-policy" />} /></Switch>
          <Switch><Route path="/contact" element={<Navigate to="/en/contact" />} /></Switch>

          <Switch><Route path="/books" element={<Books />} /></Switch>

          <Switch><Route path="/:lang/search-results" element={<SearchResultsPage />} /></Switch>

          <Switch><Route path="/error" element={<Error />} /></Switch>
          <Switch><Route path="*" element={<PageNotFound />} /></Switch>

        </Routes>
      </Container>
      <Footer />
    </>
  )
}

export default App;