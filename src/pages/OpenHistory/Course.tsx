import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import he from 'he'
import TranslateArticles from '../../components/TranslateArticles/TranslateArticles'
import { Helmet } from 'react-helmet'

interface CursoResponse {
  ID: number
  post_title: string
  post_date: string
  post_name: string
  courseName: string
  courseDescription: string
  cursId: number
}

interface ArticleTranslations {
  post_titleEs?: string
  post_nameEs?: string
  post_titleEn?: string
  post_nameEn?: string
  post_titleFr?: string
  post_nameFr?: string
  post_titleIt?: string
  post_nameIt?: string
  post_titleCa?: string
  post_nameCa?: string
}

function Course() {
  const { t, i18n } = useTranslation()
  const [translations, setTranslations] = useState<ArticleTranslations>({})
  const [courseArticlesList, setCourseArticlesList] = useState<
    CursoResponse[] | null
  >(null)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string | null>(null) // Estado de error

  const { lang, nameCourse } = useParams()
  const location = useLocation()

  // Obtener la URL de la página actual
  const currentUrl = window.location.pathname

  // Dividir la URL en partes usando "/" como delimitador
  const pathParts = currentUrl.split('/')

  // Obtener la última parte de la URL
  const lastPart = pathParts[pathParts.length - 1]

  const getData = useCallback(async () => {
    try {
      const response = await axios.get<CursoResponse>(
        `https://api.elliotfern.com/blog.php?type=curso&paramName=${nameCourse}&langCurso=${lang}`
      )

      if (Array.isArray(response.data) && response.data.length > 0) {
        setCourseArticlesList(response.data)
        setIsFetching(false)

        const courseId = response.data[0].cursId // Usa el `cursId` del primer elemento
        if (courseId) {
          await getTranslations(courseId, lang) // Llama a getTranslations solo si courseId es válido
        }
      } else {
        console.warn('No se encontraron artículos relacionados con el curso.')
        setCourseArticlesList([])
        setIsFetching(false)
        setError(t('article.articleNoDisponible')) // Establece el mensaje de error
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsFetching(false)
      setError(t('webCursErrorFetch')) // Establece el mensaje de error de la API
    }
  }, [nameCourse, lang, t])

  const getTranslations = async (courseId: number, lang: string) => {
    try {
      const response = await axios.get<ArticleTranslations>(
        `https://api.elliotfern.com/blog.php?type=cursIdiomes&id=${courseId}&lang=${lang}`
      )

      if (response.data) {
        setTranslations(response.data)
      }
    } catch (error) {
      console.error('Error fetching translations:', error)
      setError(t('webCursErrorTranslations')) // Establece el mensaje de error de traducciones
    }
  }

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    const pathLang = location.pathname.split('/')[1]
    if (pathLang && pathLang !== i18n.language) {
      i18n.changeLanguage(pathLang)
    }
  }, [location, i18n])

  if (isFetching) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}
      >
        <h3>{t('loading')}</h3>
      </div>
    )
  }

  // Si hay un error, mostrar el mensaje de error
  if (error) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}
      >
        <h3>{error}</h3>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>
          {he.decode(courseArticlesList[0].courseName)} - Elliot Fernandez
        </title>
        <meta
          name="description"
          content={he.decode(courseArticlesList[0].courseDescription)}
        />
        <meta
          property="og:title"
          content={`${he.decode(
            courseArticlesList[0].courseName
          )} - Elliot Fernandez`}
        />
        <meta
          property="og:description"
          content={he.decode(courseArticlesList[0].courseDescription)}
        />
        <link
          rel="canonical"
          href={`https://elliotfern.com/${lang}/course/${lastPart}`}
        />

        {translations.post_nameCa && (
          <link
            rel="canonical"
            hrefLang="ca"
            href={`https://elliotfern.com/es/course/${translations.post_nameCa}`}
          />
        )}
        {translations.post_nameEs && (
          <link
            rel="canonical"
            hrefLang="es"
            href={`https://elliotfern.com/es/course/${translations.post_nameEs}`}
          />
        )}
        {translations.post_nameEn && (
          <link
            rel="canonical"
            hrefLang="en"
            href={`https://elliotfern.com/en/course/${translations.post_nameEn}`}
          />
        )}
        {translations.post_nameFr && (
          <link
            rel="canonical"
            hrefLang="fr"
            href={`https://elliotfern.com/fr/course/${translations.post_nameFr}`}
          />
        )}
        {translations.post_nameIt && (
          <link
            rel="canonical"
            hrefLang="it"
            href={`https://elliotfern.com/it/course/${translations.post_nameIt}`}
          />
        )}
      </Helmet>

      <h2 className="text-center">
        {courseArticlesList && courseArticlesList.length > 0
          ? courseArticlesList[0].courseName
          : t('webCursNameError')}
      </h2>
      <h6 className="text-center italic">
        {courseArticlesList && courseArticlesList.length > 0
          ? he.decode(courseArticlesList[0].courseDescription)
          : t('webCursDescripcioError')}
      </h6>

      {/* Componente para las banderas de idiomas */}
      <TranslateArticles translations={translations} t={t} type="course" />

      {courseArticlesList[0].post_title ? (
        <h5 className="separador">{t('webwebCursContingut')}</h5>
      ) : (
        <h5 className="separador">{t('webwebCursContingutError')}</h5>
      )}

      {courseArticlesList && courseArticlesList.length > 0 ? (
        courseArticlesList.map(
          (eachArticle) =>
            eachArticle.post_title ? (
              <div className="llistat-articles" key={eachArticle.ID}>
                <Link to={`/${lang}/article/${eachArticle.post_name}`}>
                  {he.decode(eachArticle.post_title)}
                </Link>
              </div>
            ) : null // Si no hay post_title, no mostramos el artículo
        )
      ) : (
        <div>{t('webwebCursContingutError')}</div>
      )}
    </>
  )
}

export default Course
