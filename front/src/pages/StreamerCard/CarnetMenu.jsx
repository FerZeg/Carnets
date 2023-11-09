import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

export function CarnetMenu() {
    const location = useLocation();
    const pathParts = location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    return (
        <>
            <nav id='CarnetMenu'>
                <ul>
                    <li><Link to="" className={lastPart !== "ranking" ? "active" : ""}>Carnet</Link></li>
                    <li><Link to="ranking" className={lastPart === "ranking" ? "active" : ""}>Ranking</Link></li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}