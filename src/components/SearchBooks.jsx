import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SearchBooks(props) {
    const [queryInput, setQueryInput] = useState("");

    // handler para disparar la query del buscador de libros
    const handleSearch = (e) => {
        setQueryInput(e.target.value);

        const terminoBusqueda = e.target.value.toLowerCase();
        const filteredArray = props.allBooks.filter((eachBook) => {
            const bookName = eachBook.bookTitle.toLowerCase();
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
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Buscar libro por título..."
                    value={queryInput}
                    onChange={handleSearch}
                    className="me-2"
                    aria-label="Search"
                    name="name"
                />
                <Button variant="secondary" onClick={handleClearSearch}>
                    Borrar
                </Button>
            </Form>
        </div>
    )
}

export default SearchBooks;