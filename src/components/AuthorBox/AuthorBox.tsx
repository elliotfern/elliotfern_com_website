import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import styles from './AuthorBox.module.css';

function AuthorBox() {
    const { t, i18n } = useTranslation();

    return (
        <div className={styles.boxAuthor}>
                     <Link to={`/${i18n.language}/about-author`}><img src="https://media.elliotfern.com/img/author.jpg" width={100} /></Link>
                
                <div className="align-items-end">
                    <h6> <Link to={`/${i18n.language}/about-author`}>Elliot Fernandez</Link></h6>
                    <p>{t('webAuthorDescrip')}</p>
        </div> </div>
    )
}

export default AuthorBox