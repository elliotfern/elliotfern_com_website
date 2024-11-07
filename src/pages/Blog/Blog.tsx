import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import dayjs from "dayjs"; // Importa dayjs

function Blog() {
  const [blogArticles, setBlogArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const articlesPerPage = 10;

  // Establecer el título de la página
  useEffect(() => {
    document.title = `Blog - Elliot Fernandez`;
  }, []);

  // Obtener los artículos desde la API
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://api.elliotfern.com/blog.php?type=blog`
        );
        setBlogArticles(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  // Manejar el cambio de página
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Calcular los artículos a mostrar en la página actual
  const startIndex = currentPage * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const articlesToShow = blogArticles.slice(startIndex, endIndex);
  
  return (
    <>
      <h2>Blog: Calaix de sastre des de 2002</h2>

      {articlesToShow.map((article) => {
        return (
          <div key={article.ID}>
            <Link
              to={`/blog/${article.post_name}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h3>{article.post_title}</h3>
            </Link>
            <p>{article.post_excerpt}</p>
            <p>Publicat el: {dayjs(article.post_date).format("DD/MM/YYYY")}</p>
            <Link to={`/blog/${article.post_name}`}>Llegir article</Link>
          </div>
        );
      })}

      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Siguiente"}
          pageCount={Math.ceil(blogArticles.length / articlesPerPage)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageLinkClassName={"pagination-link"}
        />
      </div>
    </>
  );
}

export default Blog;
