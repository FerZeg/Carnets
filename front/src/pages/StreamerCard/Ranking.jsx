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
    console.log(ranking)
    return (
        <>
            {!loading && ranking.length > 0 && 
                ranking.map((user, i) => {
                    return (
                        <div key={i}>
                            <p>{i + 1 + "abc"}</p>
                            <p>{user.display_name}</p>
                            <p>{user.points}</p>
                        </div>
                    )
                })
                }
        </>
    )
}