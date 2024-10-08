/*
import React, { useContext } from "react";
import { AuthContext } from '../context/auth.context'

import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import service from "../services/service.config";
import { Form, Button} from 'react-bootstrap';

function ProfileEdit() {

    // llamamos al hook useNavigate()
    const navigate = useNavigate()

    // llamamos a los estados del contexto
    const { updateUserLang, userLang, userFullName, updateUserFullName } = useContext(AuthContext)

    // estados para controlar el formulario
    const [userFullNameUpdated, setUserFullName] = useState("")
    const [userLangRedirect, setUserLangRedirect] = useState("")

    // los handlers
    const handleFullNameChange = (e) => setUserFullName(e.target.value);
    const handleLangChange = (e) => setUserLangRedirect(e.target.value);

    useEffect(() => {
        setUserFullName(userFullName)
        setUserLangRedirect(userLang)
    }, []); // 

    useEffect(() => {
        setUserLangRedirect(userLang)
    }, [userLang])

    useEffect(() => {
        setUserFullName(userFullName)
    }, [userFullName])

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        console.log(userLangRedirect)
        updateUserLang(userLangRedirect);
        updateUserFullName(userFullNameUpdated)

        try {
            await service.put("/profile", {
                fullName: userFullNameUpdated,
                lang: userLangRedirect
            })

            navigate("/profile")

        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 400) {
                setErrorMessageUsername(error.response.data.errorMessageUsername)
            } else {
                navigate("/error")
            }
        }
    };

    return (
        <>
            <Form >

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="fullName"
                        name="fullName"
                        value={userFullNameUpdated}
                        onChange={handleFullNameChange}
                        placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Prefered language</Form.Label>
                    <Form.Select aria-label="Default select example"
                        name="lang"
                        value={userLangRedirect}
                        onChange={handleLangChange}
                        placeholder="lang" >
                        <option>Open this select menu</option>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="it">Italian</option>
                        <option value="fr">French</option>
                        <option value="ca">Catalan</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleUpdateProfile}>
                    Update profile
                </Button>

            </Form>

        </>
    )
}

export default ProfileEdit

*/