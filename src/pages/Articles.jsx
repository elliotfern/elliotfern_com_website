import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import he from 'he';
import Comment from "../components/Comment";
import { Helmet } from 'react-helmet';
import AuthorBox from "../components/AuthorBox";
import { format } from "date-fns";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';


function Articles() {

    const [article, setArticle] = useState(null)
    const [isFetching, setIsFetching] = useState(true)

    // los Hooks se deben de invocar siempre
    const navigate = useNavigate()
    const { nameArticle, lang } = useParams();

    // Ref para la sección de comentarios
    const commentsSectionRef = useRef(null);

    // Función para desplazarse a la sección de comentarios al hacer clic en el icono
    const scrollToComments = () => {
        commentsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };


    useEffect(() => {
        getData()

    }, [])

    const getData = async () => {
        try {
            const response = await axios.get(`https://elliotfern.com/controller/blog.php?type=articleName&paramName=${nameArticle}`)
            console.log(response.data)
            setArticle(response.data)
            setIsFetching(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            // redireccionar a /error
            navigate("/error")

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

    const handleRefresh = () => {
        setIsFetching(true)
        getData()

    }

    // dangerouslySetInnerHTML para renderizar el contenido HTML de la API externa
    const decodedContentArticle = { __html: article[0].post_content };
    const decodedContentExcerpt = { __html: article[0].post_excerpt };

    // idArticle
    const idArticle = article[0].ID


    // traducción cadenas de texto
    let webPostDate = "";
    let webPostModified = "";

    if (lang === "es") {
        webPostDate = "Publicado el ";
        webPostModified = "Modificado el ";
    } else if (lang === "en") {
        webPostDate = "Posted on";
        webPostModified = "Modified on ";
    } else if (lang === "fr") {
        webPostDate = "Publié le ";
        webPostModified = "Modifié le ";
    } else if (lang === "ca") {
        webPostDate = "Publicat el ";
        webPostModified = "Modificat el ";
    } else if (lang === "it") {
        webPostDate = "Pubblicato il ";
        webPostModified = "Modificato il ";
    }
    const datePost_format = format(new Date(article[0].post_date), "dd-MM-yyyy");
    const dateModified_format = format(new Date(article[0].post_modified), "dd-MM-yyyy");

    return (
        <>
            <Helmet>
                <meta name="description" content={he.decode(article[0].post_excerpt)} />
            </Helmet>

            <h2 className='text-center bold'>{article[0].post_title}</h2>
            <h5 className='text-center italic'><div dangerouslySetInnerHTML={decodedContentExcerpt} /></h5>

            <AuthorBox />

            <hr />

            <p>{webPostDate} {datePost_format} | {webPostModified} {dateModified_format}</p>
            <div className="icon-comments"><Link to="#" onClick={scrollToComments}>
                <FontAwesomeIcon icon={faComment} /> Comments
            </Link>
            </div>


            <div dangerouslySetInnerHTML={decodedContentArticle} />

            <div ref={commentsSectionRef}>
                <Comment idArticle={idArticle} />
            </div>
        </>
    )
}

export default Articles