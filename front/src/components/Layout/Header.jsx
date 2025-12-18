import { Link } from "react-router-dom"
import logo from "../../../public/img/images/logo.png"

function Header() {
    return (
        <header>
            <div>
                <img src={logo} alt="logo" className="logo"/>
            </div>
            <label className="input input-primary">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input type="search" required placeholder="Search"/>
            </label>
            <nav>
                <ul>
                    <li className="btn-left"><Link to="/">Home</Link></li>
                    <li className="btn-right"><Link to="/upload">Ajouter une vidéo</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header