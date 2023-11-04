import Header from "./components/Header";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { loginContext } from "./main";

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

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

export default function Layout({ children }) {
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
        <loginContext.Provider value={login}>
            {!loading &&
            <>
                {login.value && <Header /> }
                {children}
            </>
            }
        </loginContext.Provider>
        </>
    );
}