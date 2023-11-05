import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const fetchCarnets = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/carnet`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        if(response.ok) {
            const data = await response.json()
            return data
        }
    } catch(e) {
        return null
    }
    return null
}

export default function CarnetContainer() {
    const [carnets, setCarnets] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchCarnets().then(data => {
            setCarnets(data)
            setLoading(false)
        })
    }, [])
    return (
        <>
        <div id="CarnetContainer">
        <h1 className="Title">CARNETS</h1>
            {carnets && !loading &&  
                <div id="MultiCarnetContainer">
                {carnets.map(carnet => (
                    <Link to={`/${carnet.streamer.name}`}  key={carnet._id}>
                    <div className="CarnetBox">
                        <section>
                            <img src={carnet.streamer.profile_url} alt="streamer img" />
                        </section>
                        <section>
                            <h2>{carnet.streamer.name}</h2>
                        </section>
                    </div>
                    </Link>
                ))} 
                </div>
            }
        </div>
        </>
    )
}