import {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'

export default function Ranking() {
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const name = location.pathname.split('/')[1]
    return (
        <></>
    )
}