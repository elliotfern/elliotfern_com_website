import React, { useEffect, useState } from "react";
import SearchBooks from "../components/SearchBooks";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import he from "he";

interface Book {
  id: string;
  titol: string;
  AutNom: string;
  AutCognom1: string;
  any: string;
  lang: string;
  genere: string;
  nameImg: string;
}

function Books() {
  const [books, setBooks] = useState<Book[]>([]); // libros filtrados por búsqueda
  const [allBooks, setAllBooks] = useState<Book[]>([]); // lista completa de libros
  const [selectedGenere, setSelectedGenere] = useState<string | null>(null); // género seleccionado
  const [selectedLang, setSelectedLang] = useState<string | null>(null); // idioma seleccionado
  const [currentPage, setCurrentPage] = useState<number>(0); // página actual

  const articlesPerPage = 15; // número de libros por página
  const { t } = useTranslation();

  // Obtener los libros desde la API
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "https://api.elliotfern.com/book.php?type=books"
      );
      setBooks(response.data);
      setAllBooks(response.data); // actualiza la lista completa de libros
    } catch (error) {
      console.error("Error al obtener libros:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Función para manejar el término de búsqueda
  const handleSearch = (query: string) => {
    if (query === "") {
      setBooks(allBooks);
    } else {
      const filteredBooks = allBooks.filter((book) => {
        return (
          book.titol.toLowerCase().includes(query.toLowerCase()) ||
          (book.AutCognom1 &&
            book.AutCognom1.toLowerCase().includes(query.toLowerCase())) // Verificar si AutCognom1 existe
        );
      });
      setBooks(filteredBooks);
    }
    // Resetear la página a 0 cuando se realiza una búsqueda
    setCurrentPage(0);
  };

  // Función para aplicar filtros de género e idioma después de la búsqueda
  const filterBooks = () => {
    let filteredBooks = allBooks; // Aplicar los filtros a la lista completa de libros

    // Filtrar por búsqueda
    if (books.length > 0) {
      filteredBooks = books; // Si hay libros filtrados por búsqueda, usar eso como base
    }

    if (selectedGenere) {
      filteredBooks = filteredBooks.filter(
        (book) => book.genere === selectedGenere
      );
    }

    if (selectedLang) {
      filteredBooks = filteredBooks.filter(
        (book) => book.lang === selectedLang
      );
    }

    return filteredBooks;
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // Filtrar los libros después de la búsqueda y de aplicar los filtros
  const filteredBooks = filterBooks();

  // Calcular los libros que se mostrarán en la página actual
  const indexOfLastArticle = (currentPage + 1) * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentBooks = filteredBooks.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Obtener los géneros e idiomas únicos de los libros
  const generes = Array.from(new Set(allBooks.map((book) => book.genere)));
  const langs = Array.from(new Set(allBooks.map((book) => book.lang)));

  return (
    <div className="container-principal">
      <div className="content">
        <h2>{t("book.titolPagina")}</h2>

        {/* Componente del buscador */}
        <SearchBooks
          books={books}
          setBooks={setBooks}
          allBooks={allBooks}
          onSearch={handleSearch}
        />

        {/* Fila de botones para seleccionar Géneros */}
        <div className="filter-buttons">
          <h3>{t("book.genres")}</h3>
          {generes.map((genere) => (
            <button
              key={genere}
              className={`tab-button tab-button-topic ${
                selectedGenere === genere ? "active" : ""
              }`}
              onClick={() => {
                setSelectedGenere(genere);
                setCurrentPage(0); // Resetea a la primera página al seleccionar un género
              }}
            >
              {genere}
            </button>
          ))}
          <button
            className="tab-button tab-button-all-button"
            onClick={() => {
              setSelectedGenere(null);
              setCurrentPage(0); // Resetea a la primera página al seleccionar "todos"
            }}
          >
            {t("book.allGenres")}
          </button>
        </div>

        {/* Fila de botones para seleccionar Idiomas */}
        <div className="filter-buttons">
          <h3>{t("book.languages")}</h3>
          {langs.map((lang) => (
            <button
              key={lang}
              className={`tab-button tab-button-categoria ${
                selectedLang === lang ? "active" : ""
              }`}
              onClick={() => {
                setSelectedLang(lang);
                setCurrentPage(0); // Resetea a la primera página al seleccionar un idioma
              }}
            >
              {lang}
            </button>
          ))}
          <button
            className="tab-button tab-button-all-button"
            onClick={() => {
              setSelectedLang(null);
              setCurrentPage(0); // Resetea a la primera página al seleccionar "todos"
            }}
          >
            {t("book.allLanguages")}
          </button>
        </div>

        {/* Grid de libros */}
        <div className="grid-container">
          {currentBooks.map((book) => (
            <div className="grid-item" key={book.id}>
              <img
                className="bookPhoto"
                src={
                  book.nameImg
                    ? `https://media.elliotfern.com/img/library-book/${book.nameImg}.jpg`
                    : "https://media.elliotfern.com/img/book_default.png"
                }
                alt={`Portada de ${book.titol}`}
              />
              <p>{he.decode(book.titol)}</p>
              <p>
                {book.AutNom} {book.AutCognom1}
              </p>
              <p>
                {t("book.year")}: {book.any}
              </p>
              <p>
                {t("book.originalLanguage")}: {book.lang}
              </p>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="pagination-container">
          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Següent"}
            pageCount={Math.ceil(filteredBooks.length / articlesPerPage)}
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

export default Books;
