import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/auth.context'

import { useNavigate, Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';

function Profile() {

    // llamamos al hook useNavigate()
    const navigate = useNavigate()

    // llamamos a los estafos del contexto
    const { userFullName, userLang } = useContext(AuthContext)

    //estado para controlar los cambios en userLang
    const [userLangRedirect, setUserLangRedirect] = useState("")

    //estado para controlar los cambios en el FullName user
    const [userFullNameUpdated, setUserFullNameUpdated] = useState(null)

    useEffect(() => {
        setUserFullNameUpdated(userFullName)
    }, [userFullName])

    useEffect(() => {
        setUserLangRedirect(userLang)
    }, [userLang])

    const handleUpdateProfile = () => {
        navigate("/profile/edit")
    }
    let idioma = "";

    if (userLangRedirect === "ca") {
        idioma = "Català"
    } else if (userLangRedirect === "es") {
        idioma = "Spanish"
    } else if (userLangRedirect === "es") {
        idioma = "English"
    } else if (userLangRedirect === "fr") {
        idioma = "French"
    } else if (userLangRedirect === "it") {
        idioma = "Italian"
    }

    return (
        <>
            <h2>Hi, {userFullNameUpdated}!</h2>

            <h5>My saved courses</h5>
            <h5>My saved lessons</h5>

            <h4>Your prefered language</h4>
            <p>{idioma}</p>

            <Button variant="warning" onClick={handleUpdateProfile}>Update profile</Button>

        </>
    )
}

export default Profile