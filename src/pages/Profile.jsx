import axios from "axios";
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Profile() {
    const navigate = useNavigate();
    const { userFullName, userLang, userDetails } = useContext(AuthContext);

    // manejo de estados
    const [userLangRedirect, setUserLangRedirect] = useState("");
    const [coursesList, setCoursesList] = useState([]);
    const [savedCourseTitles, setSavedCourseTitles] = useState([]);
    const [userFullNameUpdated, setUserFullNameUpdated] = useState(null);

    const handleUpdateProfile = () => {
        navigate("/profile/edit");
    };

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
            setCoursesList(response.data);
        } catch (error) {
            navigate("/error");
        }
    };

    useEffect(() => {
        if (userDetails.savedCourses && coursesList.length > 0) {
            const savedTitles = userDetails.savedCourses.map(savedCourseId => {
                const course = coursesList.find(course => course.id === savedCourseId);
                return course ? course.title : "";
            });
            setSavedCourseTitles(savedTitles);
        }
    }, [userDetails.savedCourses, coursesList]);

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

    console.log("listado de cursos", coursesList)
    console.log("cursos guardados usuario", savedCourseTitles)
    return (
        <>
            <h2>Hi, {userFullNameUpdated}!</h2>

            <h5>My saved courses</h5>
            {savedCourseTitles.length > 0 ? (
                <ul>
                    {savedCourseTitles.map((nombreCurso, index) => (
                        <li key={index}>{nombreCurso}</li>
                    ))}
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