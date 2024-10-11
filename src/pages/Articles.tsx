import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthorBox from "../components/AuthorBox";
import he from "he";
import { useTranslation } from 'react-i18next';
import dayjs from "dayjs";

function Articles() {
    const { t } = useTranslation();
    const [article, setArticle] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    // los Hooks se deben de invocar siempre
    const { nameArticle } = useParams();
  
    const getData = useCallback(async () => {
        try {
          const response = await axios.get(`https://api.elliotfern.com/blog.php?type=articleName&paramName=${nameArticle}`);
          setArticle(response.data);
          setIsFetching(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }, [nameArticle]);
    
      useEffect(() => {
        getData();
      }, [getData]);

    // Llamar a getTitle después de que article se haya cargado
    useEffect(() => {

        if (article && article[0] && article[0].post_title) {
            getTitle();
        }
    }, [article]);

    const getTitle = () => {
        document.title = `${article[0].post_title} - Elliot Fernandez`;
    }


    if (isFetching === true) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}>
                <h3>cargando ... </h3>
            </div>
        )
    }

    // Función para eliminar los comentarios HTML
    const cleanHTML = (html) => {
        return html.replace(/<!--[\s\S]*?-->/g, ''); // Eliminar comentarios HTML
    };

    const decodedContent = he.decode(cleanHTML(he.decode(article.post_content)));

    // Función para formatear la fecha en español
    const formatFecha = (fecha) => {
        return dayjs(fecha).format('D/MM/YYYY');
    };

    return (
        <>
            <div className="container-principal">
                <div className="content">
                    <h2 className='text-center bold'>{he.decode(article.post_title)}</h2>
                    <h5 className='text-center italic'>
                    {he.decode(article.post_excerpt)}  </h5>
                    <div/>

                    <AuthorBox />

                    <hr />

                    <p>{t('webPostDate')} {formatFecha(article.post_date)} | {t('webPostModified')} {formatFecha(article.post_modified)}</p>
                    <hr />

                    <div className="text-article" dangerouslySetInnerHTML={{ __html: decodedContent }}></div>

                    <hr />
                </div>
            </div>
        </>
    )
}

export default Articles;