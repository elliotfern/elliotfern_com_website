import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthorBox from "../../components/AuthorBox/AuthorBox";
import he from "he";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import styles from "./Articles.module.css";

function Articles() {
  const { t } = useTranslation();
  const [article, setArticle] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const { nameArticle } = useParams();

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.elliotfern.com/blog.php?type=articleName&paramName=${nameArticle}`
      );
      setArticle(response.data);
      document.title = `${response.data.post_title} - Elliot Fernandez`;
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [nameArticle]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (isFetching === true) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}>
        <h3>cargando ... </h3>
      </div>
    );
  }

  // Función para eliminar los comentarios HTML
  const cleanHTML = (html) => {
    return html.replace(/<!--[\s\S]*?-->/g, ""); // Eliminar comentarios HTML
  };

  // Función para formatear la fecha en español
  const formatFecha = (fecha) => {
    return dayjs(fecha).format("D/MM/YYYY");
  };

  // Función para modificar los enlaces externos
  const modifyExternalLinks = (htmlContent) => {
    const allowedDomains = ["elliotfern.com", "media.elliotfern.com"];

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    const links = doc.querySelectorAll("a");

    links.forEach((link) => {
      const linkDomain = new URL(link.href).hostname;
      if (!allowedDomains.includes(linkDomain)) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.innerHTML += " 🔗";
      }
    });

    return doc.body.innerHTML;
  };

  // Función para generar el índice jerárquico y agregar los ID
  const generateTableOfContents = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    const headers = [...doc.querySelectorAll("h2, h3, h4")];

    const toc = [];
    let currentH2 = null;
    let currentH3 = null;

    headers.forEach((header, index) => {
      const id = `section-${index + 1}`;
      header.id = id; // Asignamos un id único a cada encabezado

      if (header.tagName === "H2") {
        currentH2 = { text: header.textContent, id, children: [] };
        toc.push(currentH2);
      } else if (header.tagName === "H3") {
        currentH3 = { text: header.textContent, id, children: [] };
        currentH2?.children.push(currentH3);
      } else if (header.tagName === "H4") {
        const currentH4 = { text: header.textContent, id };
        currentH3?.children.push(currentH4);
      }
    });

    return { toc, modifiedContent: doc.body.innerHTML };
  };

  // Limpiamos el HTML y lo procesamos para los enlaces
  const decodedContent = he.decode(cleanHTML(he.decode(article.post_content)));
  const { toc, modifiedContent } = generateTableOfContents(decodedContent);
  const modifiedContentWithLinks = modifyExternalLinks(modifiedContent);

  // Función para manejar el desplazamiento suave con el offset
  const handleLinkClick = (event) => {
    // Prevenimos el comportamiento predeterminado del enlace
    event.preventDefault();

    const targetId = event.target.getAttribute("href").substring(1); // Obtener el ID del enlace
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0; // Ajusta según el tamaño de tu header
      window.scrollTo({
        top: targetElement.offsetTop - headerHeight, // Desplazamos hacia abajo teniendo en cuenta el header
        behavior: "smooth", // Desplazamiento suave
      });
    }
  };

  return (
    <>
      <h2 className="text-center bold">{he.decode(article.post_title)}</h2>
      <h5 className="text-center italic">{he.decode(article.post_excerpt)} </h5>
      <div />

      <AuthorBox />

      <p>
        {t("webPostDate")} {formatFecha(article.post_date)} |{" "}
        {t("webPostModified")} {formatFecha(article.post_modified)}
      </p>

      {/* Generamos el índice de contenidos */}
      <div className={styles.indexContinguts}>
        <h3>{t("article.index")}</h3>
        <ul>
          {toc.map((h2) => (
            <li key={h2.id}>
              <a href={`#${h2.id}`} onClick={handleLinkClick}>{h2.text}</a>
              {h2.children.length > 0 && (
                <ul>
                  {h2.children.map((h3) => (
                    <li key={h3.id}>
                      <a href={`#${h3.id}`} onClick={handleLinkClick}>{h3.text}</a>
                      {h3.children.length > 0 && (
                        <ul>
                          {h3.children.map((h4) => (
                            <li key={h4.id}>
                              <a href={`#${h4.id}`} onClick={handleLinkClick}>{h4.text}</a>
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
        className="text-article"
        dangerouslySetInnerHTML={{ __html: modifiedContentWithLinks }}
      ></div>

      <hr />
    </>
  );
}

export default Articles;
