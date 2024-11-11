import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { routes } from "../services/routes";

function Footer() {
  const { t, i18n } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <>
      <div className="container-fluid footer">
        <div className="footer-elliotfern">
          <div className="menu-separacio">
              <Link to={routes[i18n.language].about}>{t("nav.about")}</Link>
          </div>

          <div className="menu-separacio">
              <Link to={routes[i18n.language].privacyPolicy}>
                {t("nav.privacyPolicy")}
              </Link>
          </div>

          <div className="menu-separacio">
              <Link to={routes[i18n.language].compromisQualitat}>
                {t("nav.compromisQualitat")}
              </Link>
          </div>

          <div className="menu-separacio">
              <Link to={routes[i18n.language].contact}>{t("nav.contact")}</Link>
          </div>
        </div>

        <hr />

        <div id="footer-elliotfern-petit">
          <a
            href="https://creativecommons.org/publicdomain/zero/1.0/deed.en"
            aria-label="Creative Commons"
            target="_blank"
            rel="noopener"
            title="Creative commons"
          >
            <img
              className="mx-auto d-block"
              src="https://media.elliotfern.com/img/elliotfern-icon/domini-public.gif"
              alt="Public Domain"
              title="Public Domain"
              width="88"
              height="31"
            />
          </a>

          <div className="text-footer">{t("footer.textPB")}</div>

          <div className="text-footer">
            Elliot Fernandez (2002 - {year})
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
