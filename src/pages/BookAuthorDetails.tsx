import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import he from "he";

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
}

function BookAuthorDetails() {
  const { lang, slug } = useParams<{ lang: string; slug: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.elliotfern.com/book.php?type=autorDetalls&slug=${slug}&lang=${lang}`
        );
        setAuthor(response.data);
        document.title = `${response.data.AutNom} ${response.data.AutCognom1} - Elliot Fernandez`;
      } catch (error) {
        console.error("Error al obtener detalles del autor:", error);
      }
    };

    fetchAuthorDetails();
  }, [lang, slug]);

  if (!author) {
    return <div>{t("loading")}</div>;
  }

  return (
    <div className="container-principal-book">
      <div className="content-book">
        <img
          src={
            author.nameImg
              ? `https://media.elliotfern.com/img/library-author/${author.nameImg}.jpg`
              : "https://media.elliotfern.com/img/library-author/author_default.jpg"
          }
          alt={`Foto de ${author.AutNom} ${author.AutCognom1}`}
          className="book-image"
        />
        <div className="details">
          <h2 className="bold">{author.AutNom} {author.AutCognom1}</h2>
          <p>
            <strong>{t("author.yearBorn")}:</strong> {author.yearBorn}
          </p>
          {author.yearDie && (
            <p>
              <strong>{t("author.yearDie")}:</strong> {author.yearDie}
            </p>
          )}
          <p>
            <strong>{t("author.country")}:</strong> {author.nomPais}
          </p>
          <p>
            <strong>{t("author.description")}:</strong> {he.decode(author.AutDescrip)}
          </p>
          <p>
            <strong>{t("author.wikipedia")}:</strong> 
            {author.AutWikipedia ? (
              <a href={author.AutWikipedia} target="_blank" rel="noopener noreferrer">
                {author.AutWikipedia}
              </a>
            ) : (
              t("author.noWikipedia")
            )}
          </p>
          <p>
            <strong>{t("author.dataCreacio")}:</strong> {dayjs(author.dateCreated).format("DD/MM/YYYY")}
          </p>
          <p>
            <strong>{t("author.dataModificacio")}:</strong> {dayjs(author.dateModified).format("DD/MM/YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookAuthorDetails;
