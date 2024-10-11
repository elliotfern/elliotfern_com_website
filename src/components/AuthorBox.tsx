import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';

function AuthorBox() {
    const { t, i18n } = useTranslation();

    return (
        <div className="boxAuthor">
            <div >
                <div >
                     <Link to={`/${i18n.language}/about-author`}><img src="https://media.elliotfern.com/img/author.jpg" width={100} /></Link>
                </div>
                <div className="align-items-end">
                    <h6> <Link to={`/${i18n.language}/about-author`}>Elliot Fernandez</Link></h6>
                    <p>{t('webAuthorDescrip')}</p>
                </div>
            </div>
        </div>
    )
}

export default AuthorBox