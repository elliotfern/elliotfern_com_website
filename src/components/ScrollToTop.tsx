import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const location = useLocation()

  useEffect(() => {
    // Desplazar la página a la parte superior cada vez que cambie la ruta
    window.scrollTo(0, 0)
  }, [location])

  return null
}

export default ScrollToTop
