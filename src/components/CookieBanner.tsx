import React, { useEffect, useState } from 'react';

const CookieBanner: React.FC = () => {
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
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-0L7VP04REK';
        document.head.appendChild(script);
    
        interface GTagArgs {
            event: string;
            [key: string]: unknown; // Cambia 'any' por un tipo más específico si es posible
        }
    
        window.dataLayer = window.dataLayer || [];
        function gtag(args: GTagArgs) {
            window.dataLayer.push(args);
        }
    
        gtag({ event: 'js', 'event_callback': new Date() });
        gtag({ event: 'config', 'tracking_id': 'G-0L7VP04REK' });
    };

    if (!bannerVisible) return null; // No renderiza nada si el banner no es visible

    return (
        <div id="cookie-banner" style={{ position: 'fixed', bottom: '0', background: 'lightgray', padding: '10px', width: '100%', textAlign: 'center' }}>
            <p>This website uses cookies to enhance the user experience.</p>
            <button id="accept-cookies" onClick={acceptCookies}>Accept</button>
            <button id="reject-cookies" onClick={rejectCookies}>Reject</button>
        </div>
    );
};

export default CookieBanner;
