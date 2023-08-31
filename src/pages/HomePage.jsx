import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

function HomePage() {
    const [apartments, setApartments] = useState(null)
    const [isFetching, setIsFetching] = useState(true)

    // los Hooks se deben de invocar siempre
    const navigate = useNavigate()

    useEffect(() => {
        getData()

    }, [])

    const getData = async () => {
        try {
            const response = await axios.get("https://elliotfern.com/controller/blog.php?type=listado-cursos&langCurso=es")
            console.log(response)
            setApartments(response.data)
            setIsFetching(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            // redireccionar a /error
            navigate("/error")

        }
    }

    if (isFetching === true) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}>
                <h3>cargando ... </h3>
            </div>
        )
    }

    const handleRefresh = () => {
        setIsFetching(true)
        getData()

    }

    return (
        <>
            <h2>Listado de cursos en español</h2>
            <button onClick={handleRefresh}>Refrescar</button>
            {apartments.map((eachApartment) => {
                return (
                    <div key={eachApartment.ID}>
                        <Link to={`/${eachApartment.paramName}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h3>{eachApartment.nombreCurso}</h3>
                        </Link>


                    </div>

                )

            })}

        </>
    )
}

export default HomePage