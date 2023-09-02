import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from "react-router-dom"
import he from 'he';

function Course() {

    const [courseArticlesList, setCourseArticlesList] = useState(null)
    const [isFetching, setIsFetching] = useState(true)

    // los Hooks se deben de invocar siempre
    const navigate = useNavigate()
    const { lang, nameCourse } = useParams();

    useEffect(() => {
        getData()

    }, [])

    const getData = async () => {
        try {
            const response = await axios.get(`https://elliotfern.com/controller/blog.php?type=curso&paramName=${nameCourse}&langCurso=${lang}`)
            setCourseArticlesList(response.data)
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
                <h3>Loading ... </h3>
            </div>
        )
    }

    const handleRefresh = () => {
        setIsFetching(true)
        getData()

    }
    // obtener titulo y descripcion del curso
    const primerCurso = courseArticlesList[0];
    const courseName = primerCurso.courseName;
    const courseDescription = primerCurso.descriptionCourse;

    // traducción cadenas de texto
    let webContenidos = "";

    if (lang === "es") {
        webContenidos = "Contenidos del curso:"
    } else if (lang === "en") {
        webContenidos = "Course content:"
    } else if (lang === "fr") {
        webContenidos = "Contenuti del corso:"
    } else if (lang === "ca") {
        webContenidos = "Continguts del curs:"
    } else if (lang === "it") {
        webContenidos = "Contenuti del corso:"
    }

    return (
        <>
            <h2 className='text-center'> {he.decode(courseName)}</h2>
            <h6 className='text-center italic'> {he.decode(courseDescription)}</h6>

            <h5 className="separador">{webContenidos}</h5>

            <ListGroup>
                {courseArticlesList.map((eachArticle) => {
                    return (
                        <ListGroup.Item action key={eachArticle.ID}>
                            <Link to={`/${lang}/article/${eachArticle.post_name}`} >
                                {eachArticle.post_title}
                            </Link>
                        </ListGroup.Item>
                    )
                }
                )}
            </ListGroup>

        </>
    )
}

export default Course