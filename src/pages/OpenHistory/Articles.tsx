import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useLocation, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import AuthorBox from '../../components/AuthorBox/AuthorBox'
import he from 'he'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import styles from './Articles.module.css'
import TranslateArticles from '../../components/TranslateArticles/TranslateArticles'
import { Helmet } from 'react-helmet'

interface RelatedArticle {
  curso_titulo: string
  articulo_titulo: string
  articulo_url: string
  curso_url: string
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

function Articles() {
  const { t, i18n } = useTranslation()
  const [article, setArticle] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([])
  const { nameArticle } = useParams()
  const [translations, setTranslations] = useState<ArticleTranslations>({})
  const location = useLocation() // Hook para obtener la ruta actual

  // Obtener la URL de la página actual
  const currentUrl = window.location.pathname

  // Dividir la URL en partes usando "/" como delimitador
  const pathParts = currentUrl.split('/')

  // Obtener la última parte de la URL
  const lastPart = pathParts[pathParts.length - 1]

  const lang = i18n.language // Obtener el idioma actual

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.elliotfern.com/blog.php?type=articleName&paramName=${nameArticle}`
      )

      if (response.data && response.data.post_content) {
        setArticle(response.data)
        setHasError(false)

        // Llamada a la nueva API para obtener los artículos relacionados
        const courseId = response.data.ID
        const lang = i18n.language // Obtener el idioma actual
        getRelatedArticles(courseId, lang)

        getTranslations(courseId, lang)
      } else {
        setHasError(true)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setHasError(true)
    } finally {
      setIsFetching(false)
    }
  }, [nameArticle, i18n.language])

  useEffect(() => {
    getData()
    const pathLang = location.pathname.split('/')[1]
    if (pathLang && pathLang !== i18n.language) {
      i18n.changeLanguage(pathLang) // Cambiar el idioma
    }
  }, [getData, location, i18n])

  const getRelatedArticles = async (courseId: number, lang: string) => {
    try {
      const response = await axios.get<RelatedArticle[]>(
        `https://api.elliotfern.com/blog.php?type=llistatArticlesCurs&id=${courseId}&lang=${lang}`
      )
      if (response.data) {
        setRelatedArticles(response.data)
      }
    } catch (error) {
      console.error('Error fetching related articles:', error)
    }
  }

  const getTranslations = async (courseId: number, lang: string) => {
    try {
      const response = await axios.get<ArticleTranslations>(
        `https://api.elliotfern.com/blog.php?type=articleIdiomes&id=${courseId}&lang=${lang}`
      )
      if (response.data) {
        setTranslations(response.data)
      }
    } catch (error) {
      console.error('Error fetching translations:', error)
    }
  }

  if (isFetching) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}
      >
        <h3>cargando ... </h3>
      </div>
    )
  }

  if (hasError) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}
      >
        <h3>{t('article.articleNoDisponible')}</h3>
      </div>
    )
  }

  // Función para eliminar los comentarios HTML
  const cleanHTML = (html) => {
    return html.replace(/<!--[\s\S]*?-->/g, '') // Eliminar comentarios HTML
  }

  // Función para formatear la fecha en español
  const formatFecha = (fecha) => {
    return dayjs(fecha).format('D/MM/YYYY')
  }

  // Función para modificar los enlaces externos
  const modifyExternalLinks = (htmlContent) => {
    const allowedDomains = ['elliotfern.com', 'media.elliotfern.com']
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlContent, 'text/html')

    const links = doc.querySelectorAll('a')
    links.forEach((link) => {
      const href = link.href
      if (href) {
        try {
          const linkDomain = new URL(href).hostname
          if (!allowedDomains.includes(linkDomain)) {
            link.target = '_blank'
            link.rel = 'noopener noreferrer'
            link.innerHTML += ' 🔗'
          }
        } catch (error) {
          console.error('Invalid URL:', error)
        }
      }
    })

    return doc.body.innerHTML
  }

  // Función para generar el índice jerárquico y agregar los ID
  const generateTableOfContents = (htmlContent) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlContent, 'text/html')

    const headers = [...doc.querySelectorAll('h2, h3, h4')]
    const toc = []
    let currentH2 = null
    let currentH3 = null

    headers.forEach((header, index) => {
      const id = `section-${index + 1}`
      header.id = id

      if (header.tagName === 'H2') {
        currentH2 = { text: header.textContent, id, children: [] }
        toc.push(currentH2)
      } else if (header.tagName === 'H3') {
        currentH3 = { text: header.textContent, id, children: [] }
        currentH2?.children.push(currentH3)
      } else if (header.tagName === 'H4') {
        const currentH4 = { text: header.textContent, id }
        currentH3?.children.push(currentH4)
      }
    })

    return { toc, modifiedContent: doc.body.innerHTML }
  }

  // Limpiamos el HTML y lo procesamos para los enlaces
  const decodedContent = he.decode(cleanHTML(he.decode(article.post_content)))
  const { toc, modifiedContent } = generateTableOfContents(decodedContent)
  const modifiedContentWithLinks = modifyExternalLinks(modifiedContent)

  // Función para manejar el desplazamiento suave con el offset
  const handleLinkClick = (event) => {
    event.preventDefault()
    const targetId = event.target.getAttribute('href').substring(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0
      window.scrollTo({
        top: targetElement.offsetTop - headerHeight,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <Helmet>
        <title>{he.decode(article.post_title)} - Elliot Fernandez</title>
        <meta name="description" content={he.decode(article.post_excerpt)} />
        <meta
          property="og:title"
          content={`${he.decode(article.post_title)} - Elliot Fernandez`}
        />
        <meta
          property="og:description"
          content={he.decode(article.post_excerpt)}
        />
        <link
          rel="canonical"
          href={`https://elliotfern.com/${lang}/article/${lastPart}`}
        />

        {translations.post_nameCa && (
          <link
            rel="alternate"
            hrefLang="ca"
            href={`https://elliotfern.com/es/article/${translations.post_nameCa}`}
          />
        )}

        {translations.post_nameEs && (
          <link
            rel="alternate"
            hrefLang="es"
            href={`https://elliotfern.com/es/article/${translations.post_nameEs}`}
          />
        )}
        {translations.post_nameEn && (
          <link
            rel="alternate"
            hrefLang="en"
            href={`https://elliotfern.com/en/article/${translations.post_nameEn}`}
          />
        )}
        {translations.post_nameFr && (
          <link
            rel="alternate"
            hrefLang="fr"
            href={`https://elliotfern.com/fr/article/${translations.post_nameFr}`}
          />
        )}
        {translations.post_nameIt && (
          <link
            rel="alternate"
            hrefLang="it"
            href={`https://elliotfern.com/it/article/${translations.post_nameIt}`}
          />
        )}
      </Helmet>

      <h2 className="text-center bold">{he.decode(article.post_title)}</h2>
      <h5 className="text-center italic">{he.decode(article.post_excerpt)} </h5>

      <AuthorBox />

      <p>
        {t('webPostDate')} {formatFecha(article.post_date)} |{' '}
        {t('webPostModified')} {formatFecha(article.post_modified)}
      </p>

      {/* Componente para las banderas de idiomas */}
      <TranslateArticles translations={translations} t={t} type="article" />

      <div className={styles.indexContinguts}>
        <h3>{t('article.index')}</h3>
        <ul>
          {toc.map((h2) => (
            <li key={h2.id}>
              <a href={`#${h2.id}`} onClick={handleLinkClick}>
                {h2.text}
              </a>
              {h2.children.length > 0 && (
                <ul>
                  {h2.children.map((h3) => (
                    <li key={h3.id}>
                      <a href={`#${h3.id}`} onClick={handleLinkClick}>
                        {h3.text}
                      </a>
                      {h3.children.length > 0 && (
                        <ul>
                          {h3.children.map((h4) => (
                            <li key={h4.id}>
                              <a href={`#${h4.id}`} onClick={handleLinkClick}>
                                {h4.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={styles.textArticle}
        dangerouslySetInnerHTML={{ __html: modifiedContentWithLinks }}
      ></div>

      <hr />

      {/* Listado de artículos relacionados */}
      {relatedArticles.length > 0 && (
        <div>
          <h3>
            {t('article.curs')}{' '}
            <Link
              to={`/${i18n.language}/course/${relatedArticles[0].curso_url}`}
            >
              {relatedArticles[0].curso_titulo}{' '}
            </Link>
          </h3>
          <ul>
            {relatedArticles.map((related) => (
              <li key={related.articulo_url}>
                <Link to={`/${i18n.language}/article/${related.articulo_url}`}>
                  {he.decode(related.articulo_titulo)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default Articles
