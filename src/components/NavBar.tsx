import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NavBar() {
    const { t, i18n } = useTranslation();
    const [query, setQuery] = useState('');

    const navigate = useNavigate();

    const routes = {
        en: {
            homepage: "/en/homepage",
            about: "/en/about-author",
            books: "/en/books",
            historyArchives: "/en/history-archives",
            blog: "/en/blog",
        },

        es: {
            homepage: "/es/homepage",
            about: "/es/about-author",
            books: "/es/books",
            historyArchives: "/es/history-archives",
            blog: "/es/blog",
        },

        ca: {
            homepage: "/ca/homepage",
            about: "/ca/about-author",
            books: "/ca/books",
            historyArchives: "/ca/history-archives",
            blog: "/ca/blog",
        },

        fr: {
            homepage: "/fr/homepage",
            about: "/fr/about-author",
            books: "/fr/books",
            historyArchives: "/fr/history-archives",
            blog: "/fr/blog",
        },

        it: {
            homepage: "/it/homepage",
            about: "/it/about-author",
            books: "/it/books",
            historyArchives: "/it/history-archives",
            blog: "/it/blog",
        },
       
    };

    const handleLanguageChange = (newLang) => {
        i18n.changeLanguage(newLang);
        navigate(`/${newLang}/homepage`);
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

    const handleSuperMenuMouseLeave = () => {
        menuTimeout = setTimeout(() => {
            setMenuVisible(false);
            superMenuRef.current.style.display = 'none';
            headerSecondRef.current.style.display = 'none';
        }, 200);
    };

    const [menuVisible, setMenuVisible] = useState(false);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newLang = i18n.language;
        navigate(`/${newLang}/search-results?query=${query}`);
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
                <Link className="nav-link" to={routes[i18n.language].homepage}>Elliot Fernandez</Link>

                <button className={`toggle-menu-button ${menuVisible ? 'menu-visible' : 'menu-hidden'}`} onClick={handleToggleMenu}>
                    ☰
                </button>

                <div className="container-menu" ref={MenuRef}>
                    <ul>
                        <li><Link to={routes[i18n.language].homepage}>{t('nav.home')}</Link></li>
                            <li><Link to={routes[i18n.language].about}>{t('nav.about')}</Link></li>
                            <li><Link to={routes[i18n.language].books}>{t('nav.books')}</Link></li>
                            <li><Link to={routes[i18n.language].historyArchives}>{t('nav.historyArchives')}</Link></li>
                            <li><Link to={routes[i18n.language].blog}>{t('nav.blog')}</Link></li>
                        <li><a href="#" id="toggle-btn" onMouseEnter={handleToggleBtnMouseEnter} ref={toggleBtn}>{t('nav.languages')}</a></li>
                    </ul>
                </div>

                <div className="header-second" style={{ display: 'none' }} ref={superMenuRef} >
                    <div className="super-menu1" ref={headerSecondRef} onMouseLeave={handleSuperMenuMouseLeave} >
                        <ul>
                            <li><a href="#" onClick={() => handleLanguageChange('en')}>{t('nav.english')}</a></li>
                            <li><a href="#" onClick={() => handleLanguageChange('es')}>{t('nav.spanish')}</a></li>
                            <li><a href="#" onClick={() => handleLanguageChange('it')}>{t('nav.italian')}</a></li>
                            <li><a href="#" onClick={() => handleLanguageChange('fr')}>{t('nav.french')}</a></li>
                            <li><a href="#" onClick={() => handleLanguageChange('ca')}>{t('nav.catalan')}</a></li>
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
                    <button type="submit">
                        Search
                    </button>
                </form>
            </div>
        </>
    )
}

export default NavBar;