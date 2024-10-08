/*

import { useState, useContext } from "react";
import service from "../services/service.config";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Form, Button, Alert } from 'react-bootstrap';

function Signup() {
  const navigate = useNavigate()

  const { isUserActive, userLang, langUrlDinamico } = useContext(AuthContext)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lang, setLang] = useState("");

  // estados de errores
  const [errorMessageUsername, setErrorMessageUsername] = useState("")
  const [errorMessageEmail, setErrorMessageEmail] = useState("")
  const [errorMessagePassword, setErrorMessagePassword] = useState("")
  const [errorMessageLang, setErrorMessageLang] = useState("")
  const [errorMessageUniqueUsername, setErrorMessageUniqueUsername] = useState("")

  // los handlers

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleLangChange = (e) => setLang(e.target.value);

  // check politica de privacidad
  const [aceptarPolitica, setAceptarPolitica] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  const handleAceptarPoliticaChange = (event) => {
    setAceptarPolitica(event.target.checked);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (aceptarPolitica) {
      // Aquí puedes realizar la acción después de aceptar la política de privacidad
      setAceptarPolitica(true)
      try {
        await service.post("/auth/signup", {
          username,
          email,
          password,
          lang
        })

        navigate("/login")

      } catch (error) {
        console.log(error)
        if (error.response && error.response.status === 400) {
          setErrorMessageUsername(error.response.data.errorMessageUsername)
        } else {
          navigate("/error")
        }
      }

    } else {
      setAceptarPolitica(false)
    }

  };

  return (
    <div className="formBox mx-auto">

      <h2>Sign Up</h2>

      <Form >

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={handleUsernameChange} />
        </Form.Group>
        {errorMessageUsername ?
          <Alert variant="danger">
            {errorMessageUsername}
          </Alert>
          : null}

        {errorMessageUniqueUsername ?
          <Alert variant="danger">
            {errorMessageUniqueUsername}
          </Alert>
          : null}


        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email" />
        </Form.Group>
        {errorMessageEmail ?
          <Alert variant="danger">
            {errorMessageEmail}
          </Alert>
          : null}

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password" />
          <Form.Text className="text-muted">
            Password must have at least:
            <li>1 number</li>
            <li>1 capital letter</li>
            <li>1 symbol</li>
          </Form.Text>
        </Form.Group>

        {errorMessagePassword ?
          <Alert variant="danger">
            {errorMessagePassword}
          </Alert>
          : null}

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Prefered language</Form.Label>
          <Form.Select aria-label="Default select example"
            name="lang"
            value={lang}
            onChange={handleLangChange}
            placeholder="lang" >
            <option>Open this select menu</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="it">Italian</option>
            <option value="fr">French</option>
            <option value="ca">Catalan</option>
          </Form.Select>
        </Form.Group>

        {errorMessageLang ?
          <Alert variant="danger">
            {errorMessageLang}
          </Alert>
          : null}

        <Form.Group className="mb-3">
          <div className="d-flex align-items-center">
            <Form.Check style={{ marginRight: "5px" }}
              required
              feedback="You must agree before submitting."
              feedbackType="invalid"
              id="aceptarPolitica"
              checked={aceptarPolitica}
              onChange={handleAceptarPoliticaChange}
            />
            <label className="form-check-label" htmlFor="aceptarPolitica">
              You must read and accept the {" "}
              <Link target="_blank" to={`/en/privacy-policy`}>Privacy Policy</Link>

            </label>
          </div>
        </Form.Group>

        {submitted && !aceptarPolitica ? (
          <Alert variant="danger">
            You must accept the Privacy Policy before submitting the form
          </Alert>
        ) : null}



        <Button variant="primary" type="submit" onClick={handleSignup}>
          Sign Up
        </Button>
      </Form>



    </div>
  );
}
export default Signup

*/