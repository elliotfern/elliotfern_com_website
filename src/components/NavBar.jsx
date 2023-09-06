import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/auth.context'

function NavBar() {

    // llamamos al hook useNavigate()
    const navigate = useNavigate()

    // llamamos a los estafos del contexto
    const { isUserActive, verifyToken, userDetails, userFullName } = useContext(AuthContext)

    //estado para controlar los cambios en el FullName user
    const [userFullNameUpdated, setUserFullNameUpdated] = useState(null)

    useEffect(() => {
        setUserFullNameUpdated(userFullName)
    }, [userFullName])



    const handleLogout = () => {
        localStorage.removeItem("authToken")

        verifyToken() // verificar un token que no existe para reiniciar los estados
        navigate("/")
    }

    const handleProfile = () => {
        navigate("/profile")
    }

    return (
        <Navbar expand="lg" className="header">
            <Container fluid>
                <Link className="nav-link" to={`/`}><Navbar.Brand> OpenHistory </Navbar.Brand></Link>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >

                        <li className="links-menu"><Link to="/books">Books</Link></li>

                        <NavDropdown title="Lang" id="navbarScrollingDropdown">

                            <li><Link to="/en/homepage">English</Link></li>

                            <li><Link to="/es/homepage">Spanish</Link></li>

                            <li><Link to="/it/homepage">Italian</Link></li>

                            <li><Link to="/fr/homepage">French</Link></li>

                            <li><Link to="/ca/homepage">Catalan</Link></li>

                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>

                <Navbar.Collapse className="justify-content-end">
                    {isUserActive === true
                        ? (
                            <>
                                <Navbar.Text>
                                    <Button onClick={handleProfile} variant="outline-success espacio-izq"> Signed in as: <span className="underline">{userDetails.fullName ? (
                                        <> {userFullNameUpdated} </>
                                    )
                                        : <> {userDetails.username} </>
                                    }</span></Button>

                                </Navbar.Text>

                                <Navbar.Text>
                                    <Button onClick={handleLogout} variant="outline-success espacio-izq">Log Out</Button>
                                </Navbar.Text>

                            </>
                        )
                        : (
                            <>

                                <Navbar.Text>
                                    <Link to="/login"><Button variant="outline-success espacio-izq"> Log In</Button></Link>
                                </Navbar.Text>

                            </>
                        )
                    }
                </Navbar.Collapse>

            </Container>
        </Navbar >
    )
}

export default NavBar