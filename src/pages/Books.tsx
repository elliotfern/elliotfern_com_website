import React, { useEffect, useState } from "react";
import SearchBooks from "../components/SearchBooks";
import axios from "axios";

function Books() {
    //const { activeUserId, userDetails } = useContext(AuthContext);

    // -creamos dos estados para mantener la lista de libros, un estado para las busquedas y otro para tener siempre la lista completa de libros
    const [books, setBooks] = useState([]); //listado original
    const [allBooks, setAllBooks] = useState([]); // busquedas

    const fetchBooks = async () => {
        try {
            const response = await axios.get("https://api.elliotfern.com/book.php?type=books");
            setBooks(response.data);
            setAllBooks(response.data); // Actualiza la lista completa de libros
        } catch (error) {
            console.error("Error al obtener libros:", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="container-principal">
            <div className="content">
                <h2>The books of the Open History community</h2>

                <SearchBooks books={books} setBooks={setBooks} allBooks={allBooks} />


                <div className="grid-container">
                    {books.map((book) => (
                        <div className="grid-item" key={book.id}>
                            <img className="bookPhoto"
                                src={book.nameImg ? `https://media.elliotfern.com/img/library-book/${book.nameImg}.jpg` : "https://media.elliotfern.com/img/book_default.png"}
                                alt={`Portada de ${book.titol}`}
                            />
                            {book.titol}
                            {book.AutNom} {book.AutCognom1}
                            <p>Year: {book.any}</p>
                            <p>Original language: {book.lang}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Books;