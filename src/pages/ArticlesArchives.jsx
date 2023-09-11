import axios from "axios";
import service from "../services/service.config";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import he from 'he';
import Comment from "../components/Comment";
import { Helmet } from 'react-helmet';
import AuthorBox from "../components/AuthorBox";
import { format } from "date-fns";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

// para usar context
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function ArticlesArchives() {

    const { lang } = useParams();

    const [articlesData, setArticlesData] = useState([]);

    useEffect(() => {
        getData()

        setArticlesData(data);
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get(`https://api.elliotfern.com/blog.php?type=archivo-articulos&lang=${lang}`)
            setArticlesData(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
            // redireccionar a /error
            navigate("/error")

        }
    }

    // Función para agrupar los artículos por curso
    const groupArticlesByCourse = (data) => {
        const groupedData = {};

        data.forEach((article) => {
            const courseName = article.cursName;

            if (!groupedData[courseName]) {
                groupedData[courseName] = [];
            }

            groupedData[courseName].push(article);
        });

        return groupedData;
    };

    // Agrupar los artículos por curso
    const groupedArticles = groupArticlesByCourse(articlesData);

    return (
        <div>
            <h1>Listado de Artículos Agrupados por Curso</h1>
            {Object.keys(groupedArticles).map((courseName) => (
                <div key={courseName}>
                    <h2>{courseName}</h2>
                    <ul>
                        {groupedArticles[courseName].map((article, index) => (
                            <li key={index}>
                                <h3>{article.post_title}</h3>
                                <p>Nombre del artículo: {article.post_name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default ArticlesArchives