import { Link } from "react-router-dom";
import logo from "../../../public/img/images/logo.png";

function Header({ filters, setFilters }) {
  return (
    <header className="header">
      {/* Logo */}
      <div className="header-left">
        <Link to="/"><img src={logo} alt="logo" className="logo" /></Link>
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
      <nav className="">
        <Link to="/" className="btn btn-soft btn-primary w-[141px] btn-nav">
          Home
        </Link>
        <Link to="/upload" className="btn btn-soft btn-primary w-[141px] btn-nav">
          Ajouter une vidéo
        </Link>
      </nav>
      <div className="flex-none nav-bar">
        <button className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
