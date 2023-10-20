import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function AboutAuthor() {

    const [aboutAuthor, setaboutAuthor] = useState(null)
    const [isFetching, setIsFetching] = useState(true)

    // los Hooks se deben de invocar siempre
    const navigate = useNavigate()
    const { lang } = useParams();

    useEffect(() => {
        getData()
    }, [])

    // traducción cadenas de texto
    let webPostDate = "";
    let webPostModified = "";
    let idArticle = 0;

    if (lang === "es") {
        idArticle = 398;
    } else if (lang === "en") {
        idArticle = 398;
    } else if (lang === "fr") {
        idArticle = 398;
    } else if (lang === "ca") {
        idArticle = 1744;
    } else if (lang === "it") {
        idArticle = 398;
    }

    const getData = async () => {
        try {
            const response = await axios.get(`https://api.elliotfern.com/blog.php?type=articulo&id=${idArticle}`)
            setaboutAuthor(response.data)
            setIsFetching(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            // redireccionar a /error
            navigate("/error")

        }
    }

    // Llamar a getTitle después de que article se haya cargado
    useEffect(() => {

        if (aboutAuthor && aboutAuthor[0] && aboutAuthor[0].post_title) {
            getTitle();
        }
    }, [aboutAuthor]);

    const getTitle = () => {
        document.title = `${aboutAuthor[0].post_title} - Open History`;
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
    const decodedContentArticle = { __html: aboutAuthor[0].post_content };
    const decodedContent = { __html: aboutAuthor[0].post_content };

    return (
        <>
            <div className="container-principal">
                <div className="content text-article">
                    <h2>{aboutAuthor[0].post_title}</h2>

                    <div dangerouslySetInnerHTML={decodedContent} />

                </div>
            </div>
        </>
    )
}

export default AboutAuthor

// en https://api.elliotfern.com/blog.php?type=articulo&id=398

// ca https://api.elliotfern.com/blog.php?type=articulo&id=1744