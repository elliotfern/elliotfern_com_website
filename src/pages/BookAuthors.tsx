import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import he from "he";

interface Author {
  id: string;
  nom: string;
  cognoms: string;
  yearBorn: string;
  yearDie: string;
  pais: string;
  autorSlug: string;
  professio: string;
  nameImg: string | null;
}

function BooksAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]); // autores filtrados por búsqueda
  const [allAuthors, setAllAuthors] = useState<Author[]>([]); // lista completa de autores
  const [selectedPais, setSelectedPais] = useState<string | null>(null); // país seleccionado
  const [selectedProfessio, setSelectedProfessio] = useState<string | null>(
    null
  ); // profesión seleccionada
  const [currentPage, setCurrentPage] = useState<number>(0); // página actual

  const authorsPerPage = 16; // número de autores por página
  const { t, i18n } = useTranslation();

  const navigate = useNavigate(); // Añadir useNavigate
  const { lang } = useParams();

  // Obtener los autores desde la API
  const fetchAuthors = async () => {
    try {
      const response = await axios.get(
        `https://api.elliotfern.com/book.php?type=totsAutors&lang=${lang}`
      );
      setAuthors(response.data);
      setAllAuthors(response.data); // actualiza la lista completa de autores
    } catch (error) {
      console.error("Error al obtener autores:", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // Función para aplicar filtros de país y profesión después de la búsqueda
  const filterAuthors = () => {
    let filteredAuthors = authors;

    if (selectedPais) {
      filteredAuthors = filteredAuthors.filter(
        (author) => author.pais === selectedPais
      );
    }

    if (selectedProfessio) {
      filteredAuthors = filteredAuthors.filter(
        (author) => author.professio === selectedProfessio
      );
    }

    return filteredAuthors;
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // Filtrar los autores después de la búsqueda y de aplicar los filtros
  const filteredAuthors = filterAuthors();

  // Calcular los autores que se mostrarán en la página actual
  const indexOfLastAuthor = (currentPage + 1) * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = filteredAuthors.slice(
    indexOfFirstAuthor,
    indexOfLastAuthor
  );

  // Obtener países y profesiones únicas de los autores
  const paises = Array.from(new Set(allAuthors.map((author) => author.pais)));
  const professions = Array.from(
    new Set(allAuthors.map((author) => author.professio))
  );

  const handleViewDetails = (autorSlug: string) => {
    navigate(`/${i18n.language}/authors/${autorSlug}`);
  };

  return (
    <div className="container-principal">
      <div className="content">
        <h2 className="bold">{t("bookAuthors.titolPagina")}</h2>

        {/* Fila de botones para seleccionar País */}
        <div className="filter-buttons">
          <h3>{t("bookAuthors.countries")}</h3>
          {paises.map((pais) => (
            <button
              key={pais}
              className={`tab-button tab-button-topic ${
                selectedPais === pais ? "active" : ""
              }`}
              onClick={() => {
                setSelectedPais(pais);
                setCurrentPage(0);
              }}
            >
              {pais}
            </button>
          ))}
          <button
            className="tab-button tab-button-all-button"
            onClick={() => {
              setSelectedPais(null);
              setCurrentPage(0);
            }}
          >
            {t("bookAuthors.allCountries")}
          </button>
        </div>

        {/* Fila de botones para seleccionar Profesión */}
        <div className="filter-buttons">
          <h3>{t("bookAuthors.professions")}</h3>
          {professions.map((profession) => (
            <button
              key={profession}
              className={`tab-button tab-button-topic ${
                selectedProfessio === profession ? "active" : ""
              }`}
              onClick={() => {
                setSelectedProfessio(profession);
                setCurrentPage(0);
              }}
            >
              {profession}
            </button>
          ))}
          <button
            className="tab-button tab-button-all-button"
            onClick={() => {
              setSelectedProfessio(null);
              setCurrentPage(0);
            }}
          >
            {t("bookAuthors.allProfessions")}
          </button>
        </div>

        {/* Grid de autores */}
        <div className="grid-container">
          {currentAuthors.map((author) => (
            <div className="grid-item" key={author.id}>
              <img
                className="authorPhoto"
                src={
                  author.nameImg
                    ? `https://media.elliotfern.com/img/library-author/${author.nameImg}.jpg`
                    : "https://media.elliotfern.com/img/library-author/author_default.jpg"
                }
                alt={`Foto de ${author.nom} ${author.cognoms}`}
                title={`${author.nom} ${author.cognoms}`}
                onClick={() => handleViewDetails(author.autorSlug)} // Añadir el evento onClick aquí
                style={{ cursor: "pointer" }} // Opcional: Cambia el cursor al pasar sobre la imagen
              />
              <p>
                <strong>
                  {he.decode(author.nom)} {he.decode(author.cognoms)}
                </strong>
              </p>
              <p>
                <strong>{t("bookAuthors.country")}:</strong> {author.pais}
              </p>
              <p>
                <strong>{t("bookAuthors.profession")}:</strong>{" "}
                {author.professio}
              </p>
              <p>
                <strong>{t("bookAuthors.yearBorn")}:</strong> {author.yearBorn}
              </p>
              {author.yearDie && (
                <p>
                  <strong>{t("bookAuthors.yearDie")}:</strong> {author.yearDie}
                </p>
              )}

              <button
                className="tab-button tab-button-categoria"
                onClick={() => handleViewDetails(author.autorSlug)}
              >
                {t("bookAuthors.authorDetailsBtn")}
              </button>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="pagination-container">
          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Següent"}
            pageCount={Math.ceil(filteredAuthors.length / authorsPerPage)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageLinkClassName={"pagination-link"}
          />
        </div>
      </div>
    </div>
  );
}

export default BooksAuthors;
