import { ActionButton } from "../Buttons/ActionButton/ActionButton"
import { DarkModeSwitch } from "../DarkModeSwitch/DarkModeSwitch"
import { useContext } from "react"
import { loginContext } from "../../lib/context"
import { changeToStreamer } from "../../lib/actions"
import { toast } from 'sonner'


const GeneralOptions = () => {
    const login = useContext(loginContext)
    const onClickStreamer = () => {
        if(login.data && login.data.type === 'streamer') {
            toast.info('Ya eres streamer', {
                style: {
                    backgroundColor: '#ff0000',
                    color: '#fff'
                }
            })
            return
        }
            changeToStreamer()
    }

    return (
        <section className="OptionsContainer">
                <div className="Option">
                    <section className='OptionDescription'>
                        <h2>Cambiar a Streamer</h2>
                        <p>Temporalmente solo unos pocos</p>
                    </section>
                    <section className='OptionExecuter'>
                        <ActionButton className="change" onClick={onClickStreamer}>SER STREAMER</ActionButton>
                    </section>
                </div>
                <div className="Option">
                    <section className='OptionDescription'>
                        <h2>Borrar cuenta</h2>
                        <p>Esta acción no se puede deshacer.</p>
                    </section>
                    <section className='OptionExecuter'>
                        <ActionButton className="delete">BORRAR CUENTA</ActionButton>
                    </section>
                </div>
                <div className="Option">
                    <section className='OptionDescription'>
                        <h2>Modo oscuro</h2>
                        <p>No disponible aún</p>
                    </section>
                    <section className='OptionExecuter'>
                        <DarkModeSwitch/>
                    </section>
                </div>
            </section>
    )
}
export { GeneralOptions }