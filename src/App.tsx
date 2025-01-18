import { Routes, Route, Navigate } from 'react-router-dom'
import i18n from './config/i18n'
//import React, { useEffect } from 'react'
//import ReactGA from 'react-ga4'

// Importaciones de tus componentes
import Articles from './pages/OpenHistory/Articles'
import ArticlesArchives from './pages/OpenHistory/ArticlesArchives'
import Course from './pages/OpenHistory/Course'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer'
import AboutAuthor from './pages/AboutAuthor/AboutAuthor'
import PrivacyPolicy from './pages/PrivacyPolicy'
import HomePage from './pages/HomePage/HomePage'
import Books from './pages/Library/Books/Books'
import SearchResultsPage from './pages/SearchResultsPage'
import Error from './pages/Error'
import PageNotFound from './pages/PageNotFound'
import Contact from './pages/Contact'
import Blog from './pages/Blog/Blog'
import BlogArticles from './pages/Blog/BlogArticles'
import Links from './pages/Links'
//import CookieBanner from './components/CookieBanner/CookieBanner'
import BookAuthors from './pages/Library/Authors/BookAuthors'
import BookDetails from './pages/Library/BookDetails/BookDetails'
import BookAuthorDetails from './pages/Library/AuthorDetails/BookAuthorDetails'
import CompromisQualitat from './pages/CompromisQualitat'
import ScrollToTop from './components/ScrollToTop'

// Lista de idiomas permitidos
const supportedLanguages = ['en', 'ca', 'es', 'it', 'fr']

function App() {
  //const location = useLocation()
  const userLang = i18n.language
  const redirectLang = supportedLanguages.includes(userLang) ? userLang : 'en'

  //const [showCookieBanner, setShowCookieBanner] = useState<boolean>(false)
  /*

  // Obtener cookie por nombre
  const getCookie = (name: string): string | null => {
    const cookieArr = document.cookie.split(';')
    for (let i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].split('=')
      if (name === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1])
      }
    }
    return null
  }

  // Función para aceptar las cookies
  const acceptCookies = () => {
    setCookie('cookiesAccepted', 'true', 30)
    //setShowCookieBanner(false)
    //loadGoogleAnalytics()
  }


  // Cargar Google Analytics
  const loadGoogleAnalytics = () => {
    ReactGA.initialize('G-0L7VP04REK', {
      gaOptions: {
        anonymizeIp: true,
      },
    })
  }



  // Función para establecer cookies
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
  }


  // Verificar las cookies y el estado del banner cada vez que se cambia la ruta
  useEffect(() => {
    const cookiesAccepted = getCookie('cookiesAccepted')

    if (cookiesAccepted === 'true') {
      // Si las cookies han sido aceptadas, inicializar Google Analytics
      //loadGoogleAnalytics()
      //setShowCookieBanner(false)
    } else if (cookiesAccepted === 'false') {
      //setShowCookieBanner(false)
    } else {
      //setShowCookieBanner(true)
    }
  }, [location.pathname]) // Se ejecuta cada vez que la ruta cambie

  // Verificar cuando cambia la ruta para enviar un Pageview
  useEffect(() => {
    const cookiesAccepted = getCookie('cookiesAccepted')
    if (cookiesAccepted === 'true') {
      ReactGA.send({ hitType: 'pageview', page: location.pathname })
    }
  }, [location.pathname]) // Cuando cambie la ruta, envía un Pageview
  */
  // {showCookieBanner && <CookieBanner onHide={acceptCookies} />}
  return (
    <>
      <NavBar />

      <div className="main-container">
        <ScrollToTop />
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
          <Route
            path="/:lang/commitment-responsibility"
            element={<CompromisQualitat />}
          />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
