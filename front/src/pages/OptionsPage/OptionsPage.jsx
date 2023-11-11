/*
    Página de opciones
    - Cambiar a streamer
    - Borrar cuenta
    - Modo oscuro
    - Cambiar idioma
    Sección de opciones de streamer
    - Usar recompensa limitada diaria
        - Puntos necesarios
    - Usar recompensa por stream
        - Puntos necesarios
*/
import './Options.css'
import { useContext, useEffect } from "react"
import { loginContext } from "../../lib/context"
import { useNavigate } from "react-router-dom"
import DarkModeSwitch from '../../components/DarkModeSwitch/DarkModeSwitch'

export default function OptionsPage() {
    const login = useContext(loginContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!login.value) {
            navigate('/login')
        }
    })
    return (
        <>
            <h1 className="Title" style={{textAlign: 'center'}}>OPCIONES</h1>
            <section className="OptionsContainer">
                <div className="Option">
                    <h2>Cambiar a streamer</h2>
                    <p>Temporalmente solo unos pocos.</p>
                    <div className="SwitchContainer">
                        <input type="checkbox" className="checkbox" name='streamer' id='streamercheck'/>
                        <label className="switch" htmlFor="streamercheck">
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>
                <div className="Option">
                    <h2>Borrar cuenta</h2>
                    <p>Esta acción no se puede deshacer.</p>
                    <button className="DeleteAccount">BORRAR CUENTA</button>
                </div>
                <div className="Option">
                    <h2>Modo oscuro</h2>
                    <p>No disponible aún</p>
                    <DarkModeSwitch/>
                </div>
                <div className="Option">
                    <h2>Cambiar idioma</h2>
                    <p>No disponible aún</p>
                    <select name="language" id="language">
                        <option value="es">Español</option>
                        <option value="en">English</option>
                    </select>
                </div>
            </section>
            <section className="OptionsContainer">
                <div className="Option">
                    <h2>Usar recompensa limitada diaria</h2>
                    <div className="SwitchContainer">
                        <input type="checkbox" className="checkbox" name='daily' id='dailycheck'/>
                        <label className="switch" htmlFor="dailycheck">
                            <span className="slider"></span>
                        </label>
                    </div>
                    <label htmlFor="Puntos">Puntos necesarios:</label>
                    <input type="text" name="Puntos"/>
                </div>
                <div className="Option">
                    <h2>Usar recompensa por stream</h2>
                    <div className="SwitchContainer">
                        <input type="checkbox" className="checkbox" name='perstream' id='perstream'/>
                        <label className="switch" htmlFor="perstream">
                            <span className="slider"></span>
                        </label>
                    </div>
                    <label htmlFor="Puntos">Puntos necesarios:</label>
                    <input type="text" name="Puntos"/>
                </div>
            </section>
        </>

    )
}