import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { routes } from "../../services/routes";
import styles from "./NavBar.module.css";

function NavBar() {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const [menuVisible, setMenuVisible] = useState(false);
  const [languagesMenuVisible, setLanguagesMenuVisible] = useState(false);

  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleToggleLanguagesMenu = () => {
    setLanguagesMenuVisible(!languagesMenuVisible);
  };

  // Cierra los menús al hacer clic en cualquier enlace del menú principal o de idiomas
  const handleCloseMenus = () => {
    setMenuVisible(false);
    setLanguagesMenuVisible(false);
  };

  const handleLanguageChange = (newLang) => {
    i18n.changeLanguage(newLang);
    navigate(`/${newLang}/homepage`);
    handleCloseMenus(); // Cierra los menús después de cambiar el idioma
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newLang = i18n.language;
    navigate(`/${newLang}/search-results?query=${query}`);
    setQuery("");
    setMenuVisible(false);
    setLanguagesMenuVisible(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>
            <Link className={styles.logo} to={routes[i18n.language].homepage}>
              Elliot Fernandez
            </Link>
          </h1>

          <button
            className={`${styles.toggleMenuButton} ${
              menuVisible ? styles.menuVisible : styles.menuHidden
            }`}
            onClick={handleToggleMenu}
          >
            {menuVisible ? "✖" : "☰"}
          </button>

          <div
            className={`${styles.containerMenu} ${
              menuVisible ? styles.menuVisible : styles.menuHidden
            }`}
          >
            <ul>
              <li>
                <Link
                  to={routes[i18n.language].homepage}
                  onClick={handleCloseMenus}
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  to={routes[i18n.language].about}
                  onClick={handleCloseMenus}
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  to={routes[i18n.language].books}
                  onClick={handleCloseMenus}
                >
                  {t("nav.books")}
                </Link>
              </li>
              <li>
                <Link
                  to={routes[i18n.language].historyArchives}
                  onClick={handleCloseMenus}
                >
                  {t("nav.historyArchives")}
                </Link>
              </li>
              <li>
                <Link
                  to={routes[i18n.language].blog}
                  onClick={handleCloseMenus}
                >
                  {t("nav.blog")}
                </Link>
              </li>
              <li>
                <Link
                  to={routes[i18n.language].links}
                  onClick={handleCloseMenus}
                >
                  {t("nav.links")}
                </Link>
              </li>
              <li>
                <a href="#" onClick={handleToggleLanguagesMenu}>
                  {t("nav.languages")}
                </a>

                {languagesMenuVisible && (
                  <div className={styles.headerSecond}>
                    <div className={styles.superMenu1}>
                      <ul>
                        <li>
                          <a
                            href="#"
                            onClick={() => handleLanguageChange("en")}
                          >
                            {t("nav.english")}
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={() => handleLanguageChange("es")}
                          >
                            {t("nav.spanish")}
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={() => handleLanguageChange("it")}
                          >
                            {t("nav.italian")}
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={() => handleLanguageChange("fr")}
                          >
                            {t("nav.french")}
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={() => handleLanguageChange("ca")}
                          >
                            {t("nav.catalan")}
                          </a>
                        </li>
                        <li>
                          <button
                            className={styles.closeButton}
                            onClick={handleCloseMenus}
                          >
                            ✖
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            </ul>

            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input
                type="search"
                placeholder={t("nav.buscadorPlaceHolder")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search"
                className={styles.searchInput} // Asocia estilos con el input
              />
              <button type="submit" className={styles.searchButton}>
              {t("nav.buscadorCerca")}
              </button>
            </form>
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;
