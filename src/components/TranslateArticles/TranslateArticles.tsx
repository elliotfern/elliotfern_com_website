import React from "react";
import { Link } from "react-router-dom";
import styles from "./TranslateArticles.module.css";

interface TranslationLink {
  code: string;
  flag: string;
  title?: string;
  name: string;
}

interface ArticleTranslations {
  post_nameEs?: string;
  post_nameEn?: string;
  post_nameFr?: string;
  post_nameIt?: string;
  post_nameCa?: string;
}

interface TranslateArticlesProps {
  translations: ArticleTranslations;
  t: (key: string) => string;
  type: "article" | "course"; // Nueva prop para definir el tipo de enlace
}

const TranslateArticles: React.FC<TranslateArticlesProps> = ({ translations, t, type }) => {
  const languageLinks: TranslationLink[] = [
    { code: "ca", flag: "https://media.elliotfern.com/img/history-img/icon/flag_catalan.png", title: translations.post_nameCa, name: t("nav.catalan") },
    { code: "es", flag: "https://media.elliotfern.com/img/history-img/icon/flag_spain.png", title: translations.post_nameEs, name: t("nav.spanish") },
    { code: "en", flag: "https://media.elliotfern.com/img/history-img/icon/flag_united-kingdom.png", title: translations.post_nameEn, name: t("nav.english") },
    { code: "fr", flag: "https://media.elliotfern.com/img/history-img/icon/flag_france.png", title: translations.post_nameFr, name: t("nav.french") },
    { code: "it", flag: "https://media.elliotfern.com/img/history-img/icon/flag_italy.png", title: translations.post_nameIt, name: t("nav.italian") },
  ];

  return (
    <div className={styles.languageFlags}>
      {languageLinks.map(
        (lang) =>
          lang.title && (
            <Link
              to={`/${lang.code}/${type}/${lang.title}`} // Usa la prop `type` para construir la URL
              key={lang.code}
              className={styles.languageLink}
            >
              <img src={lang.flag} alt={lang.name} style={{ width: "24px", marginRight: "5px" }} />
              {lang.name}
            </Link>
          )
      )}
    </div>
  );
};

export default TranslateArticles;