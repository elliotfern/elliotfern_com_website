import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams, Link } from "react-router-dom"

function AuthorBox() {

    const { lang } = useParams();

    // traduccion cadenas texto
    let webAuthorDescrip = "";

    if (lang === "es") {
        webAuthorDescrip = "Es licenciado en Historia por la Universidad Autónoma de Barcelona (2009) y Máster en Historia del Mundo por la Universidad Pompeu Fabra (2011)."
    } else if (lang === "en") {
        webAuthorDescrip = "He holds a degree in History from the Autonomous University of Barcelona (2009) and a Master's in World History from Pompeu Fabra University (2011)."
    } else if (lang === "fr") {
        webAuthorDescrip = "Il est titulaire d'un diplôme en histoire de l'Université autonome de Barcelone (2009) et d'un master en histoire mondiale de l'Université Pompeu Fabra (2011)."
    } else if (lang === "ca") {
        webAuthorDescrip = "És llicenciat en Història per la Universitat Autònoma de Barcelona (2009) i Màster en Història del Món per la Universitat Pompeu Fabra (2011)."
    } else if (lang === "it") {
        webAuthorDescrip = "Ha conseguito una laurea in Storia presso l'Università Autonoma di Barcellona (2009) e un Master in Storia del mondo presso l'Università Pompeu Fabra (2011)."
    }

    return (
        <Container className="boxAuthor">
            <Row >
                <Col xs={2} md={2} lg={2}>
                    <Link to={`/${lang}/about-author`}><Image src="https://media.elliotfern.com/img/author.jpg" roundedCircle width={100} /></Link>
                </Col>
                <Col xs={10} md={10} lg={10} className="align-items-end">
                    <h6> <Link to={`/${lang}/about-author`}>Elliot Fernandez</Link></h6>
                    <p>{webAuthorDescrip}</p>
                </Col>
            </Row>
        </Container>
    )
}

export default AuthorBox