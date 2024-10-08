import { createContext, useEffect, useState, useCallback } from "react";
import service from "../services/service.config"

const AuthContext = createContext({
    isUserActive: false,
    userLang: null,
    langUrlDinamico: null,
    verifyToken: async () => {}
});

function AuthWrapper(props) {
    const currentUrl = window.location.href;
    const segments = currentUrl.split('/');
    const langUrl = segments[3];

    const [isUserActive, setIsUserActive] = useState(false);
    const [activeUserId, setActiveUserId] = useState(null);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);
    const [userLang, setUserLang] = useState(null);
    const [userSavedCourses, setUserSavedCourses] = useState([]);
    const [userSavedLessons, setUserSavedLessons] = useState([]);
    const [userFullName, setUserFullName] = useState(null);
    const [langUrlDinamico, setLangUrlDinamico] = useState(langUrl);

    const verifyToken = useCallback(async () => {
        setIsPageLoading(true);
        try {
            // Aquí deberías hacer la llamada a la API para verificar el token y obtener los detalles del usuario.
            const response = await service.get("/auth/verify");
            const userData = await service.get("/profile");

            setIsUserActive(true);
            setActiveUserId(response.data._id);
            setUserLang(response.data.lang);
            setUserDetails(userData.data);
            setUserFullName(userData.data.fullName);

            // Actualiza las listas de cursos y lecciones guardados
            setUserSavedCourses(userData.data.savedCourses);
            setUserSavedLessons(userData.data.savedLessons);
        } catch (error) {
            console.log(error);
            setIsUserActive(false);
            setActiveUserId(null);
            setUserLang(null);
            setUserDetails(null);
            setUserFullName(null);
            setUserSavedCourses([]);
            setUserSavedLessons([]);
        } finally {
            setIsPageLoading(false);
        }
    }, []);

    useEffect(() => {
        verifyToken();
    }, [verifyToken]);

    const passedContext = {
        verifyToken,
        isUserActive,
        activeUserId,
        userLang,
        userDetails,
        userFullName,
        langUrlDinamico,
        setLangUrlDinamico,
        userSavedCourses,
        userSavedLessons,
        updateUserLang: setUserLang,
        updateUserFullName: setUserFullName,
    };

    if (isPageLoading) {
        return <h3>Loading...</h3>; // Considera usar un spinner o una mejor UI
    }

    return (
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    );
}

export {
    AuthContext,
    AuthWrapper
};