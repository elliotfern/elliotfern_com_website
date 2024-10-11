import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import he from "he";

function ArticlesArchives() {
    const { lang } = useParams();

    const [articlesData, setArticlesData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get(`https://api.elliotfern.com/blog.php?type=arxiuArticles&lang=${lang}`);
            setArticlesData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error and redirection to /error if needed
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
        <div className="container-principal">
            <div className="content text-article">
                <h1>Article archives</h1>
                {Object.keys(groupedArticles).map((courseName) => (
                    <div key={courseName}>
                        <h4>
                            {/* Enlace al curso con la estructura deseada */}
                            <Link to={`/${lang}/course/${groupedArticles[courseName][0].cursParam}`}>{he.decode(courseName)}</Link>
                        </h4>
                        <ol>
                            {groupedArticles[courseName].map((article, index) => (
                                <li key={index}>

                                    <Link to={`/${lang}/article/${article.post_name}`}>{he.decode(article.post_title)}</Link>

                                </li>
                            ))}
                        </ol>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ArticlesArchives;