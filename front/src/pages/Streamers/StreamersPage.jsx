import './StreamersPage.css'
import { fetchStreamers } from '../../lib/fetchers'
import { Link } from 'react-router-dom'

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
            <h1 className='Title' style={{textAlign: 'center'}}>STREAMERS</h1>
            <div id="StreamerContainer">
            {!loading && streamers.length > 0 && (
                streamers.map(streamer => (
                    <Link to={"/" + streamer.display_name} key={streamer._id}>
                        <div className="StreamerBox">
                            <h2>{streamer.display_name}</h2>
                            <img src={streamer.profile_image_url} alt="streamer img" />
                        </div>
                    </Link>
                ))
            )}
            </div>
        </div>
    )
}