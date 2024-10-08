import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// Define el tipo de tus cursos
interface Course {
  id: number;
  paramName: string;
  img: string;
  nombreCurso: string;
  resumen: string;
}

function HomePage() {
  // Define el estado con tipos
  const [coursesList, setCoursesList] = useState<Course[] | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const { lang } = useParams<{ lang: string }>();

  const userLang = "en"; // Define el idioma del usuario
  const isUserActive = false; // Simulando el estado del usuario

  useEffect(() => {
    // Aquí deberías obtener `userDetails` desde tu contexto o estado global
    // const userDetails = /* lógica para obtener userDetails */;
    // if (userDetails) {
    //   setUserSavedCourses(userDetails.savedCourses);
    // }

    getData();
  }, [lang]);

  useEffect(() => {
    if (coursesList && coursesList[0]) {
      getTitle();
    }
  }, [coursesList]);

  const getTitle = () => {
    document.title = `${webTitle}`;
  };

  const getData = async () => {
    try {
      const response = await axios.get(`https://api.elliotfern.com/blog.php?type=llistatCursos&langCurso=${lang}`);
      setCoursesList(response.data);
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Redireccionar a /error
      // navigate("/error");
    }
  };

  // Traducción de cadenas de texto
  let webTitle = "";
  let webDescription = "";
  let webLinkCourse = "";
  let savedCourse = "";
  let webOpenHistory = "";

  switch (lang) {
    case "es":
      webTitle = "Elliot Fernandez - Full Stack developer & Historiador";
      webOpenHistory = "Historia Abierta";
      webDescription = `${webOpenHistory} es un proyecto editorial independiente que ofrece acceso gratuito a cursos de Historia a sus lectores. Ahora puedes leer los artículos de historia en este sitio web.`;
      webLinkCourse = "Ver todos los artículos";
      savedCourse = "Guardar curso";
      break;
    case "en":
      webTitle = "Elliot Fernandez - Full Stack developer & Historian";
      webOpenHistory = "Open History";
      webDescription = `${webOpenHistory} is an independent publishing project that offers free access to History courses to its readers. Now you can read the history articles in this website.`;
      webLinkCourse = "View all articles";
      savedCourse = "Save course";
      break;
    case "fr":
      webTitle = "Elliot Fernandez - Full Stack developer & Historien";
      webOpenHistory = "Histoire Ouvert";
      webDescription = `${webOpenHistory} est un projet de publication indépendant qui offre à ses lecteurs un accès gratuit aux cours d'histoire. Vous pouvez désormais lire les articles d'histoire sur ce site`;
      webLinkCourse = "Ver todos los artículos";
      savedCourse = "Guardar curso";
      break;
    case "ca":
      webTitle = "Elliot Fernandez - Full stack desenvolupador web & Historiador";
      webOpenHistory = "Història Oberta";
      webDescription = `${webOpenHistory} és un projecte de publicació independent que ofereix als seus lectors accés gratuït a articles d'Història en molts cursos diferents. Ara podeu llegir els articles d'història en aquest lloc web.`;
      webLinkCourse = "Veure tots els articles";
      savedCourse = "Guardar curs";
      break;
    case "it":
      webTitle = "Elliot Fernandez - Full stack developer & Storico";
      webOpenHistory = "Storia Aperta";
      webDescription = `${webOpenHistory} è un progetto editoriale indipendente che offre ai suoi lettori accesso gratuito ai corsi di Storia. Adesso potete leggere gli articoli di storia in questo sito`;
      webLinkCourse = "Leggere tutti gli articoli";
      savedCourse = "Guardar curs";
      break;
    default:
      webTitle = "Open History";
      break;
  }

  if (isFetching) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}>
        <h3>Cargando ...</h3>
      </div>
    );
  }

  const handleRefresh = () => {
    setIsFetching(true);
    getData();
  };

  return (
    <>
      <div className="container-principal">
        <div className="content">
          <h2 className="text-center">{webTitle}</h2>
          <h5 className="text-center">{webDescription}</h5>
          <p className="text-center">
            <button onClick={handleRefresh}>Refrescar</button>
          </p>
          <div className="grid-container">
            {coursesList?.map((eachCourse) => (
              <div className="grid-item" key={eachCourse.id}>
                <Link to={`/${lang}/course/${eachCourse.paramName}`}>
                  <img src={eachCourse.img} alt={eachCourse.nombreCurso} />
                </Link>
                <Link to={`/${lang}/course/${eachCourse.paramName}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <h3>{eachCourse.nombreCurso}</h3>
                </Link>
                {eachCourse.resumen}
                <p>
                  <Link to={`/${lang}/course/${eachCourse.paramName}`}>{webLinkCourse}</Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
