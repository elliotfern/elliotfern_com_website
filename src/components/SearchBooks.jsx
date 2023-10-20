import { useState } from "react";

function SearchBooks(props) {
    const [queryInput, setQueryInput] = useState("");

    // handler para disparar la query del buscador de libros
    const handleSearch = (e) => {
        setQueryInput(e.target.value);

        const terminoBusqueda = e.target.value.toLowerCase();
        const filteredArray = props.allBooks.filter((eachBook) => {
            const bookName = eachBook.titol.toLowerCase();
            return bookName.includes(terminoBusqueda);
        });

        props.setBooks(filteredArray);
    }

    // Restablecer la lista completa de libros cuando el usuario borre el texto del campo de búsqueda
    const handleClearSearch = () => {
        setQueryInput("");
        props.setBooks(props.allBooks); // Restablece la lista de libros
    };

    return (
        <div className="box-buscador">
            <h2>Search</h2>
            <div>
                <input
                    type="search"
                    placeholder="Buscar libro por título..."
                    value={queryInput}
                    onChange={handleSearch}
                    className="me-2"
                    aria-label="Search"
                    name="name"
                />
                <button variant="secondary" onClick={handleClearSearch}>
                    Borrar
                </button>
            </div>
        </div>
    )
}

export default SearchBooks;