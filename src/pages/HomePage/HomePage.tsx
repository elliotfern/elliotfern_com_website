import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import AuthorBox from "../../components/AuthorBox/AuthorBox";
import Styles from './HomePage.module.css';

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
 
      <h4 className="text-center">{t("homepage.webTitle")}</h4>
      <AuthorBox />

      <div className={Styles.languagesBadge}>
        <img 
          src="https://img.shields.io/badge/JavaScript-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=white" 
          alt="JavaScript" 
        />
        <img 
          src="https://img.shields.io/badge/TypeScript-%23007ACC?style=for-the-badge&logo=typescript&logoColor=white" 
          alt="TypeScript" 
        />
        <img 
          src="https://img.shields.io/badge/Java-%23007396?style=for-the-badge&logo=java&logoColor=white" 
          alt="Java" 
        />
        <img 
          src="https://img.shields.io/badge/HTML5-%23E34F26?style=for-the-badge&logo=html5&logoColor=white" 
          alt="HTML5" 
        />
        <img 
          src="https://img.shields.io/badge/CSS3-%231572B6?style=for-the-badge&logo=css3&logoColor=white" 
          alt="CSS3" 
        />
        <img 
          src="https://img.shields.io/badge/PHP-%23777BB4?style=for-the-badge&logo=php&logoColor=white" 
          alt="PHP" 
        />
         <img 
          src="https://img.shields.io/badge/React-%2361DAFB?style=for-the-badge&logo=react&logoColor=white" 
          alt="React" 
        />
        <img 
          src="https://img.shields.io/badge/Node.js-%23339933?style=for-the-badge&logo=node.js&logoColor=white" 
          alt="Node.js" 
        />
        <img 
          src="https://img.shields.io/badge/MongoDB-%2300A92D?style=for-the-badge&logo=mongodb&logoColor=white" 
          alt="MongoDB" 
        />
        <img 
          src="https://img.shields.io/badge/MySQL-%234479A1?style=for-the-badge&logo=mysql&logoColor=white" 
          alt="MySQL" 
        />
      </div>

      <h4 className="text-center">{t("homepage.webTitleHistoriaOberta")}</h4>
      <h5 className="text-center">{t("homepage.historiaOberta")}</h5>

      <div className={Styles.gridContainer}>
        {coursesList?.map((eachCourse) => (
          <div className={Styles.gridItem} key={eachCourse.id}>
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
