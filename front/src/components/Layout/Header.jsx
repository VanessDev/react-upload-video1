import { Link } from "react-router-dom";
import logo from "../../../public/img/images/logo.png";

function Header({ filters, setFilters }) {
  return (
    <header className="header">
      {/* Logo */}
      <div className="header-left">
        <img src={logo} alt="logo" className="logo" />
        <span className="brand">Viadeo</span>
      </div>

      {/* Recherche */}
      <div className="header-search">
        <input
          type="text"
          placeholder="Titre"
          value={filters.title}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, title: e.target.value }))
          }
        />

        <select
          value={filters.theme}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, theme: e.target.value }))
          }
        >
          <option value="">Thème</option>
          <option value="fantasy">Fantasy</option>
          <option value="nature">Nature</option>
        </select>

        <select
          value={filters.note}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, note: e.target.value }))
          }
        >
          <option value="">Note</option>
          <option value="1">⭐ 1+</option>
          <option value="2">⭐ 2+</option>
          <option value="3">⭐ 3+</option>
          <option value="4">⭐ 4+</option>
          <option value="5">⭐ 5</option>
        </select>

        <input
          type="date"
          value={filters.date}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, date: e.target.value }))
          }
        />

        <button
          className="reset-btn"
          onClick={() =>
            setFilters({ title: "", theme: "", note: "", date: "" })
          }
        >
          Reset
        </button>
      </div>

      {/* Navigation */}
      <nav className="header-nav">
        <Link to="/" className="nav-btn">
          Home
        </Link>
        <Link to="/upload" className="nav-btn primary">
          Ajouter une vidéo
        </Link>
      </nav>
    </header>
  );
}

export default Header;
