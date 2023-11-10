import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchCarnets } from "../../lib/fetchers"
import Login from "../../pages/Login/LoginPage"
import { loginContext } from "../../lib/context"

export default function CarnetContainer() {
    const [carnets, setCarnets] = useState([])
    const login = useContext(loginContext)
    useEffect(() => {
        if(!login.value) return
        fetchCarnets().then(data => {
            setCarnets(data)
        })
    }, [login])
    return (
        <>
        <div id="CarnetContainer">
        <h1 className="Title">CARNETS</h1>
            {carnets.length > 0 &&
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
        {!login.value && <Login />}
        </>
    )
}