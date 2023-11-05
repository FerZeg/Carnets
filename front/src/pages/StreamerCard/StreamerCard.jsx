import Atropos from 'atropos/react'
import 'atropos/css'
import './StreamerCard.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

function BackgroundPattern() {
    return (
        <svg width="100%" height="100%">
  <defs>
    <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect x="0" y="0" width="20" height="20" fill="#00000" opacity="0.2" />
      <line x1="0" y1="0" x2="20" y2="20" stroke="#FFFFFF" strokeWidth="1" opacity="0.2" />
      <line x1="20" y1="0" x2="0" y2="20" stroke="#FFFFFF" strokeWidth="1" opacity="0.2"/>
    </pattern>
  </defs>
  <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
</svg>
    )
}

export default function StreamerCard() {
    const [carnet, setCarnet] = useState([])
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:3000/api/carnet/${location.pathname.split('/')[1]}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            })
            if(!response.ok && response.status === 404) {
                const error = await response.json()
                if(error.error_type === "NotFound") {
                    console.log("erooeoeoeoe")
                    throw new Error("Not Found")
            }
        }
            const ticketJson = await response.json()
            setCarnet(ticketJson)
            setLoading(false)
        })();
    }, [location.pathname])
    return(
        <div id="CardPageContainer">
        {!loading && carnet &&
            <Atropos className="AtroposCarnet">
                <div className="CarnetStreamerBox">
                    <section>
                        <img src={carnet.user.profile_image_url} alt="user img" />
                    </section>
                    <section>
                        <h2>{carnet.streamer.display_name}</h2>
                    </section>
                    <div id="backgroundContainer">
                        <BackgroundPattern />
                    </div>
                </div>
            </Atropos>
        }
        </div>

    )
}