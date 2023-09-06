import axios from "axios";

const service = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5005/api"
})

// configuramos que en TODAS las llamadas al backend
service.interceptors.request.use((config) => {

    // buscar el token

    const storedToken = localStorage.getItem("authToken")

    // lo añadimos a la configuracion
    if (storedToken) {
        config.headers.authorization = `Bearer ${storedToken}`
    }

    // retornamos el config
    return config

})


export default service