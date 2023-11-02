import './App.css'
import LogButton from './components/LogButton/LogButton'
import TwitchIcon from './components/TwitchIcon'
import Menu from './components/menu/Menu'
import menus from '../menus'

function App() {

  return (
    <div>
      <h1>Carnets</h1>
      <Menu links={menus.main.urls}></Menu>
      <LogButton text="Conectar con twitch">
        <TwitchIcon />
      </LogButton>
    </div>
  )
}

export default App
