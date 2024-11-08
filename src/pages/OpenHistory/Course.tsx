import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import he from "he";

function Course() {
  const { t } = useTranslation();
  const [courseArticlesList, setCourseArticlesList] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const { lang, nameCourse } = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://api.elliotfern.com/blog.php?type=curso&paramName=${nameCourse}&langCurso=${lang}`
      );

      if (Array.isArray(response.data) && response.data.length === 0) {
        setCourseArticlesList([]);
        setIsFetching(false);
      } else {
        setCourseArticlesList(response.data);
        setIsFetching(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getTitle = () => {
    document.title = `${courseArticlesList[0]?.courseName} - Elliot Fernandez`;
  };

  useEffect(() => {
    if (
      courseArticlesList &&
      courseArticlesList.length > 0 &&
      courseArticlesList[0].courseName
    ) {
      getTitle();
    }
  }, [courseArticlesList]);

  if (isFetching) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
      >
        <h3>Loading ... </h3>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-center">
        {courseArticlesList && courseArticlesList.length > 0
          ? courseArticlesList[0].courseName
          : t("webCursNameError")}
      </h2>
      <h6 className="text-center italic">
        {courseArticlesList && courseArticlesList.length > 0
          ? courseArticlesList[0].courseDescription
          : t("webCursDescripcioError")}
      </h6>
      <h5 className="separador">{t("webwebCursContingut")}</h5>

      {courseArticlesList && courseArticlesList.length > 0 ? (
        courseArticlesList.map((eachArticle) => (
          <div className="llistat-articles" key={eachArticle.ID}>
            <Link to={`/${lang}/article/${eachArticle.post_name}`}>
              {he.decode(eachArticle.post_title)}
            </Link>
          </div>
        ))
      ) : (
        <div>{t("webwebCursContingutError")}</div> // Mensaje alternativo
      )}
    </>
  );
}

export default Course;
