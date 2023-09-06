import axios from "axios";
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Profile() {

    //https://elliotfern.com/controller/blog.php?type=listadoarticulos&lang=ca

    const navigate = useNavigate();
    const { userFullName, userLang, userDetails } = useContext(AuthContext);

    // Manejo de estados
    const [userLangRedirect, setUserLangRedirect] = useState("");
    const [userFullNameUpdated, setUserFullNameUpdated] = useState(null);

    // Cursos guardados como favoritos
    const [savedCoursesList, setSavedCoursesList] = useState(userDetails.savedCourses);
    const [courseTitles, setCourseTitles] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga de datos

    useEffect(() => {
        setUserFullNameUpdated(userFullName);
        getData();
    }, [userFullName]);

    useEffect(() => {
        setUserLangRedirect(userLang);
    }, [userLang]);

    const cursosApi = `https://elliotfern.com/controller/blog.php?type=listado-cursos&langCurso=${userLang}`;

    const getData = async () => {
        try {
            const response = await axios.get(cursosApi);
            setCourseTitles(response.data);
            setLoading(false); // Marcar que los datos se han cargado
        } catch (error) {
            navigate("/error");
        }
    };

    const handleUpdateProfile = () => {
        navigate("/profile/edit");
    };

    let idioma = "";

    if (userLangRedirect === "ca") {
        idioma = "Català";
    } else if (userLangRedirect === "es") {
        idioma = "Spanish";
    } else if (userLangRedirect === "en") {
        idioma = "English";
    } else if (userLangRedirect === "fr") {
        idioma = "French";
    } else if (userLangRedirect === "it") {
        idioma = "Italian";
    }

    // Mostrar un mensaje de carga mientras se obtienen los datos
    if (loading) {
        return <p>Loading...</p>;
    }
    console.log("cursos usuario favoritos", savedCoursesList)
    console.log("cursos titulos", courseTitles)

    // Filtrar títulos de cursos guardados por los IDs guardados en savedCoursesList
    const savedCourseTitles = savedCoursesList.map(savedCourseId => {
        const course = courseTitles.find(course => course.id.toString() === savedCourseId);
        console.log(course)
        return course ? course.nombreCurso : ""; // Usamos course.nombreCurso en lugar de course.title
    });

    return (
        <>
            <h2>Hi, {userFullNameUpdated}!</h2>

            <h5>My saved courses</h5>
            {savedCourseTitles.length > 0 ? (
                <ul>
                    {savedCourseTitles.map((nombreCurso, index) => {
                        const course = courseTitles.find(course => course.id.toString() === savedCoursesList[index]);
                        return (
                            <li key={index}>
                                {course && (
                                    <Link to={`/${userLang}/course/${course.paramName}`}>{nombreCurso}</Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No saved courses found.</p>
            )}
            <h5>My saved lessons</h5>

            <h4>Your preferred language</h4>
            <p>{idioma}</p>

            <Button variant="warning" onClick={handleUpdateProfile}>Update profile</Button>
        </>
    );
}

export default Profile;