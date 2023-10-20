import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import he from 'he';
import { Helmet } from 'react-helmet';
import AuthorBox from "../components/AuthorBox";
import { format } from "date-fns";

function BlogArticles() {
    const [article, setArticle] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    // los Hooks se deben de invocar siempre
    const navigate = useNavigate();
    const { blogArticle } = useParams();

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const response = await axios.get(`https://api.elliotfern.com/blog.php?type=blog-articulo&paramName=${blogArticle}`)
            setArticle(response.data)
            setIsFetching(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            // redireccionar a /error
            //navigate("/error")

        }
    }

    // Llamar a getTitle después de que article se haya cargado
    useEffect(() => {

        if (article && article[0] && article[0].post_title) {
            getTitle();
        }
    }, [article]);

    const getTitle = () => {
        document.title = `${article[0].post_title} - Open History`;
    }


    if (isFetching === true) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}>
                <h3>cargando ... </h3>
            </div>
        )
    }

    // dangerouslySetInnerHTML para renderizar el contenido HTML de la API externa
    const decodedContentArticle = { __html: article[0].post_content };
    const decodedContentExcerpt = { __html: article[0].post_excerpt };

    // idArticle
    const idArticle = article[0].ID

    const datePost_format = format(new Date(article[0].post_date), "dd-MM-yyyy");
    const dateModified_format = format(new Date(article[0].post_modified), "dd-MM-yyyy");

    return (
        <>
            <div className="container-principal">
                <div className="content text-article">
                    <Helmet>
                        <meta name="description" content={he.decode(article[0].post_excerpt)} />
                    </Helmet>

                    <h2 className='text-center bold'>{article[0].post_title}</h2>
                    <h5 className='text-center italic'><div dangerouslySetInnerHTML={decodedContentExcerpt} /></h5>

                    <AuthorBox lang={"ca"} />

                    <hr />

                    <p>Publicat el {datePost_format} | Modificat el {dateModified_format}</p>


                    <div dangerouslySetInnerHTML={decodedContentArticle} />

                    <hr />
                </div>
            </div>
        </>
    )
}

export default BlogArticles;