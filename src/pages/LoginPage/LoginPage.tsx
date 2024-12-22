// LoginPage.tsx
import React, { useState } from 'react';
import { useAuth } from '../../services/authContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('https://gestio.elliotfern.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSuccessMessage('Login successful, redirecting...');
                setErrorMessage('');
                login(data.token); // Pasa el token al contexto
                setTimeout(() => {
                    navigate('/dashboard');
                }, 3000);
            } else {
                setErrorMessage(data.message || 'Username or password are incorrect.');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            setSuccessMessage('');
            console.log(error)
        }
    };

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <div className="card mx-auto" style={{ maxWidth: '400px' }}>
                <div className="card-body">
                    <div className="container">
                        <h1>Login</h1>
                        {successMessage && (
                            <div className="alert alert-success" role="alert">
                                <h4 className="alert-heading"><strong>Login OK!</strong></h4>
                                <h6>{successMessage}</h6>
                            </div>
                        )}
                        {errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                <h4 className="alert-heading"><strong>Error login</strong></h4>
                                <h6>{errorMessage}</h6>
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <br />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <br />
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;