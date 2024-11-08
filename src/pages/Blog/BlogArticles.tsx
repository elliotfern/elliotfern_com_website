import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorBox from "../../components/AuthorBox/AuthorBox";

function BlogArticles() {
  const [article, setArticle] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  // los Hooks se deben de invocar siempre
  const { blogArticle } = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://api.elliotfern.com/blog.php?type=blogArticle&paramName=${blogArticle}`
      );
      setArticle(response.data);
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      // redireccionar a /error
      //navigate("/error")
    }
  };

  // Llamar a getTitle después de que article se haya cargado
  useEffect(() => {
    if (article && article[0] && article[0].post_title) {
      getTitle();
    }
  }, [article]);

  const getTitle = () => {
    document.title = `${article[0].post_title} - Open History`;
  };

  if (isFetching === true) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
      >
        <h3>cargando ... </h3>
      </div>
    );
  }

  // dangerouslySetInnerHTML para renderizar el contenido HTML de la API externa
  const decodedContentArticle = { __html: article[0].post_content };
  const decodedContentExcerpt = { __html: article[0].post_excerpt };

  // idArticle

  const datePost_format = article[0].post_date;
  const dateModified_format = article[0].post_modified;

  return (
    <>
      <meta name="description" content={article[0].post_excerpt} />

      <h2 className="text-center bold">{article[0].post_title}</h2>
      <h5 className="text-center italic">
        <div dangerouslySetInnerHTML={decodedContentExcerpt} />
      </h5>

      <AuthorBox />

      <hr />

      <p>
        Publicat el {datePost_format} | Modificat el {dateModified_format}
      </p>

      <div dangerouslySetInnerHTML={decodedContentArticle} />

      <hr />
    </>
  );
}

export default BlogArticles;
