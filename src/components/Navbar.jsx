import React, { useState } from "react";
import "../componentStyles/Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  const isAuthenticated = false; 
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={()=>setIsMenuOpen(false)}>
            Adire<span className="text-white">ByMKZ</span>
          </Link>
        </div>

        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li onClick={()=>setIsMenuOpen(false)}>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-icons">
          {/* <div className="search-container">
            <form className="flex items-center bg-white rounded px-2 py-1">
              <input
                type="text"
                className="h-8 w-40 text-sm outline-none border-none"
                placeholder="Search..."
              />
              <button
                type="submit"
                className="flex items-center justify-center h-8 w-8 text-gray-600 hover:text-gray-900"
              >
                <SearchIcon fontSize="small" />
              </button>
            </form>
          </div> */}

          <div className="cart-container">
            <Link to="/cart">
              <ShoppingCartIcon className="icon" />
              <span className="cart-badge">0</span>
            </Link>
          </div>

          {!isAuthenticated && <Link to="/register" className="register-link">
            <PersonAddIcon className="icon" />
          </Link>}

          <div className="navbar-hamburger" onClick={toggleMenu}>
            {isMenuOpen ? <CloseIcon className="icon" /> : <MenuIcon className="icon" /> }
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
