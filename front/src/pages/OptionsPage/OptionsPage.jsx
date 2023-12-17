import './Options.css'
import { useContext, useEffect } from "react"
import { loginContext } from "../../lib/context"
import { useNavigate } from "react-router-dom"
import { GeneralOptions } from "../../components/OptionsMenu/GeneralOptions"
import { StreamerOptions } from "../../components/OptionsMenu/StreamerOptions"

export default function OptionsPage() {
    const login = useContext(loginContext)
    const navigate = useNavigate()
    console.log(login)
    useEffect(() => {
        if (!login.value) {
            navigate('/login')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login])
    return (
        <>
            <h1 className="Title" style={{textAlign: 'center'}}>OPCIONES</h1>
            <GeneralOptions/>
            {
                login.value && login.data.type === 'streamer' && 
                <StreamerOptions/>
            }
        </>

    )
}