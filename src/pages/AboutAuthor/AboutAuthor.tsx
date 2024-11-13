import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AboutAuthor() {
  const [aboutAuthor, setAboutAuthor] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  const { lang } = useParams();

  useEffect(() => {
    getData();
  }, []);

  let idArticle = 0;

  if (lang === "en") {
    idArticle = 398;
  } else if (lang === "ca") {
    idArticle = 1744;
  } else if (lang === "es") {
    idArticle = 3612;
  } else if (lang === "fr") {
    idArticle = 3614;
  } else if (lang === "it") {
    idArticle = 3615;
  }
 
  const getData = async () => {
    setIsFetching(true); // Resetea el estado de carga al inicio
    setError(null); // Resetea el error antes de realizar la nueva llamada
    try {
      const response = await axios.get(
        `https://api.elliotfern.com/blog.php?type=articleId&id=${idArticle}`
      );
      if (response.data && response.data.length > 0) {
        setAboutAuthor(response.data);
      } else {
        setError("No se encontraron datos para el autor.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error al cargar los datos.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (aboutAuthor && aboutAuthor[0] && aboutAuthor[0].post_title) {
      getTitle();
    }
  }, [aboutAuthor]);

  const getTitle = () => {
    document.title = `${aboutAuthor[0].post_title} - Elliot Fernandez`;
  };

  // Si aún se está cargando, mostrar el mensaje de carga
  if (isFetching) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
      >
        <h3>Cargando ... </h3>
      </div>
    );
  }

  // Si hay un error, mostrar el mensaje
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "25px",
        }}
      >
        <h3 style={{ color: "red" }}>{error}</h3>
        <button onClick={getData}>Intentar de nuevo</button>
      </div>
    );
  }

  // Renderizado normal cuando hay datos
  const decodedContent = { __html: aboutAuthor[0].post_content };

  return (
    <>
      <h2>{aboutAuthor[0].post_title}</h2>
      <div dangerouslySetInnerHTML={decodedContent} />
    </>
  );
}

export default AboutAuthor;
