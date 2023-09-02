import service from "../services/service.config";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Comment(props) {
    const navigate = useNavigate();
    const params = useParams();

    const urlApiComments = `http://localhost:5005/api/comment/${props.idArticle}`;

    const [allComments, setAllComments] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await service.get(urlApiComments);
            setAllComments(response.data);
            setIsFetching(false); // Cambiar isFetching a false una vez que se obtengan los datos
            console.log("respuesta", response.data);
        } catch (error) {
            // Aquí puedes manejar el error si es necesario
            console.error("Error al obtener datos:", error);
            //navigate("/")
        }
    }

    console.log("url api", urlApiComments);
    console.log("id", props.idArticle);
    console.log("estado comment", allComments);

    if (isFetching) {
        return <h3>Cargando...</h3>;
    }

    return (
        <div>
            <h3>Comments</h3>
            <ul>
                {allComments.map((comentario) => (
                    <li key={comentario._id}>
                        <p>fullName: {comentario.userCreatorId.fullName}</p>
                        <p>Comentario: {comentario.comment}</p>
                        <p>Fecha de Creación: {comentario.createdAt}</p>
                        {/* Agrega más campos del objeto aquí si es necesario */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Comment;