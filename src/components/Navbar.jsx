import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <img src="/assets/logo.jpg" alt="MoveEase LLP logo" className="navbar-logo" />
          <span className="navbar-brand-text">
            Move<span className="navbar-brand-accent">Ease</span>
            <small>Packers &amp; Movers</small>
          </span>
        </Link>

        <nav className={`navbar-links ${open ? "navbar-links-open" : ""}`}>
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => `navbar-link ${isActive ? "navbar-link-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
         <Link to="/contact" className="btn btn-primary">Get a Free Quote</Link>

          {/* Account control — mobile menu view */}
          <div className="navbar-account navbar-account-mobile">
            {isAuthenticated ? (
              <>
                <Link to="/account" className="navbar-link" onClick={() => setOpen(false)}>My account</Link>
                {isAdmin && (
                  <Link to="/admin" className="navbar-link" onClick={() => setOpen(false)}>Admin dashboard</Link>
                )}
                <button className="navbar-link navbar-logout" onClick={handleLogout}>Log out</button>
              </>
            ) : (
              <Link to="/login" className="navbar-link" onClick={() => setOpen(false)}>Log in</Link>
            )}
          </div>
          
        </nav>

        {/* Account control — desktop, top right */}
        <div className="navbar-account navbar-account-desktop" ref={menuRef}>
          {isAuthenticated ? (
            <div className="navbar-user">
              <button
                className="navbar-user-trigger"
                onClick={() => setMenuOpen((o) => !o)}
                aria-expanded={menuOpen}
              >
                <span className="navbar-user-avatar">{user.fullName.charAt(0).toUpperCase()}</span>
                <span className="navbar-user-name">{user.fullName.split(" ")[0]}</span>
              </button>

              {menuOpen && (
                <div className="navbar-user-menu">
                  <Link to="/account" className="navbar-user-menu-item" onClick={() => setMenuOpen(false)}>
                    My account
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="navbar-user-menu-item" onClick={() => setMenuOpen(false)}>
                      Admin dashboard
                    </Link>
                  )}
                  <button className="navbar-user-menu-item navbar-user-menu-logout" onClick={handleLogout}>
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="navbar-login-link">Log in</Link>
          )}
        </div>

        <button
          className="navbar-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
