import { useParams, Link } from "react-router-dom"

function AuthorBox(props) {

    const { lang } = useParams();

    // Si "lang" está presente en la URL, úsalo; de lo contrario, usa props.lang
    const selectedLang = lang || props.lang;

    console.log(selectedLang);


    // traduccion cadenas texto
    let webAuthorDescrip = "";

    if (selectedLang === "es") {
        webAuthorDescrip = "Es licenciado en Historia por la Universidad Autónoma de Barcelona (2009) y Máster en Historia del Mundo por la Universidad Pompeu Fabra (2011)."
    } else if (selectedLang === "en") {
        webAuthorDescrip = "He holds a degree in History from the Autonomous University of Barcelona (2009) and a Master's in World History from Pompeu Fabra University (2011)."
    } else if (selectedLang === "fr") {
        webAuthorDescrip = "Il est titulaire d'un diplôme en histoire de l'Université autonome de Barcelone (2009) et d'un master en histoire mondiale de l'Université Pompeu Fabra (2011)."
    } else if (selectedLang === "ca") {
        webAuthorDescrip = "És llicenciat en Història per la Universitat Autònoma de Barcelona (2009) i Màster en Història del Món per la Universitat Pompeu Fabra (2011)."
    } else if (selectedLang === "it") {
        webAuthorDescrip = "Ha conseguito una laurea in Storia presso l'Università Autonoma di Barcellona (2009) e un Master in Storia del mondo presso l'Università Pompeu Fabra (2011)."
    }

    return (
        <div className="boxAuthor">
            <div >
                <div >
                    <Link to={`/${selectedLang}/about-author`}><img src="https://media.elliotfern.com/img/author.jpg" width={100} /></Link>
                </div>
                <div className="align-items-end">
                    <h6> <Link to={`/${selectedLang}/about-author`}>Elliot Fernandez</Link></h6>
                    <p>{webAuthorDescrip}</p>
                </div>
            </div>
        </div>
    )
}

export default AuthorBox