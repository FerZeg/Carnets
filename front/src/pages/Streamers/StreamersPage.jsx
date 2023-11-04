const fetchStreamers = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/streamer`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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

import { useState, useEffect } from 'react';
export default function StreamersPage() {
    const [streamers, setStreamers] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchStreamers().then(data => {
            if(data) {
                setStreamers(data)
            }
            setLoading(false)
        })
    }, [])
    return (
        <div id="StreamerPage">
            <h1>StreamersPage</h1>
            <div id="StreamerContainer">
            {!loading && streamers.length > 0 && (
                streamers.map(streamer => (
                    <div key={streamer._id}>
                        <h2>{streamer.display_name}</h2>
                        <img src={streamer.profile_image_url} alt="streamer img" />
                    </div>
                ))
            )}
            </div>
            {!loading && streamers.length === 0 && (
                <h3>No se han encontrado streamers</h3>
            )}

        </div>
    )
}