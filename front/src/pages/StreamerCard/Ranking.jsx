import {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { fetchRanking } from '../../lib/fetchers'

export default function Ranking() {
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const name = location.pathname.split('/')[1]
    const [ranking, setRanking] = useState([])
    useEffect(() => {
        fetchRanking(name).then(res => {
            if(res) setRanking(res)
            setLoading(false)
        })
    }, [name])
    return (
        <div id="RankingContainer">
            {!loading && ranking.length > 0 && 
                ranking.map((carnet, i) => {
                    return (
                        <div className='allrankedcontainer' key={i}>
                            <div className="rankuser">
                                <span className="Title rankingnumber">{i + 1}</span>
                                <img src={carnet.user.profile_url} alt="" />
                                <div className="rankuserdata">
                                    <div>
                                        <p>{carnet.user.name}</p>
                                        <p>Puntos: {carnet.points}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                }
        </div>
    )
}