import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import he from "he";
import { routes } from "../../../services/routes";
import styles from "./BookAuthorDetails.module.css";

interface Author {
  id: string;
  AutNom: string;
  AutCognom1: string;
  yearBorn: string;
  yearDie: string | null;
  nomPais: string;
  nameImg: string | null;
  AutWikipedia: string | null;
  AutDescrip: string;
  dateCreated: string;
  dateModified: string;
  nomMov: string;
  nameOc: string;
}

interface Book {
  id: string;
  any: string;
  titol: string;
  slug: string;
}

function BookAuthorDetails() {
  const { lang, slug } = useParams<{ lang: string; slug: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const authorResponse = await axios.get(
          `https://api.elliotfern.com/book.php?type=autorDetalls&slug=${slug}&lang=${lang}`
        );
        const authorData = authorResponse.data;
        setAuthor(authorData);
        document.title = `${authorData.AutNom} ${authorData.AutCognom1} - Elliot Fernandez`;

        const booksResponse = await axios.get(
          `https://api.elliotfern.com/book.php?type=autorsLlibres&id=${authorData.id}`
        );
        setBooks(booksResponse.data);
      } catch (error) {
        console.error("Error al obtener detalles del autor o libros:", error);
        setError(t("error.fetchData"));
      }
    };

    fetchAuthorDetails();
  }, [lang, slug, t]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!author) {
    return <div>{t("loading")}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentBook}>
        <img
          src={
            author.nameImg
              ? `https://media.elliotfern.com/img/library-author/${author.nameImg}.jpg`
              : "https://media.elliotfern.com/img/library-author/author_default.jpg"
          }
          alt={`Foto de ${author.AutNom} ${author.AutCognom1}`}
          className={styles.bookImage}
        />
        <div className={styles.details}>
          <h2 className="bold">
            {author.AutNom} {author.AutCognom1}
          </h2>
          <p>
            <strong>{t("bookAuthors.yearBorn")}:</strong> {author.yearBorn}
          </p>
          {author.yearDie && (
            <p>
              <strong>{t("bookAuthors.yearDie")}:</strong> {author.yearDie}
            </p>
          )}
          <p>
            <strong>{t("bookAuthors.country")}:</strong> {author.nomPais}
          </p>
          <p>
            <strong>{t("bookAuthors.description")}:</strong> {he.decode(author.AutDescrip)}
          </p>
          <p>
            <strong>{t("bookAuthors.profession")}:</strong> {he.decode(author.nameOc)}
          </p>
          <p>
            <strong>{t("bookAuthors.moviment")}:</strong> {he.decode(author.nomMov)}
          </p>
          <p>
            <strong>{t("bookAuthors.wikipedia")}:</strong>
            {author.AutWikipedia ? (
              <a href={author.AutWikipedia} target="_blank" rel="noopener noreferrer">
                {he.decode(author.AutWikipedia)}
              </a>
            ) : (
              t("bookAuthors.noWikipedia")
            )}
          </p>
          <p>
            <strong>{t("dataCreacio")}:</strong>{" "}
            {dayjs(author.dateCreated).format("DD/MM/YYYY")}
          </p>
          {author.dateModified && (
            <p>
              <strong>{t("dataModificacio")}:</strong>{" "}
              {dayjs(author.dateModified).format("DD/MM/YYYY")}
            </p>
          )}
        </div>
      </div>

      <div className={styles.booksContainer}>
        <h3>{t("bookAuthors.booksByAuthor")}</h3>
        {books.length > 0 ? (
          <table className="links-table mt-4">
            <thead>
              <tr>
                <th>{t("book.year")}</th>
                <th>{t("book.title")}</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.any}</td>
                  <td>
                    <Link to={`${routes[i18n.language].books}/${book.slug}`}>
                      {he.decode(book.titol)}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>{t("bookAuthors.noBooks")}</p>
        )}
      </div>
    </div>
  );
}

export default BookAuthorDetails;
