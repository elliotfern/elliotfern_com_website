import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import he from "he";

const SearchResultsPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const [articleList, setArticleList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener datos desde la API de WordPress
  const getData = useCallback(async () => {
    if (!query) {
      setError(t("search.errorEmptyQuery"));
      setIsFetching(false);
      return; // No hacer la búsqueda si la query está vacía
    }

    setIsFetching(true);
    setError(null); // Resetear el error antes de la nueva búsqueda

    try {
      // Realizar consulta a la API de WordPress
      const response = await axios.get(
        `https://editor.elliotfern.com/wp-json/wp/v2/posts?search=${query}&lang=${lang}`
      );
      setArticleList(response.data);
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/error");
    }
  }, [query, lang, navigate, t]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (isFetching) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
      >
        <h3>{t("search.loading")}</h3>
      </div>
    );
  }

  return (
    <>
      <h2>
        {t("search.title")} "{query}":
      </h2>
      <h5>{t("search.subTitol")}</h5>
      
      {error && (
        <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
          <p>{error}</p>
        </div>
      )}

      {!error && articleList.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>{t("search.noResults")}</p>
        </div>
      )}

      <ul>
        {articleList.map((article) => (
          <li key={article.id}>
            <Link to={`/${lang}/article/${article.slug}`}>
              {he.decode(article.title.rendered)}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchResultsPage;
