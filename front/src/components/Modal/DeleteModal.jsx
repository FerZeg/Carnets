import { useState, useEffect } from 'react'
import { ActionButton } from "../Buttons/ActionButton/ActionButton"
import { colors_scheme } from "../../consts"
import { toast } from 'sonner'
import { deleteAccount } from '../../lib/actions'
import { forwardRef } from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -70%)',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    padding: '1rem',
    boxShadow: 24,
    textAlign: 'center'
}
  

export const DeleteModal = forwardRef(() => {
    const [isButtonDisabled, setButtonDisabled] = useState(true)
    const onClickDelete = async () => {
        if(isButtonDisabled) {
            toast.info('Espera para borrar', 2000)
            return
        }
            const res = await deleteAccount()
            if(res.ok) {
                window.location.href = '/'
            } else {
                toast.error('Error al borrar la cuenta', 2000)
            }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
          setButtonDisabled(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, [])
    return (
        <div style={style}> 
        <p style={{fontWeight: 600, padding: '3px'}}>¿Seguro que quieres borrar tu cuenta?</p>
        <p style={{fontStyle: 'italic', color: colors_scheme.disabled}}>Esta acción no se puede deshacer</p>
        <p style={{padding: '8px 0px', fontWeight: 600}}>Se borraran los siguientes datos</p>
        <ul style={{listStyle: 'none', margin: '3px auto', width: 'max-content', textAlign: 'left'}}>
            <li>- Carnets</li>
            <li>- Puntos</li>
            <li>- Ranking</li>
            <li>- Opciones</li>
        </ul>
        <ActionButton 
            className="delete" 
            style={{
                marginTop: '10px', 
                transition: 'all 1s', 
                backgroundColor: isButtonDisabled ? colors_scheme.disabled : colors_scheme.error
            }} 
            onClick={onClickDelete}
        >
            BORRAR CUENTA
        </ActionButton>
    </div>
    )
})

DeleteModal.displayName = 'DeleteModal';