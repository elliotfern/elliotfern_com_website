import { createContext, useEffect, useState } from "react";
import service from "../services/service.config";

const AuthContext = createContext()

function AuthWrapper(props) {

    // ...
    const [isUserActive, setIsUserActive] = useState(false)
    const [activeUserId, setActiveUserId] = useState(null)
    const [isPageLoading, setIsPageLoading] = useState(true)

    useEffect(() => {
        verifyToken()
    }, [])

    const verifyToken = async () => {

        // spinner que se muestra mientras se valida el token
        setIsPageLoading(true)

        try {

            const response = await service.get("/auth/verify")
            console.log(response)

            setIsUserActive(true)
            setActiveUserId(response.data._id)
            setIsPageLoading(false)

        } catch (error) {
            console.log(error)
            setIsUserActive(false)
            setActiveUserId(null)
            setIsPageLoading(false)
        }

    }

    const passedContext = {
        verifyToken, // para validar el token en login, volver a la app o logout
        isUserActive, // para mostrar enlaces dependiendo de si el user esta logeado o no. Ver paginas privadas.
        activeUserId // para mostrar funcionalidades de borrar/editar solo cuando el usuario sea el dueño de un documento
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