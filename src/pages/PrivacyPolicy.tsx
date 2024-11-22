import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PrivacyPolicy() {
  const [privacyPolicy, setPrivacyPolicy] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState(null)

  const { lang } = useParams()

  const getData = async () => {
    setIsFetching(true) // Resetea el estado de carga al inicio
    setError(null) // Resetea el error antes de realizar la nueva llamada
    try {
      const response = await axios.get(
        `https://api.elliotfern.com/blog.php?type=articleId&id=${idArticle}`
      )
      if (response.data && response.data.length > 0) {
        setPrivacyPolicy(response.data)
      } else {
        setError('No se encontraron datos para el autor.')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Error al cargar los datos.')
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  let idArticle = 0

  if (lang === 'es' || lang === 'en' || lang === 'fr' || lang === 'it') {
    idArticle = 1742
  } else if (lang === 'ca') {
    idArticle = 1742
  }

  useEffect(() => {
    if (privacyPolicy && privacyPolicy[0] && privacyPolicy[0].post_title) {
      document.title = `${privacyPolicy[0].post_title} - Elliot Fernandez`
    }
  }, [privacyPolicy])

  // Si aún se está cargando, mostrar el mensaje de carga
  if (isFetching) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}
      >
        <h3>Cargando ... </h3>
      </div>
    )
  }

  // Si hay un error, mostrar el mensaje
  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '25px',
        }}
      >
        <h3 style={{ color: 'red' }}>{error}</h3>
        <button onClick={getData}>Intentar de nuevo</button>
      </div>
    )
  }

  // Renderizado normal cuando hay datos
  const decodedContent = { __html: privacyPolicy[0].post_content }

  return (
    <>
      <h2>{privacyPolicy[0].post_title}</h2>
      <div dangerouslySetInnerHTML={decodedContent} />
    </>
  )
}

export default PrivacyPolicy
