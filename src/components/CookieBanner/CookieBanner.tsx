import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useTranslation } from "react-i18next";
import styles from "./CookieBanner.module.css";
import { useNavigate } from "react-router-dom";
import { routes } from "../../services/routes";

// Define las propiedades que va a recibir el componente
interface CookieBannerProps {
  onHide: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onHide }) => {
  const { t, i18n } = useTranslation();
  const [bannerVisible, setBannerVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica el estado de la cookie
    const cookiesAccepted = getCookie("cookiesAccepted");

    if (cookiesAccepted === "true") {
      loadGoogleAnalytics();
      setBannerVisible(false); // Si se aceptaron las cookies, no mostrar el banner
    } else if (cookiesAccepted === "false") {
      setBannerVisible(false); // Si se rechazaron las cookies, no mostrar el banner
    } else {
      setBannerVisible(true); // Si no se ha tomado acción, mostrar el banner
    }
  }, []);

  const acceptCookies = () => {
    setCookie("cookiesAccepted", "true", 30); // Establece la cookie como aceptada
    setBannerVisible(false); // Oculta el banner
    loadGoogleAnalytics(); // Inicializa Google Analytics
    onHide(); // Llama la función onHide recibida como prop
  };

  const rejectCookies = () => {
    setCookie("cookiesAccepted", "false", 30); // Establece la cookie como rechazada
    setBannerVisible(false); // Oculta el banner
  };

  const policyCookies = () => {
    setBannerVisible(true); // Oculta el banner al ir a la política de privacidad
    navigate(routes[i18n.language].privacyPolicy);
  };

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    // Aquí se añade el atributo SameSite=None; Secure si es necesario
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=None;Secure`;
  };

  const getCookie = (name: string): string | null => {
    const cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].split("=");
      if (name === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  };

  const loadGoogleAnalytics = () => {
    ReactGA.initialize("G-0L7VP04REK", {
      gaOptions: {
        anonymizeIp: true,
      },
    });

    // Rastrear la página actual después de aceptar las cookies
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  };

  if (!bannerVisible) return null; // No renderiza nada si el banner no es visible

  return (
    <div className={styles.cookieBanner}>
      <div className={styles.box}>
        <h3>{t("cookieBanner.titol")}</h3>
        <p className={styles.text}>{t("cookieBanner.missatge")}</p>
        <button
          id="policy-cookies-btn"
          className={`${styles.button} ${styles.policyCookiesBtn}`}
          onClick={policyCookies}
        >
          {t("cookieBanner.policy")}
        </button>
        <button
          id="accept-cookies-btn"
          className={`${styles.button} ${styles.acceptCookiesBtn}`}
          onClick={acceptCookies}
        >
          {t("cookieBanner.acceptar")}
        </button>
        <button
          id="reject-cookies-btn"
          className={`${styles.button} ${styles.rejectCookiesBtn}`}
          onClick={rejectCookies}
        >
          {t("cookieBanner.rebutjar")}
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
