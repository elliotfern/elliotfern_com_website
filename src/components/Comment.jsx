import service from "../services/service.config";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Card, Form, Button } from 'react-bootstrap';

import { AuthContext } from '../context/auth.context'
import Alert from 'react-bootstrap/Alert';

function Comment(props) {
    const navigate = useNavigate();
    const { lang } = useParams();
    const { activeUserId, userDetails } = useContext(AuthContext);

    if (typeof userDetails !== 'undefined' && userDetails !== null) {
        const userRole = userDetails.role
        const userLang = userDetails.lang
        console.log("rol usuari", userRole)
        console.log("idioma usuari", userLang)
    }


    const urlApiComments = `/comment/${props.idArticle}`;

    const [allComments, setAllComments] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [editando, setEditando] = useState(false);
    const [nuevoTexto, setNuevoTexto] = useState(""); // Para crear nuevos comentarios
    const [textoEdicion, setTextoEdicion] = useState(""); // Para editar comentarios existentes
    const [showForm, setShowForm] = useState(false); // Nuevo estado para controlar la visibilidad del formulario

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await service.get(urlApiComments);
            setAllComments(response.data);
            setIsFetching(false);
            // Obtener la longitud de la lista de comentarios y actualizar el contador
            const commentCount = response.data.length;

            props.updateCommentCount(commentCount);
        } catch (error) {
            console.error("Error al obtener datos:", error);
            navigate("/error");
        }
    }

    const handleEditarClick = (commentId, commentText) => {
        if (commentText && commentText.userCreatorId._id === activeUserId) {
            setTextoEdicion(commentText.comment);
            setEditando(commentId);
        }
    }

    const handleGuardarClick = async (commentId) => {
        try {
            await service.put(`/comment/${commentId}`, {
                comment: textoEdicion,
            });
            const nuevosComentarios = allComments.map((comentario) =>
                comentario._id === commentId ? { ...comentario, comment: textoEdicion } : comentario
            );
            setAllComments(nuevosComentarios);
            setEditando(false);
            setTextoEdicion(""); // Restablecer el texto de edición a un valor vacío
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
            props.onCommentDeleted();
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancelarClick = () => {
        setEditando(false);
        setTextoEdicion(""); // Restablecer el texto de edición a un valor vacío al cancelar la edición
    }

    const handleChangeTexto = (e) => {
        if (editando) {
            setTextoEdicion(e.target.value);
        } else {
            setNuevoTexto(e.target.value);
        }
    };

    const handleMostrarFormulario = () => {
        setShowForm(true); // Mostrar el formulario cuando se hace clic en el botón correspondiente
        setEditando(false); // Asegurarse de que no estés en modo edición
        setTextoEdicion(""); // Restablecer el texto de edición a un valor vacío
    }

    const handleCancelarFormulario = () => {
        setShowForm(false); // Ocultar el formulario cuando se hace clic en "Cancelar"
        setNuevoTexto(""); // Restablecer el texto para nuevos comentarios
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
            setNuevoTexto(""); // Restablecer el texto para nuevos comentarios
            setShowForm(false); // Ocultar el formulario después de agregar un nuevo comentario

            // Llamar a la función de callback para notificar que se publicó un nuevo comentario
            props.onCommentPosted();
        } catch (error) {
            console.log(error);
        }
    }

    if (isFetching) {
        return <h3>Cargando...</h3>;
    }

    // Contador de comentarios
    const commentCount = allComments.length;

    // traducciones
    let webCommentsTitle = "";
    let webPostModified = "";

    if (lang === "es") {
        webCommentsTitle = "Comentarios";

    } else if (lang === "en") {
        webCommentsTitle = "Comments";
    } else if (lang === "fr") {
        webCommentsTitle = "Comentarios";
    } else if (lang === "ca") {
        webCommentsTitle = "Comentaris";
    } else if (lang === "it") {
        webCommentsTitle = "Comenti";
    }

    return (
        <div>
            <h3>{webCommentsTitle}</h3>
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
                    <div className="caja-comentarios" key={comentario._id}>
                        <Card>
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
                                                value={textoEdicion}
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

                                        {(typeof userDetails !== 'undefined' && userDetails !== null) && (

                                            (comentario.userCreatorId._id === activeUserId || userRole === "admin") && (
                                                <>
                                                    <Button variant="info" onClick={() => handleEditarClick(comentario._id, comentario)}>Editar</Button>
                                                    <Button variant="danger" onClick={() => handleEliminarClick(comentario._id)}>Eliminar</Button>
                                                </>
                                            )
                                        )}
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Comment;