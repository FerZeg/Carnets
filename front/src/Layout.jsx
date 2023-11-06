import Header from "./components/Header";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { loginContext } from "./main";
import { fetchUserData } from "./lib/fetchers";
import "./index.css";
Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default function Layout({ children }) {
    let [ loading, setLoading ] = useState(true)
    const [ login, setLogin ] = useState({
      value: false,
      data: null
    })
    useEffect(() => {
        document.title = "Carnets"
        ;(async() => {
          const data = await fetchUserData()
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