import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './AuthorBox.module.css'

function AuthorBox() {
  const { t, i18n } = useTranslation()

  return (
    <div className={styles.boxAuthor}>
      <Link to={`/${i18n.language}/about-author`}>
        <img src="https://media.elliotfern.com/img/author.jpg" width={100} />
      </Link>

      <div className={styles.authorInfo}>
        <h6>
          {' '}
          <Link to={`/${i18n.language}/about-author`}>Elliot Fernandez</Link>
        </h6>
        <p>{t('AuthorBox.descripcioAutor')}</p>

        {/* Redes Sociales */}
        <div className={styles.socialIcons}>
          <a
            href="https://www.linkedin.com/in/elliot-fernandez/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://media.elliotfern.com/img/elliotfern-icon/linkedin.svg"
              alt="LinkedIn"
              width={24}
            />
          </a>
          <a
            href="https://github.com/ElliotFern"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://media.elliotfern.com/img/elliotfern-icon/github.svg"
              alt="GitHub"
              width={24}
            />
          </a>
          <a
            href="https://c.im/@elliot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://media.elliotfern.com/img/elliotfern-icon/mastodon.svg"
              alt="Mastodon"
              width={24}
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default AuthorBox
