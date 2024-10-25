import { useState } from "react";
import { useTranslation } from "react-i18next";

function SearchBooks(props) {
    const [queryInput, setQueryInput] = useState("");
    const { t } = useTranslation();
    
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
        <div className="search-container">
            <h2>{t("book.titolCercador")}</h2>
            <div>
                <input
                    type="search"
                    placeholder={t("book.cercadorPlaceHolder")}
                    value={queryInput}
                    onChange={handleSearch}
                    className="search-input"
                    aria-label="Search"
                    name="name"
                />
                <button onClick={handleClearSearch} className="tab-button tab-button-topic">
                {t("book.esborrar")}
                </button>
            </div>
        </div>
    )
}

export default SearchBooks;