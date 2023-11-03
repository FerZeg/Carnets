import './App.css'
import LogButton from './components/LogButton/LogButton'
import TwitchIcon from './components/TwitchIcon'
import Menu from './components/menu/Menu'
import { useContext, useEffect, useState } from 'react'
import { loginContext } from './main.jsx'

const fetchData = async () => {
  console.log(localStorage.getItem("jwt"))
  if(!localStorage.getItem("jwt")) return null
  const response = await fetch(`http://localhost:3000/api/auth/data`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    }
  })
  if(response.ok) {
    const data = await response.json()
    return data
  }
  return null
}

function App() {
  const [ login, setLogin ] = useState({
    value: false,
    data: null
  })

  const isLogged = useContext(loginContext)
  useEffect(() => {
    document.title = "Carnets"
    console.log("useEffect")
    ;(async() => {
      console.log("fetching data")
      const data = await fetchData()
      if(data) {
        setLogin({value: true, data: data})
      }
    })()
  }, [])
  console.log("login: ", login)
  console.log("isLogged: ", isLogged)
  return (
    <>
    <loginContext.Provider value={login}>
        {!login.value ?
        <div id="LoginContainer">
          <h1>Iniciar Sesión en la App</h1>
          <LogButton text="Conectar con twitch">
            <TwitchIcon />
          </LogButton>
        </div>
         :
         <div id="MenuContainer">
          <Menu />
          </div>
        }
    </loginContext.Provider>
    </>
  )
}

export default App
