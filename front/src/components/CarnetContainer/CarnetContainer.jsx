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
            if(data.carnets && data.carnets.length > 0)
                setCarnets(data)
        })
    }, [login])
    return (
        <>
        <div id="CarnetContainer">
        <h1 className="Title" style={{textAlign: 'center'}}>CARNETS</h1>
            {carnets.carnets.length > 0 &&
                <div className="MultiContainer">
                {carnets.carnets.map(carnet => (
                    <Link to={`/${carnet.streamer.display_name}`}  key={carnet.streamer.display_name}>
                    <div className="CardBox">
                        <h2>{carnet.streamer.display_name}</h2>
                        <img src={carnet.streamer.profile_image_url} alt="streamer img" />
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