import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

function Articles() {

    const param = useParams();
    console.log(param.articleId)

    const url = `https://elliotfern.com/controller/blog.php?type=articles&id=${param.articleId}`;
    console.log(url)

    const [apartments, setApartments] = useState(null)
    const [isFetching, setIsFetching] = useState(true)

    // los Hooks se deben de invocar siempre
    const navigate = useNavigate()

    useEffect(() => {
        getData()

    }, [])

    const getData = async () => {
        try {
            const response = await axios.get(url)
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
        <div>
            {apartments.map((eachApartment) => {
                return (
                    <div key={eachApartment.ID}>

                        <h3>{eachApartment.post_title}</h3>
                        <h6>{eachApartment.post_date}</h6>
                        <div dangerouslySetInnerHTML={{ __html: eachApartment.post_content }} />



                    </div>

                )

            })}

        </div>
    )
}

export default Articles