import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import he from 'he';

function HomePage() {
  const [coursesList, setCoursesList] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  // los Hooks se deben de invocar siempre
  const navigate = useNavigate()
  const { lang } = useParams();

  useEffect(() => {
    getData()

  }, [lang])

  const getData = async () => {
    try {
      const response = await axios.get(`https://elliotfern.com/controller/blog.php?type=listado-cursos&langCurso=${lang}`)
      setCoursesList(response.data)
      setIsFetching(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      // redireccionar a /error
      navigate("/error")

    }
  }

  if (isFetching === true) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}>
        <h3>cargando ... </h3>
      </div>
    )
  }

  const handleRefresh = () => {
    setIsFetching(true)
    getData()

  }

  // traducción cadenas de texto
  let webTitle = "";
  let webDescription = "";
  let webLinkCourse = "";

  if (lang === "es") {
    webTitle = "Historia Abierta"
    webDescription = webTitle + " es un proyecto editorial independiente que ofrece acceso gratuito a cursos de Historia a sus lectores. Ahora puedes leer los artículos de historia en este sitio web."
    webLinkCourse = "Ver todos los artículos"
  } else if (lang === "en") {
    webTitle = "Open History"
    webDescription = webTitle + " is an independent publishing project that offers free access to History courses to its readers. Now you can read the history articles in this website."
    webLinkCourse = "View all articles"
  } else if (lang === "fr") {
    webTitle = "Open History"
    webDescription = webTitle + " est un projet de publication indépendant qui offre à ses lecteurs un accès gratuit aux cours d'histoire. Vous pouvez désormais lire les articles d'histoire sur ce site"
    webLinkCourse = "Ver todos los artículos"
  } else if (lang === "ca") {
    webTitle = "Història Oberta"
    webDescription = webTitle + " és un projecte editorial independent que ofereix accés gratuït als cursos d'Història als seus lectors. Ara podeu llegir els articles d'història en aquest lloc web"
    webLinkCourse = "Veure tots els articles"
  } else if (lang === "it") {
    webTitle = "Storia Aperta"
    webDescription = webTitle + " è un progetto editoriale indipendente che offre ai suoi lettori accesso gratuito ai corsi di Storia. Adesso potete leggere gli articoli di storia in questo sito"
    webLinkCourse = "Leggere tutti gli articoli"
  }

  return (
    <>
      <h2 className="text-center">{webTitle}</h2>
      <h5 className="text-center">{webDescription}</h5>

      <p className="text-center"><button onClick={handleRefresh}>Refrescar</button></p>

      <Row>
        {coursesList.map((eachCourse) => {
          return (
            <Col xs={12} md={3} key={eachCourse.id}>

              <Card style={{ width: '18rem', marginBottom: '25px' }} key={eachCourse.id}>
                <Link to={`/${lang}/course/${eachCourse.paramName}`} >
                  <Card.Img variant="top" src={eachCourse.img} />
                </Link>

                <Card.Body>
                  <Card.Title> <Link to={`/${lang}/course/${eachCourse.paramName}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3> {he.decode(eachCourse.nombreCurso)}</h3>
                  </Link></Card.Title>
                  <Card.Text>
                    {he.decode(eachCourse.descripcion)}
                  </Card.Text>
                </Card.Body>
                <Card.Body>
                  <Link to={`/${lang}/course/${eachCourse.paramName}`} >
                    {webLinkCourse}
                  </Link>
                </Card.Body>
              </Card>

            </Col>
          )

        })}

      </Row>
    </>
  )
}

export default HomePage