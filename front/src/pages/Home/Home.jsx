import './App.css'
import LogButton from '../../components/LogButton/LogButton.jsx'
import TwitchIcon from '../../components/TwitchIcon.jsx'
import { useContext} from 'react'
import { loginContext } from '../../lib/context'
import CarnetContainer from '../../components/CarnetContainer/CarnetContainer.jsx'


function App() {
  const login = useContext(loginContext)
  console.log(login)
  return (
    <>
        {
        !login.value ?
          <div id="LoginContainer">
            <h1>Iniciar Sesión en la App</h1>
            <LogButton text="Conectar con twitch">
              <TwitchIcon />
            </LogButton>
          </div>
          :
          <CarnetContainer/>
        }
    </>
    
  )
}

export default App
