import { Outlet, Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return (
        < >
            <header className="App-header">
                <h1 className="header-title">GM Tracker</h1>
                <div className="header-links">
                    <Link to="/gm-tracker">Home</Link> -
                    <Link to="/gm-tracker/initative">Initative Tracker</Link> -
                    <Link to="/gm-tracker/npc">NPC Generator</Link>
                </div>
            </header>

            <Outlet/>
        </>
    )
}

export default Header;