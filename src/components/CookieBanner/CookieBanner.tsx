import React, { useEffect, useState } from 'react';
import ReactGA from "react-ga4";
import { useTranslation } from 'react-i18next';
import styles from "./CookieBanner.module.css";

const CookieBanner: React.FC = () => {
    const { t } = useTranslation();
    const [bannerVisible, setBannerVisible] = useState<boolean>(false);

    useEffect(() => {
        const cookiesAccepted = getCookie("cookiesAccepted");
        if (cookiesAccepted === "true") {
            loadGoogleAnalytics();
        } else if (cookiesAccepted === "false") {
            setBannerVisible(false); // Oculta el banner si se rechazaron las cookies
        } else {
            setBannerVisible(true); // Muestra el banner si aún no se ha tomado acción
        }
    }, []);

    const acceptCookies = () => {
        setCookie("cookiesAccepted", "true", 30);
        setBannerVisible(false);
        loadGoogleAnalytics();
    };

    const rejectCookies = () => {
        setCookie("cookiesAccepted", "false", 30);
        setBannerVisible(false);
    };

    const setCookie = (name: string, value: string, days: number) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
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
            <h2>{t('cookieBanner.titol')}</h2>
            <p>{t('cookieBanner.missatge')}</p>
            <button id="accept-cookies-btn" className={`${styles.button} ${styles.acceptCookiesBtn}`} onClick={acceptCookies}>{t('cookieBanner.acceptar')}</button>
            <button id="reject-cookies-btn"  className={`${styles.button} ${styles.rejectCookiesBtn}`} onClick={rejectCookies}>{t('cookieBanner.rebutjar')}</button>
            </div>
        </div>
    );
};

export default CookieBanner;
