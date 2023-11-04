import './App.css'
import LogButton from './components/LogButton/LogButton'
import TwitchIcon from './components/TwitchIcon'
import Menu from './components/menu/Menu'
import { useEffect, useState } from 'react'
import { loginContext } from './main.jsx'
import CarnetContainer from './components/CarnetContainer/CarnetContainer.jsx'

const fetchData = async () => {
  try {
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
  } catch(e) {
    return null
  }
  return null

}

function App() {
  let [ loading, setLoading ] = useState(true)
  const [ login, setLogin ] = useState({
    value: false,
    data: null
  })

  useEffect(() => {
    document.title = "Carnets"
    ;(async() => {
      const data = await fetchData()
      if(data) {
        setLogin({value: true, data: data})
      } else {
        setLogin({value: false, data: null})
      }
      setLoading(false)
    })()
  }, [])
  return (
    <>
    {!loading &&
    <loginContext.Provider value={login}>
        {!login.value ?
        <div id="LoginContainer">
          <h1>Iniciar Sesión en la App</h1>
          <LogButton text="Conectar con twitch">
            <TwitchIcon />
          </LogButton>
        </div>
         :
         <>
          <div id="MenuContainer"><Menu/></div>
          <CarnetContainer/>
         </>

        }
    </loginContext.Provider>
  }
    </>
    
  )
}

export default App
