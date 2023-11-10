import LogButton from '../../components/LogButton/LogButton.jsx'
import TwitchIcon from '../../components/TwitchIcon.jsx'

export default function Login() {
    return (
      <div id="LoginFillContainer">
            <div id="LoginContainer">
              <h1>Iniciar Sesión en la App</h1>
              <LogButton text="Conectar con twitch">
                <TwitchIcon />
              </LogButton>
            </div>
      </div>
      )
}