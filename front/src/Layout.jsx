import "./index.css";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { loginContext } from "./lib/context";
import { fetchUserData } from "./lib/fetchers";
import { Outlet } from "react-router-dom";
import { Toaster } from 'sonner'

export default function Layout() {
    console.log(import.meta.env.VITE_API_URL)
    let [ loading, setLoading ] = useState(true)
    const [ login, setLogin ] = useState({
      value: false,
      data: null
    })

    useEffect(() => {
        document.title = "Carnets"
        ;(async() => {
          const data = await fetchUserData()
          if(data) setLogin({value: true, data: data})
          setLoading(false)
        })()
      }, [])
      
    return (
        <loginContext.Provider value={{login, setLogin}}>
          <Toaster/>
              {!loading &&
              <>
                  <Header />
                  <Outlet />
              </>
              }
        </loginContext.Provider>
    );
}