import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
    const currentUrl = window.location.href;
    const segments = currentUrl.split('/');
    const langUrl = segments[3];

    const [query, setQuery] = useState('');

    const navigate = useNavigate();

    const userLang = "en";
    const isUserActive = false;

    const homepageUser = userLang + "/homepage";
    const homepageVisitor = "/en/homepage";

    const archivesUser = userLang + "/history-archives";
    const archivesVisitor = "/en/history-archives"

    const handleLanguageChange = (newLang) => {
        // Llamar a la función de cambio de idioma del contexto
        // setLangUrlDinamico(newLang); // Asegúrate de importar changeUserLang desde tu contexto
    };

    const toggleBtn = useRef(null);
    const superMenuRef = useRef(null);
    const headerSecondRef = useRef(null);
    const MenuRef = useRef(null);

    let menuTimeout;

    const handleToggleBtnMouseEnter = () => {
        clearTimeout(menuTimeout);
        superMenuRef.current.style.display = 'block';
        headerSecondRef.current.style.display = 'block';
        setMenuVisible(true);
    };

    const handleSuperMenuMouseEnter = () => {
        clearTimeout(menuTimeout);
        setMenuVisible(true);
    };

    const handleSuperMenuMouseLeave = () => {
        menuTimeout = setTimeout(() => {
            setMenuVisible(false);
            superMenuRef.current.style.display = 'none';
            headerSecondRef.current.style.display = 'none';
        }, 200);
    };

    const [menuVisible, setMenuVisible] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/${isUserActive ? userLang : langUrl}/search-results?query=${query}`);
        setQuery('');
    };

    const handleToggleMenu = () => {
        if (MenuRef.current.style.display === 'none') {
            MenuRef.current.style.display = 'block';
        } else {
            MenuRef.current.style.display = 'none';
        }

    };

    return (
        <>
            <div className="header">
                <Link className="nav-link" to={isUserActive ? homepageUser : homepageVisitor}>Elliot Fernandez</Link>

                <button className={`toggle-menu-button ${menuVisible ? 'menu-visible' : 'menu-hidden'}`} onClick={handleToggleMenu}>
                    ☰
                </button>

                <div className="container-menu" ref={MenuRef}>
                    <ul>
                        <li><Link to="/">HomePage</Link></li>
                        <li><Link to="/en/about-author">About me</Link></li>
                        <li><Link to="/books">Books</Link></li>
                        <li><Link className="nav-link" to={isUserActive ? archivesUser : archivesVisitor}>History archives</Link></li>
                        <li><Link className="nav-link" to="/blog">Blog</Link></li>
                        <li><a href="#" id="toggle-btn" onMouseEnter={handleToggleBtnMouseEnter} ref={toggleBtn}>Languages</a></li>
                    </ul>
                </div>

                <div className="header-second" style={{ display: 'none' }} ref={superMenuRef} >
                    <div className="super-menu1" ref={headerSecondRef} onMouseLeave={handleSuperMenuMouseLeave} >
                        <ul>
                            <li><Link to="/en/homepage">English</Link></li>{/* onClick={() => handleLanguageChange('en')}  */}
                            <li><Link to="/es/homepage">Spanish</Link></li>{/* onClick={() => handleLanguageChange('es')} */}
                            <li><Link to="/it/homepage">Italian</Link></li>{/* onClick={() => handleLanguageChange('it')} */}
                            <li><Link to="/fr/homepage">French</Link></li>{/* onClick={() => handleLanguageChange('fr')} */}
                            <li><Link to="/ca/homepage">Catalan</Link></li>{/* onClick={() => handleLanguageChange('ca')} */}
                        </ul>
                    </div>
                </div>

                <form onSubmit={handleSearch} >
                    <input
                        type="search"
                        placeholder="Buscar artículo por título..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="me-2"
                        aria-label="Search"
                    />
                    <button type="submit" variant="outline-success">
                        Search
                    </button>
                </form>
            </div>
        </>
    )
}

export default NavBar;