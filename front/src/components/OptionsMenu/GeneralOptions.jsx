import { ActionButton } from "../Buttons/ActionButton/ActionButton"
import { DarkModeSwitch } from "../DarkModeSwitch/DarkModeSwitch"
import { useContext } from "react"
import { loginContext } from "../../lib/context"
import { changeToStreamer } from "../../lib/actions"
import { toast } from 'sonner'
import { colors_scheme } from "../../consts"
import Modal from '@mui/material/Modal';
import { useState } from "react"
import { DeleteModal } from "../Modal/DeleteModal"

const GeneralOptions = () => {
    const [open, setOpen] = useState(false)
    const handleStatus = () => setOpen((prev) => !prev)
    const { login, setLogin } = useContext(loginContext)

    const onClickStreamer = async () => {
        if(login.data && login.data.type === 'streamer') {
            toast.info('Ya eres streamer', {
                style: {
                    backgroundColor: colors_scheme.error,
                    color: '#fff'
                }
            })
            return
        }
        const response = await changeToStreamer()
        if(response.status === 200) {
            setLogin({...login, data: {...login.data, type: 'streamer'}})
            toast.success('Ahora eres streamer', {
                style: {
                    backgroundColor: colors_scheme.success,
                    color: '#fff'
                }
            })
        } else if(response.status === 401) {
            toast.error('No estás en la lista de streamers', {
                style: {
                    backgroundColor: colors_scheme.error,
                    color: '#fff'
                }})
        }
    }

    return (
        <section className="OptionsContainer">
            <Modal open={open} onClose={handleStatus}>
                <DeleteModal />
            </Modal>
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
                        <ActionButton className="delete" onClick={handleStatus}>BORRAR CUENTA</ActionButton>
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