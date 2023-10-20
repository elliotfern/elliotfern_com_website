import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import he from 'he';
import { format } from "date-fns";
import ReactPaginate from 'react-paginate';
import unorm from 'unorm';

function Blog() {
    const [blogArticles, setBlogArticles] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const articlesPerPage = 10;

    const navigate = useNavigate();

    useEffect(() => {
        getData();
        getTitle()
    }, []);

    const getTitle = () => {
        document.title = `Blog - Elliot Fernandez`;
    }

    const getData = async () => {
        try {
            const response = await axios.get(`https://api.elliotfern.com/blog.php?type=blog`);
            setBlogArticles(response.data);
            setIsFetching(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        };

        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("pagination-link")) {
                scrollToTop();
            }
        });

        return () => {
            document.removeEventListener("click", scrollToTop);
        };
    }, []);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Función para eliminar acentos de una cadena utilizando unorm.nfd()
    const removeAccents = (str) => {
        return unorm.nfd(str)
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    };

    // Función para realizar la búsqueda sin considerar acentos
    const searchWithoutAccents = (query) => {
        const normalizedQuery = removeAccents(query);
        return blogArticles.filter((article) => {
            const normalizedTitle = removeAccents(article.post_title);
            return normalizedTitle.includes(normalizedQuery);
        });
    };

    // Filtrar artículos según la consulta de búsqueda
    const filteredArticles = searchWithoutAccents(searchQuery);

    // Calcular el índice de inicio y fin de los artículos en la página actual
    const startIndex = currentPage * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const articlesToDisplay = filteredArticles.slice(startIndex, endIndex);

    return (
        <>
            <div className="container-principal">
                <div className="content text-article">

                    <h2 className="text-center">Blog: calaix de sastre des de 2002</h2>

                    <div className="mb-3">
                        <form
                            type="text"
                            placeholder="Cercar per titol al blog..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {filteredArticles.length === 0 ? (
                        <p className="text-center">No hi ha cap resultat que coincideixi amb la teva recerca</p>
                    ) : (
                        <div >
                            {articlesToDisplay.map((eachCourse) => {
                                return (
                                    <div key={eachCourse.ID}>



                                        <Link to={`/blog/${eachCourse.post_name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <h3>{he.decode(eachCourse.post_title)}</h3>
                                        </Link>


                                        {he.decode(eachCourse.post_excerpt)}



                                        <p>{format(new Date(eachCourse.post_date), "dd-MM-yyyy")}</p>
                                        <Link to={`/blog/${eachCourse.post_name}`}>
                                            Llegir l'anotació
                                        </Link>


                                    </div>
                                )
                            })}
                        </div>
                    )
                    }

                    <div className="pagination-container">
                        <ReactPaginate
                            previousLabel={"Anterior"}
                            nextLabel={"Següent"}
                            pageCount={Math.ceil(filteredArticles.length / articlesPerPage)}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={2}
                            onPageChange={handlePageChange}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                            pageLinkClassName={"pagination-link"}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog;