import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchCarnets } from "../../lib/fetchers"
import Login from "../../pages/Login/LoginPage"
import { loginContext } from "../../lib/context"

export default function CarnetContainer() {
    const [carnets, setCarnets] = useState({user: {}, carnets: []})
    const { login } = useContext(loginContext)
    useEffect(() => {
        if(!login.value) return
        fetchCarnets().then(data => {
            setCarnets(data)
            console.log(data)
        })
    }, [login])
    return (
        <>
        <div id="CarnetContainer">
        <h1 className="Title" style={{textAlign: 'center'}}>CARNETS</h1>
            {carnets.carnets.length > 0 &&
                <div className="MultiContainer">
                {carnets.carnets.map(carnet => (
                    <Link to={`/${carnet.streamer.name}`}  key={carnet.streamer.name}>
                    <div className="CardBox">
                        <h2>{carnet.streamer.name}</h2>
                        <img src={carnet.streamer.profile_url} alt="streamer img" />
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