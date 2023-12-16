import { ActionButton } from "../Buttons/ActionButton/ActionButton"
import { DarkModeSwitch } from "../DarkModeSwitch/DarkModeSwitch"

const GeneralOptions = () => {
    return (
        <section className="OptionsContainer">
                <div className="Option">
                    <section className='OptionDescription'>
                        <h2>Cambiar a Streamer</h2>
                        <p>Temporalmente solo unos pocos</p>
                    </section>
                    <section className='OptionExecuter'>
                        <ActionButton style={{ backgroundColor: '#00FF00' }}>SER STREAMER</ActionButton>
                    </section>
                </div>
                <div className="Option">
                    <section className='OptionDescription'>
                        <h2>Borrar cuenta</h2>
                        <p>Esta acción no se puede deshacer.</p>
                    </section>
                    <section className='OptionExecuter'>
                        <ActionButton style={{ backgroundColor: '#FF0000' }}>BORRAR CUENTA</ActionButton>
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