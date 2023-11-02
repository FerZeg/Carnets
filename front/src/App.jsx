import './App.css'
import LogButton from './components/LogButton/logButton'
import TwitchIcon from './components/TwitchIcon'


function App() {

  return (
    <>
      <h1>Carnets</h1>
      <LogButton text="Conectar con twitch">
        <TwitchIcon />
      </LogButton>
    </>
  )
}

export default App
