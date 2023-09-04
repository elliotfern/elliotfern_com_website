import { Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  const { isUserActive, updateUserLang, userLang } = useContext(AuthContext);

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
      <NavBar />
      <Container className="principal">
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

          <Route path="/:lang/homepage" element={<HomePage />} />
          <Route path="/:lang/course/:nameCourse/" element={<Course />} />
          <Route path="/:lang/article/:nameArticle" element={<Articles />} />
          <Route path="/:lang/about-author" element={<AboutAuthor />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<IsPrivate> <Profile /> </IsPrivate>} />
          <Route path="/profile/edit" element={<IsPrivate> <ProfileEdit /> </IsPrivate>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Container>
      <Footer />
    </>
  )
}

export default App;