import { Link } from "react-router-dom"

function Header() {
    return (
        <header>
            <div>
                <img alt="logo" />
            </div>
            <nav>
                <ul>
                    <li className="btn-left"><Link to="/">Home</Link></li>
                    <li className="btn-right"><Link>Ajouter une vidéo</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header