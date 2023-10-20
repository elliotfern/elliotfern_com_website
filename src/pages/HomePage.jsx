import axios from "axios"
import service from "../services/service.config";

import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from "react-router-dom"
import he from 'he';

// para usar context
import { useContext } from "react"
//import { AuthContext } from "../context/auth.context"

function HomePage() {

  // estados
  const [coursesList, setCoursesList] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  // los Hooks se deben de invocar siempre
  const navigate = useNavigate()
  const { lang } = useParams();
  //const { isUserActive, userDetails } = useContext(AuthContext)

  const userLang = "en";
  const isUserActive = false;
  const langUrlDinamico = "en";

  // estado para los id de los cursos guardados por el usuario
  //const [userSavedCourses, setUserSavedCourses] = useState(userDetails ? userDetails.savedCourses : []);

  useEffect(() => {
    if (typeof userDetails !== 'undefined' && userDetails !== null) {
      setUserSavedCourses(userDetails.savedCourses)
    }

    getData()
  }, [lang])

  // Llamar a getTitle después de que article se haya cargado
  useEffect(() => {
    if (coursesList && coursesList[0]) {
      getTitle();
    }
  }, [coursesList]);


  const getTitle = () => {
    document.title = `${webTitle}`;
  }

  const getData = async () => {
    try {
      const response = await axios.get(`https://api.elliotfern.com/blog.php?type=listado-cursos&langCurso=${lang}`)
      setCoursesList(response.data)
      setIsFetching(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      // redireccionar a /error
      //navigate("/error")

    }
  }

  // console.log(userSavedCourses)
  // traducción cadenas de texto
  let webTitle = "";
  let webDescription = "";
  let webLinkCourse = "";
  let savedCourse = "";
  let webOpenHistory = "";

  if (lang === "es") {
    webTitle = "Elliot Fernandez - Full Stack developer & Historiador";
    webOpenHistory = "Historia Abierta";
    webDescription = webOpenHistory + " es un proyecto editorial independiente que ofrece acceso gratuito a cursos de Historia a sus lectores. Ahora puedes leer los artículos de historia en este sitio web."
    webLinkCourse = "Ver todos los artículos"
    savedCourse = "Guardar curso";
  } else if (lang === "en") {
    webTitle = "Elliot Fernandez - Full Stack developer & Historian"
    webOpenHistory = "Open History";
    webDescription = webOpenHistory + " is an independent publishing project that offers free access to History courses to its readers. Now you can read the history articles in this website."
    webLinkCourse = "View all articles"
    savedCourse = "Save course";
  } else if (lang === "fr") {
    webTitle = "Elliot Fernandez - Full Stack developer & Historien"
    webOpenHistory = "Histoire Ouvert";
    webDescription = webOpenHistory + " est un projet de publication indépendant qui offre à ses lecteurs un accès gratuit aux cours d'histoire. Vous pouvez désormais lire les articles d'histoire sur ce site"
    webLinkCourse = "Ver todos los artículos"
    savedCourse = "Guardar curso";
  } else if (lang === "ca") {
    webTitle = "Elliot Fernandez - Full stack desenvolupador web & Historiador"
    webOpenHistory = "Història Oberta";
    webDescription = webOpenHistory + " és un projecte de publicació independent que ofereix als seus lectors accés gratuït a articles d'Història en molts cursos diferents. Ara podeu llegir els articles d'història en aquest lloc web."
    webLinkCourse = "Veure tots els articles"
    savedCourse = "Guardar curs";
  } else if (lang === "it") {
    webTitle = "Elliot Fernandez - Full stack developer & Storico"
    webOpenHistory = "Storia Aperta";
    webDescription = webOpenHistory + " è un progetto editoriale indipendente che offre ai suoi lettori accesso gratuito ai corsi di Storia. Adesso potete leggere gli articoli di storia in questo sito"
    webLinkCourse = "Leggere tutti gli articoli"
    savedCourse = "";
  } else {
    webTitle = "Open History"
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

  const handleCourseSaved = async (e, courseId) => {
    e.preventDefault();
    const savedCourses = e.target.value
    //console.log(savedCourses)

    try {
      const response = await service.patch("/profile/savedCourses", {
        savedCourses: [courseId], // Enviar un array con el ID del curso
      });
      console.log(response);

      // Actualizar el estado userSavedCourses con el nuevo curso guardado
      setUserSavedCourses([...userSavedCourses, courseId]);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="container-principal">
        <div className="content">
          <h2 className="text-center">{webTitle}</h2>
          <h5 className="text-center">{webDescription}</h5>

          <p className="text-center"><button onClick={handleRefresh}>Refrescar</button></p>

          <div className="grid-container">
            {coursesList.map((eachCourse) => {
              // Verificar si el ID del curso actual está en userSavedCourses
              //const isCourseSaved = userSavedCourses.toString().includes(eachCourse.id.toString());
              return (
                <div className="grid-item" key={eachCourse.id}>
                  <Link to={`/${lang}/course/${eachCourse.paramName}`} >
                    <img src={eachCourse.img} />
                  </Link>

                  <Link to={`/${lang}/course/${eachCourse.paramName}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3> {he.decode(eachCourse.nombreCurso)}</h3></Link>

                  {he.decode(eachCourse.resumen)}

                  <p><Link to={`/${lang}/course/${eachCourse.paramName}`} >
                    {webLinkCourse}</Link></p>
                </div>
              )

            })}

          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage