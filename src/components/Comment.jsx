import service from "../services/service.config";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Card, Form, Button } from 'react-bootstrap';

import { AuthContext } from '../context/auth.context'
import Alert from 'react-bootstrap/Alert';

function Comment(props) {
    const navigate = useNavigate();
    const { activeUserId, userDetails } = useContext(AuthContext);

    const userRole = userDetails.role
    console.log(userRole)

    const urlApiComments = `/comment/${props.idArticle}`;

    const [allComments, setAllComments] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [editando, setEditando] = useState(false);
    const [nuevoTexto, setNuevoTexto] = useState("");
    const [showForm, setShowForm] = useState(false); // Nuevo estado para controlar la visibilidad del formulario

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await service.get(urlApiComments);
            setAllComments(response.data);
            setIsFetching(false);
        } catch (error) {
            console.error("Error al obtener datos:", error);
            navigate("/error");
        }
    }

    const handleEditarClick = (commentId) => {
        const comentario = allComments.find((c) => c._id === commentId);
        if (comentario && comentario.userCreatorId._id === activeUserId) {
            setNuevoTexto(comentario.comment);
            setEditando(commentId);
        }
    }

    const handleGuardarClick = async (commentId) => {
        try {
            await service.put(`/comment/${commentId}`, {
                comment: nuevoTexto,
            });
            const nuevosComentarios = allComments.map((comentario) =>
                comentario._id === commentId ? { ...comentario, comment: nuevoTexto } : comentario
            );
            setAllComments(nuevosComentarios);
            setEditando(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEliminarClick = async (commentId) => {
        try {
            await service.delete(`/comment/${commentId}`);
            const nuevosComentarios = allComments.filter((comentario) =>
                comentario._id !== commentId
            );
            setAllComments(nuevosComentarios);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancelarClick = () => {
        setEditando(false);
        setNuevoTexto(""); // Restablecer nuevoTexto a un valor vacío al cancelar la edición
    }

    const handleChangeTexto = (e) => {
        setNuevoTexto(e.target.value);
    };

    const handleMostrarFormulario = () => {
        setShowForm(true); // Mostrar el formulario cuando se hace clic en el botón correspondiente
    }

    const handleCancelarFormulario = () => {
        setShowForm(false); // Ocultar el formulario cuando se hace clic en "Cancelar"
        setNuevoTexto("");
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const handleSubmitNuevoComentario = async (e) => {
        e.preventDefault();
        try {
            const response = await service.post(`/comment/${props.idArticle}`, {
                comment: nuevoTexto,
            });
            const nuevoComentario = response.data;
            setAllComments([...allComments, nuevoComentario]);
            setNuevoTexto("");
            setShowForm(false);
        } catch (error) {
            console.log(error);
        }
    }

    if (isFetching) {
        return <h3>Cargando...</h3>;
    }

    return (
        <div>
            <h3>Comments</h3>
            {activeUserId ? (
                <Button variant="primary" onClick={handleMostrarFormulario}>
                    Agregar Comentario
                </Button>
            ) : (
                <Alert variant="dark">
                    Only registered users can send comments.
                    <p><Link to="/signup"><Button variant="outline-success">You can register here.</Button></Link></p>
                </Alert>
            )}

            {/* Mostrar el formulario si showForm es true */}
            {showForm && (
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleSubmitNuevoComentario}>
                            <Form.Group controlId="commentText">
                                <Form.Label>Escribe tu comentario aquí</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={nuevoTexto}
                                    onChange={handleChangeTexto}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Agregar Comentario
                            </Button>

                            <Button variant="secondary" onClick={handleCancelarFormulario}>
                                Cancelar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}

            <ul>
                {allComments.map((comentario) => (
                    <Card key={comentario._id}>
                        <Card.Body>
                            <Card.Title>
                                {comentario.userCreatorId.fullName ? comentario.userCreatorId.fullName : comentario.userCreatorId.userName}
                            </Card.Title>
                            {editando === comentario._id ? (
                                <div>
                                    <Form.Group controlId="editedCommentText">
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={nuevoTexto}
                                            onChange={handleChangeTexto}
                                        />
                                    </Form.Group>
                                    <Button variant="success" onClick={() => handleGuardarClick(comentario._id)}>Guardar</Button>
                                    <Button variant="danger" onClick={handleCancelarClick}>Cancelar</Button>
                                </div>
                            ) : (
                                <div>
                                    <Card.Text>{comentario.comment}</Card.Text>
                                    <Card.Text>Fecha de Creación: {formatDate(comentario.createdAt)}</Card.Text>

                                    {(comentario.userCreatorId._id === activeUserId || userRole === "admin") && (


                                        <>
                                            <Button variant="info" onClick={() => handleEditarClick(comentario._id)}>Editar</Button>

                                            <Button variant="danger" onClick={() => handleEliminarClick(comentario._id)}>Eliminar</Button>
                                        </>
                                    )}
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                ))}
            </ul>
        </div>
    );
}

export default Comment;