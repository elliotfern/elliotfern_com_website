import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'

import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/auth.context'

function NavBar(props) {

    const userLang = props.lang
    //console.log(userLang)

    // llamamos al hook useNavigate()
    const navigate = useNavigate()

    // llamamos a los estafos del contexto
    const { isUserActive, userDetails, verifyToken, userFullName, setLangUrlDinamico, langUrlDinamico } = useContext(AuthContext)

    //estado para controlar los cambios en el FullName user
    const [userFullNameUpdated, setUserFullNameUpdated] = useState(null)
    const [urlDinamica, setUrlDinamica] = useState(langUrlDinamico)

    // estado para controlar el buscador
    const [query, setQuery] = useState('');

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

    const handleSearch = (e) => {
        e.preventDefault();
        // Redirige al usuario a la página de resultados de búsqueda con la consulta como parámetro de búsqueda
        navigate(`/${userLang}/search-results?query=${query}`);
        setQuery('');
    };

    const handleLanguageChange = (newLang) => {
        // Llamar a la función de cambio de idioma del contexto
        setLangUrlDinamico(newLang); // Asegúrate de importar changeUserLang desde tu contexto
    };

    const homepageUser = userLang + "/homepage";
    const homepageVisitor = urlDinamica + "/homepage"

    return (
        <Navbar expand="lg" className="header">
            <Container fluid>
                <Link className="nav-link" to={isUserActive ? homepageUser : homepageVisitor}><Navbar.Brand> OpenHistory </Navbar.Brand></Link>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >

                        <li className="links-menu"><Link to="/books">Books</Link></li>

                        <NavDropdown title="Lang" id="navbarScrollingDropdown">

                            <li><Link to="/en/homepage" onClick={() => handleLanguageChange('en')}>English</Link></li>

                            <li><Link to="/es/homepage" onClick={() => handleLanguageChange('es')}>Spanish</Link></li>

                            <li><Link to="/it/homepage" onClick={() => handleLanguageChange('it')}>Italian</Link></li>

                            <li><Link to="/fr/homepage" onClick={() => handleLanguageChange('fr')}>French</Link></li>

                            <li><Link to="/ca/homepage" onClick={() => handleLanguageChange('ca')}>Catalan</Link></li>

                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSearch} >
                        <Form.Control
                            type="search"
                            placeholder="Buscar artículo por título..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button type="submit" variant="outline-success">
                            Search
                        </Button>
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