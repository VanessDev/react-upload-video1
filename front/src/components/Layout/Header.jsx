import { Link } from "react-router-dom"
import logo from "../../../public/img/images/logo.png"

function Header() {
    return (
        <header>
            <div>
                <img src={logo} alt="logo" className="logo"/>
            </div>
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