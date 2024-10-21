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
  idioma: string
}

const Links = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const [links, setLinks] = useState<Link[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get<Link[]>(`https://api.elliotfern.com/blog.php?type=links&lang=${lang}`);
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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedTopic(""); // Resetear el tema al cambiar la categoría
    const filteredTopics = links
      .filter((link) => link.categoria === category)
      .map((link) => link.tema);

    const sortedTopics = [...new Set(filteredTopics)].sort((a, b) =>
      a.localeCompare(b)
    );
    setTopics(sortedTopics); // Establecer los temas ordenados
    setShowTable(false); // Ocultar la tabla al cambiar de categoría
  };

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    setShowTable(true);
  };

  const handleShowAllLinks = () => {
    setSelectedTopic(""); // Resetea el tema seleccionado
    setShowTable(true); // Muestra la tabla
  };

  const fetchLinks = async () => {
    try {
      const response = await axios.get<Link[]>(`https://api.elliotfern.com/blog.php?type=links&lang=${lang}`);
      setLinks(response.data);
    } catch (error) {
      console.error("Error fetching the links:", error);
    }
  };

  const handleRefreshTable = () => {
    fetchLinks();
    setShowTable(true); // Asegúrate de que la tabla se muestre después de refrescar
  };

  const filteredLinks = selectedTopic
    ? links.filter((link) => link.tema === selectedTopic && link.categoria === selectedCategory)
    : links.filter((link) => link.categoria === selectedCategory); // Muestra los links de la categoría seleccionada

  return (
    <div className="container-principal">
      <div className="content">
        <div className="links-container">
          <h1>{t("link.PaginaTitol")}</h1>
          <h4 className="center-title">{t("link.Categories")}</h4>
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
                {/* Botón para mostrar todos los links de la categoría seleccionada */}
                <button onClick={handleShowAllLinks} className="tab-button tab-button-all-button">
                  {t("link.showAllLinks")}
                </button>
              </div>
            </div>
          )}

          {/* Mostrar tabla solo si showTable es true */}
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
                      <td>
                        <a
                          href={link.web}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.nom}
                        </a>
                      </td>
                      <td>{link.web}</td>
                      <td>{link.categoria}</td>
                      <td>{link.tema}</td>
                      <td>{link.tipus}</td>
                      <td>{link.idioma}</td>
                      <td>{new Date(link.linkUpdated).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Botón para refrescar la tabla */}
              <button onClick={handleRefreshTable} className="tab-button tab-button-categoria center-button">
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