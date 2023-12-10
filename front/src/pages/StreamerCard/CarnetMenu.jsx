import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchStreamer } from "../../lib/fetchers";

export function CarnetMenu() {
    const location = useLocation();
    const pathParts = location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    const [streamer, setStreamer] = useState(null);
    const [loading, setLoading] = useState(true);
    const name = location.pathname.split("/")[1];
    useEffect(() => {
        fetchStreamer(name).then((res) => {
            if (res) setStreamer(res);
            setLoading(false);
        });
    }, [name]);
    return (
        <>
            {!loading && streamer &&
            <>
            <h1 className="Title" style={{textAlign: "center"}}>{streamer.display_name}</h1>
            <nav id='CarnetMenu'>
                <ul>
                    <li><Link to="" className={lastPart !== "ranking" ? "active" : ""}>Carnet</Link></li>
                    <li><Link to="ranking" className={lastPart === "ranking" ? "active" : ""}>Ranking</Link></li>
                </ul>
            </nav>
            <Outlet />
            </>
            }
        </>
    )
}