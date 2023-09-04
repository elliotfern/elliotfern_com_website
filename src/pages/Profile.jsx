import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'

import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';

function Profile() {

    // llamamos al hook useNavigate()
    const navigate = useNavigate()

    // llamamos a los estafos del contexto
    const { userDetails } = useContext(AuthContext)

    const handleUpdateProfile = () => {
        navigate("/profile/edit")
    }

    return (
        <>
            <h2>Hi, {userDetails.fullName}!</h2>

            <h5>My saved courses</h5>
            <h5>My saved lessons</h5>

            <Button variant="warning" onClick={handleUpdateProfile}>Update profile</Button>

        </>
    )
}

export default Profile