import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import he from 'he';
import Comment from "../components/Comment";

function Articles() {

    const [article, setArticle] = useState(null)
    const [isFetching, setIsFetching] = useState(true)

    // los Hooks se deben de invocar siempre
    const navigate = useNavigate()
    const { nameArticle } = useParams();

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

    return (
        <>
            <h2 className='text-center bold'>{article[0].post_title}</h2>
            <h5 className='text-center italic'><div dangerouslySetInnerHTML={decodedContentExcerpt} /></h5>
            <div dangerouslySetInnerHTML={decodedContentArticle} />

            <Comment idArticle={idArticle} />
        </>
    )
}

export default Articles