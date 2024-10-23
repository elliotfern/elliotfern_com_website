import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Definir la interfaz para los datos de los enlaces
interface Link {
  id: number;
  nom: string;
  web: string;
  categoria: string;
  tema: string;
  linkUpdated: string;
  tipus: string;
  idioma: string;
}

const Links = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const [links, setLinks] = useState<Link[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para el campo de búsqueda
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get<Link[]>(
          `https://api.elliotfern.com/blog.php?type=links&lang=${lang}`
        );
        setLinks(response.data);

        // Obtener categorías únicas y ordenarlas alfabéticamente
        const uniqueCategories = [
          ...new Set(response.data.map((link) => link.categoria)),
        ].sort((a, b) => a.localeCompare(b));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching the links:", error);
      }
    };

    fetchLinks();
  }, [lang]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedTopic(""); // Resetear el tema al cambiar la categoría
    const filteredTopics = links
      .filter((link) => link.categoria === category)
      .map((link) => link.tema);

    const sortedTopics = [...new Set(filteredTopics)].sort((a, b) =>
      a.localeCompare(b)
    );
    setTopics(sortedTopics);
    setShowTable(false); // Ocultar la tabla al cambiar de categoría
  };

  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic);
    setShowTable(true);
  };

  const handleShowAllLinks = () => {
    setSelectedTopic(""); // Resetea el tema seleccionado
    setShowTable(true); // Muestra la tabla
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Mostrar la tabla solo si hay un término de búsqueda
    if (value) {
      setShowTable(true);
    } else {
      setShowTable(false); // Ocultar la tabla cuando el campo de búsqueda está vacío
    }
  };

  const fetchLinks = async () => {
    try {
      const response = await axios.get<Link[]>(
        `https://api.elliotfern.com/blog.php?type=links&lang=${lang}`
      );
      setLinks(response.data);
    } catch (error) {
      console.error("Error fetching the links:", error);
    }
  };

  const handleRefreshTable = () => {
    fetchLinks();
    setShowTable(true); // Asegúrate de que la tabla se muestre después de refrescar
  };

  // Filtrar enlaces solo por el término de búsqueda si está presente
  const filteredLinks = searchTerm
    ? links.filter(
        (link) =>
          link.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          link.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
          link.tema.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : links.filter((link) => {
        const matchesCategory = selectedCategory
          ? link.categoria === selectedCategory
          : true;
        const matchesTopic = selectedTopic ? link.tema === selectedTopic : true;
        return matchesCategory && matchesTopic;
      });

  return (
    <div className="container-principal">
      <div className="content">
        <div className="links-container">
          <h1>{t("link.PaginaTitol")}</h1>

          {/* Buscador */}
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder={t("link.buscar")} // Cambia esto al texto que desees
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Si no hay un término de búsqueda, mostrar las pestañas */}
          {!searchTerm && (
            <>
              <h4 className="center-title">{t("link.Categories")}</h4>

              {/* Categorías */}
              <div className="tabs">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`tab-button tab-button-categoria ${
                      selectedCategory === category ? "active" : ""
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {selectedCategory && (
                <div className="tabs mt-3">
                  <h4 className="center-title">{t("link.Topics")}</h4>
                  <div className="button-container">
                    {topics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => handleTopicChange(topic)}
                        className={`tab-button tab-button-topic ${
                          selectedTopic === topic ? "active" : ""
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                    <button
                      onClick={handleShowAllLinks}
                      className="tab-button tab-button-all-button"
                    >
                      {t("link.showAllLinks")}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {showTable && (
            <div>
              <table className="links-table mt-4">
                <thead>
                  <tr>
                    <th>{t("link.web")}</th>
                    <th>{t("link.url")}</th>
                    <th>{t("link.categoria")}</th>
                    <th>{t("link.tema")}</th>
                    <th>{t("link.tipus")}</th>
                    <th>{t("link.idioma")}</th>
                    <th>{t("link.data")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLinks.map((link) => (
                    <tr key={link.id}>
                      <td data-label={t("link.web")}>
                        <a
                          href={link.web}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {/* SVG de enlace externo */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon-external-link"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                          {link.nom}
                        </a>
                      </td>
                      <td className="url-column" data-label={t("link.url")}>
                        {link.web}
                      </td>
                      <td data-label={t("link.categoria")}>{link.categoria}</td>
                      <td data-label={t("link.tema")}>{link.tema}</td>
                      <td data-label={t("link.tipus")}>{link.tipus}</td>
                      <td data-label={t("link.idioma")}>{link.idioma}</td>
                      <td data-label={t("link.data")}>
                        {new Date(link.linkUpdated).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Botón para refrescar la tabla */}
              <button
                onClick={handleRefreshTable}
                className="tab-button tab-button-categoria center-button"
              >
                {t("link.refreshTable")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Links;
