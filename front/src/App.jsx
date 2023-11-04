import './App.css'
import LogButton from './components/LogButton/LogButton'
import TwitchIcon from './components/TwitchIcon'
import { useContext} from 'react'
import { loginContext } from './main.jsx'
import CarnetContainer from './components/CarnetContainer/CarnetContainer.jsx'


function App() {
  const login = useContext(loginContext)
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
