import { useState, useEffect } from 'react'
import { ActionButton } from "../Buttons/ActionButton/ActionButton"
import { colors_scheme } from "../../consts"

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
  


export const DeleteModal = () => {
    const [isButtonDisabled, setButtonDisabled] = useState(true)
    const onClickDelete = () => {
        if(isButtonDisabled) return
        console.log('delete')
    }
    useEffect(() => {
        const timer = setTimeout(() => {
          setButtonDisabled(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div style={style}> 
        <p style={{fontWeight: 600, padding: '3px'}}>¿Seguro que quieres borrar tu cuenta?</p>
        <p style={{fontStyle: 'italic', color: colors_scheme.disabled}}>Esta acción no se puede deshacer</p>
        <p style={{padding: '8px 0px', fontWeight: 600}}>Se borraran los siguientes datos
            <ul style={{listStyle: 'none', margin: '3px auto', width: 'max-content', textAlign: 'left'}}>
                <li>- Carnets</li>
                <li>- Puntos</li>
                <li>- Ranking</li>
                <li>- Opciones</li>
            </ul>
        </p>
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
}