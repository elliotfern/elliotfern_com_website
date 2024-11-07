import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  useEffect(() => {
    getData();
  }, [lang]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://api.elliotfern.com/blog.php?type=llistatCursos&langCurso=${lang}`
      );
      setCoursesList(response.data);
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (isFetching) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
      >
        <h3>Cargando ...</h3>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("homepage.titleSeo")}</title>
        <meta name="description" content={t("homepage.descripcioSeo")} />
        <meta property="og:title" content={t("homepage.titleSeo")} />
        <meta property="og:description" content={t("homepage.descripcioSeo")} />
        <link rel="canonical" href="https://elliotfern.com/" />
      </Helmet>

      <h2 className="text-center">{t("homepage.webTitle")}</h2>
      <h5 className="text-center">{t("homepage.webDescription")}</h5>

      <div className="grid-container">
        {coursesList?.map((eachCourse) => (
          <div className="grid-item" key={eachCourse.id}>
            <Link to={`/${lang}/course/${eachCourse.paramName}`}>
              <img src={eachCourse.img} alt={eachCourse.nombreCurso} />
            </Link>
            <Link
              to={`/${lang}/course/${eachCourse.paramName}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h3 style={{ fontSize: "17px", color: "inherit" }}>{eachCourse.nombreCurso}</h3>
            </Link>
            {eachCourse.resumen}
            <p>
              <Link to={`/${lang}/course/${eachCourse.paramName}`}>
                {t("homepage.webLinkCourse")}
              </Link>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
