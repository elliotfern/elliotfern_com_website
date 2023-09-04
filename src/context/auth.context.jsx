import { createContext, useEffect, useState } from "react";
import service from "../services/service.config";

const AuthContext = createContext()

function AuthWrapper(props) {

    // función para actualizar el idioma del usuario
    const updateUserLang = (newLang) => {
        setUserLang(newLang);
    };

    const updateUserFullName = (newFullName) => {
        setUserFullName(newFullName);
    };


    // ...
    const [isUserActive, setIsUserActive] = useState(false)
    const [activeUserId, setActiveUserId] = useState(null)
    const [isPageLoading, setIsPageLoading] = useState(true)
    const [userDetails, setUserDetails] = useState(null)
    const [userLang, setUserLang] = useState(null)
    const [userFullName, setUserFullName] = useState(null)

    useEffect(() => {
        verifyToken()
    }, [])

    const verifyToken = async () => {

        // spinner que se muestra mientras se valida el token
        setIsPageLoading(true)

        try {

            const response = await service.get("/auth/verify")
            console.log(response)

            const userData = await service.get("/profile")
            console.log(userData)
            console.log("user full name", userData.data.fullName)

            setIsUserActive(true)
            setActiveUserId(response.data._id)
            setIsPageLoading(false)
            setUserLang(response.data.lang)
            setUserDetails(userData.data)
            setUserFullName(userData.data.fullName)

        } catch (error) {
            console.log(error)
            setIsUserActive(false)
            setActiveUserId(null)
            setIsPageLoading(false)
            setUserLang(null)
            setUserDetails(null)
            setUserFullName(null)
        }

    }

    const passedContext = {
        verifyToken, // para validar el token en login, volver a la app o logout
        isUserActive, // para mostrar enlaces dependiendo de si el user esta logeado o no. Ver paginas privadas.
        activeUserId, // para mostrar funcionalidades de borrar/editar solo cuando el usuario sea el dueño de un documento
        userLang, // para poder mostrar el idioma que ha elegido el usuario
        userDetails, // aqui mandamos todos los detalles del usuario
        updateUserLang,
        updateUserFullName,
        userFullName
    }

    // clausula de guardia para toda la pagina
    if (isPageLoading === true) {
        return <h3>... Validando credenciales</h3>
    }

    return (
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )

}

export {
    AuthContext,
    AuthWrapper
}