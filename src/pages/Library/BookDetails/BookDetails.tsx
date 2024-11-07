import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { routes } from "../../../services/routes";
import he from "he";
import styles from "./BookDetails.module.css";

// Interfaz completa para Book
interface Book {
  id: string;
  titol: string;
  AutNom: string;
  AutCognom1: string;
  any: string;
  lang: string;
  genere: string;
  nameImg: string;
  tema: string;
  idioma: string;
  nomGen: string;
  nomEditorial: string;
  tipusLlibre: string;
  dateCreated: string;
  dateModified: string;
  titolEng: string;
  autorSlug: string;
}

function BookDetails() {
  const { lang, slug } = useParams<{ lang: string; slug: string }>(); // Asegúrate de que slug está incluido aquí
  const [book, setBook] = useState<Book | null>(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // Llamada a la API para obtener los detalles del libro
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.elliotfern.com/book.php?type=llibreDetalls&slug=${slug}&lang=${lang}`
        );
        setBook(response.data);
        document.title = `${he.decode(response.data.titol)} - Elliot Fernandez`;
      } catch (error) {
        console.error("Error al obtener detalles del libro:", error);
      }
    };

    fetchBookDetails();
  }, [lang, slug, navigate]);

  if (!book) {
    return <div>{t("loading")}</div>; // Mostrar un mensaje de carga mientras se obtiene la información
  }

  return (
    <>
      <h2 className="bold">Llibre: {he.decode(book.titol)}</h2>
      <div className={styles.contentBook}>
        <img
          src={
            book.nameImg
              ? `https://media.elliotfern.com/img/library-book/${book.nameImg}.jpg`
              : "https://media.elliotfern.com/img/library-book/book_default.jpg"
          }
          alt={`Portada de ${he.decode(book.titol)}`}
          className="book-image"
        />
        <div className="details">
          {" "}
          {/* Añadir un contenedor para los detalles */}
          
     
            {book.titolEng ? (
              <>
                <strong>{t("book.title")}:</strong> {he.decode(book.titolEng)}
              </>
            ) : null}
          
          <p>
            <strong>{t("book.author")}: </strong>
            <Link to={`${routes[i18n.language].authors}/${book.autorSlug}`}>
              {book.AutNom} {book.AutCognom1}
            </Link>
          </p>
          <p>
            <strong>{t("book.year")}:</strong> {book.any}
          </p>
          <p>
            <strong>{t("book.language")}:</strong> {book.idioma}
          </p>
          <p>
            <strong>{t("book.genre")}:</strong> {book.nomGen}
          </p>
          <p>
            <strong>{t("book.topic")}:</strong> {book.tema}
          </p>
          <p>
            <strong>{t("book.editorial")}:</strong> {book.nomEditorial}
          </p>
          <p>
            <strong>{t("book.tipusLlibre")}:</strong> {book.tipusLlibre}
          </p>
          <p>
            <strong>{t("dataCreacio")}:</strong>{" "}
            {dayjs(book.dateCreated).format("DD/MM/YYYY")}
          </p>
          <p>
            <strong>{t("dataModificacio")}:</strong>{" "}
            {dayjs(book.dateModified).format("DD/MM/YYYY")}
          </p>
        </div>
      </div>
      </>
  );
}

export default BookDetails;
