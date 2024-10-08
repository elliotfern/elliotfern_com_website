/*

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from '../context/auth.context';
import { useNavigate, Link } from "react-router-dom";
import { Button} from 'react-bootstrap';

function Profile() {
    const navigate = useNavigate();
    const { userFullName, userLang, userDetails, userSavedLessons, userSavedCourses } = useContext(AuthContext);

    const [userDetailsUpdated, setUserDetailsUpdated] = useState(userDetails);

    const [userLangRedirect, setUserLangRedirect] = useState("");
    const [userFullNameUpdated, setUserFullNameUpdated] = useState(null);
    const [savedCoursesList, setSavedCoursesList] = useState(userSavedCourses);
    const [courseTitles, setCourseTitles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savedLessonsList, setSavedLessonsList] = useState(userSavedLessons);
    const [articlesTitles, setarticlesTitles] = useState([]);

    useEffect(() => {
        setUserFullNameUpdated(userFullName);
        getData();
    }, [userFullName]);

    useEffect(() => {
        setUserLangRedirect(userLang);
    }, [userLang]);

    useEffect(() => {
        // Suscribirse al cambio de la lista de cursos guardados en el contexto
        setSavedCoursesList(userDetails.savedCourses);
        // Suscribirse al cambio de la lista de lecciones guardadas en el contexto
        setSavedLessonsList(userDetails.savedLessons);
    }, [userDetails.savedCourses, userDetails.savedLessons]); // Add userDetails.savedLessons as a dependency

    const cursosApi = `https://api.elliotfern.com/blog.php?type=listado-cursos&langCurso=${userLang}`;
    const articlesApi = `https://api.elliotfern.com/blog.php?type=listadoarticulos&lang=${userLang}`;

    const getData = async () => {
        try {
            const response = await axios.get(cursosApi);
            setCourseTitles(response.data);
            setLoading(false);

            const responseArt = await axios.get(articlesApi);
            setarticlesTitles(responseArt.data);
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

    if (courseTitles.length === 0 || articlesTitles.length === 0) {
        return <p>Loading...</p>;
    }

    const savedCourseTitles = savedCoursesList.map(savedCourseId => {
        const course = courseTitles.find(course => course.id.toString() === savedCourseId);
        return course ? course.nombreCurso : "";
    });

    const savedLessonsTitles = savedLessonsList.map(savedLessonId => {
        const lesson = articlesTitles.find(article => article.ID.toString() === savedLessonId);
        return lesson ? lesson.post_title : "";
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
            {savedLessonsTitles.length > 0 ? (
                <ul>
                    {savedLessonsTitles.map((nombreArticulo, index) => {
                        const savedLessonId = savedLessonsList[index];
                        const article = articlesTitles.find(article => article.ID.toString() === savedLessonId);
                        if (article && article.post_name) {
                            const postName = article.post_name;
                            return (
                                <li key={index}>
                                    <Link to={`/${userLang}/article/${postName}`}>{nombreArticulo}</Link>
                                </li>
                            );
                        }
                        return null;
                    })}
                </ul>
            ) : (
                <p>No saved lessons found.</p>
            )}

            <h4>Your preferred language</h4>
            <p>{idioma}</p>

            <Button variant="warning" onClick={handleUpdateProfile}>Update profile</Button>
        </>
    );
}

export default Profile;

*/