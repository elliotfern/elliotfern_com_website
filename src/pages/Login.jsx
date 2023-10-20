import { useState, useContext, useEffect } from "react";
import service from "../services/service.config";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

function Login() {
    // tenemos que llamar al verifyToken
    const { verifyToken } = useContext(AuthContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // estados de errores
    const [errorMessageEmail, setErrorMessageEmail] = useState("")
    const [errorMessagePassword, setErrorMessagePassword] = useState("")

    // los handlers
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await service.post("/auth/login", {
                email,
                password,
            })
            console.log(response)

            // almacenamos el token en el LocalStorage
            localStorage.setItem("authToken", response.data.authToken)

            await verifyToken()
            navigate("/")

        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 400) {
                setErrorMessageEmail(error.response.data.errorMessageEmail)
            } else {
                navigate("/error")
            }
        }

    };

    return (
        <div className="formBox mx-auto">

            <h2>Log In</h2>

            <Form >

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

                <Button variant="primary" type="submit" onClick={handleSignup}>
                    Log In
                </Button>
            </Form>
            <hr />
            <div className="aligncenter">
                <h5>Don't have an Open History account?</h5>
                <h5><strong> <Link to="/signup">Register now</Link></strong></h5>
            </div>


        </div>
    )
}

export default Login