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

function Articles() {
    const [article, setArticle] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [commentCount, setCommentCount] = useState(0);

    const { isUserActive, userDetails, updateUserSavedLessons } = useContext(AuthContext);

    // estado para los id de los articulos guardados por el usuario
    const [userSavedLessons, setUserSavedLessons] = useState(userDetails ? userDetails.savedLessons : []);

    // los Hooks se deben de invocar siempre
    const navigate = useNavigate();
    const { nameArticle, lang } = useParams();
    const commentsSectionRef = useRef(null);

    // Función para desplazarse a la sección de comentarios al hacer clic en el icono
    const scrollToComments = () => {
        commentsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleCommentPosted = () => {
        // Obtener la longitud actual de los comentarios y agregar 1 para el nuevo comentario
        const updatedCommentCount = commentCount + 1;
        setCommentCount(updatedCommentCount);
    }

    const handleCommentDeleted = () => {
        // Obtener la longitud actual de los comentarios y restar 1 para el comentario eliminado
        const updatedCommentCount = commentCount - 1;
        setCommentCount(updatedCommentCount);
    }


    useEffect(() => {
        if (typeof userDetails !== 'undefined' && userDetails !== null) {
            setUserSavedLessons(userDetails.savedLessons)
        }
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


    const handleLessonSaved = async (e, articleId) => {
        e.preventDefault();
        const savedLesson = e.target.value;

        // Convierte articleId a cadena de texto antes de agregarlo
        const articleIdAsString = articleId.toString();

        try {
            const response = await service.patch("/profile/savedLessons", {
                savedLessons: [articleIdAsString], // Envía un array con el ID del artículo como cadena de texto
            });
            console.log(response);

            // Actualiza el estado userSavedLessons con el nuevo artículo guardado
            setUserSavedLessons([...userSavedLessons, articleIdAsString]);
            updateUserSavedLessons([...userSavedLessons, articleIdAsString]);
        } catch (error) {
            console.log(error);
        }
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
    let webCommentsText = "";

    if (lang === "es") {
        webPostDate = "Publicado el ";
        webPostModified = "Modificado el ";
        webCommentsText = "Comentarios"
    } else if (lang === "en") {
        webPostDate = "Posted on";
        webPostModified = "Modified on ";
        webCommentsText = "Comments"
    } else if (lang === "fr") {
        webPostDate = "Publié le ";
        webPostModified = "Modifié le ";
        webCommentsText = "Commentaires"
    } else if (lang === "ca") {
        webPostDate = "Publicat el ";
        webPostModified = "Modificat el ";
        webCommentsText = "Comentaris"
    } else if (lang === "it") {
        webPostDate = "Pubblicato il ";
        webPostModified = "Modificato il ";
        webCommentsText = "Commenti"
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
                <FontAwesomeIcon icon={faComment} /> {webCommentsText} ({commentCount})
            </Link>
            </div>

            {/* Renderizar el botón solo si el articulo no está guardado */}
            {isUserActive && (
                <p>
                    <Button
                        variant="primary"
                        type="submit"
                        name="idArticle"
                        value={idArticle}
                        onClick={(e) => handleLessonSaved(e, idArticle)} // Pasar el ID del articulo
                    >
                        Guardar articulo
                    </Button>
                </p>
            )}


            <div dangerouslySetInnerHTML={decodedContentArticle} />

            <hr />

            <div ref={commentsSectionRef}>
                <Comment idArticle={idArticle} updateCommentCount={setCommentCount} onCommentPosted={handleCommentPosted}
                    onCommentDeleted={handleCommentDeleted} />
            </div>
        </>
    )
}

export default Articles;