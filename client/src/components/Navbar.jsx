import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// import { FaTicketAlt } from 'react-icons/fa';
import { TbCalendarEvent } from "react-icons/tb";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

        .navbar-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .navbar-root.scrolled {
          background: rgba(5, 5, 5, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          box-shadow: 0 4px 40px rgba(0,0,0,0.4);
        }

        .navbar-root.top {
          background: transparent;
        }

        .navbar-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo */
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.35rem;
          letter-spacing: -0.02em;
          color: #fff;
          position: relative;
        }

        .navbar-logo-icon {
          color: #fff;
          font-size: 1.2rem;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: flex;
          align-items: center;
        }

        .navbar-logo:hover .navbar-logo-icon {
          transform: rotate(-15deg) scale(1.15);
        }

        .navbar-logo-text {
          background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.75) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .navbar-logo::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: rgba(255,255,255,0.4);
          transition: width 0.3s ease;
        }

        .navbar-logo:hover::after {
          width: 100%;
        }

        /* Nav Links */
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          position: relative;
          text-decoration: none;
          color: rgba(255,255,255,0.7);
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          transition: color 0.25s ease;
          padding: 4px 0;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 1px;
          background: #fff;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover {
          color: #fff;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* Logout Button */
        .btn-logout {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.75);
          padding: 8px 20px;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.01em;
        }

        .btn-logout:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.45);
          color: #fff;
        }

        /* Sign Up Button */
        .btn-signup {
          background: #fff;
          color: #000;
          padding: 9px 22px;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.01em;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .btn-signup::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent);
          transition: left 0.4s ease;
        }

        .btn-signup:hover::before {
          left: 100%;
        }

        .btn-signup:hover {
          background: #e8e8e8;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(255,255,255,0.15);
        }

        /* Fade-in animation on load */
        @keyframes navFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .navbar-root {
          animation: navFadeIn 0.5s ease forwards;
        }

        /* Stagger nav items */
        .navbar-links li {
          animation: navFadeIn 0.5s ease forwards;
        }
        .navbar-links li:nth-child(1) { animation-delay: 0.05s; opacity: 0; }
        .navbar-links li:nth-child(2) { animation-delay: 0.1s;  opacity: 0; }
        .navbar-links li:nth-child(3) { animation-delay: 0.15s; opacity: 0; }
        .navbar-links li:nth-child(4) { animation-delay: 0.2s;  opacity: 0; }

        /* Thin accent line under navbar */
        .navbar-accent {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transition: opacity 0.4s ease;
        }

        /* Mobile hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
          background: none;
          border: none;
        }

        .hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #fff;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .hamburger.open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger.open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* Mobile menu */
        .mobile-menu {
          position: fixed;
          top: 68px;
          left: 0;
          right: 0;
          background: rgba(5, 5, 5, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 1.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transform: translateY(-10px);
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 999;
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }

        .mobile-menu a,
        .mobile-menu button {
          font-size: 1rem;
        }

        @media (max-width: 640px) {
          .navbar-links {
            display: none;
          }
          .hamburger {
            display: flex;
          }
        }
      `}</style>

      <nav className={`navbar-root ${scrolled ? 'scrolled' : 'top'}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="navbar-logo-icon"><TbCalendarEvent /></span>
            <span className="navbar-logo-text">EVENTZ</span>
          </Link>

          {/* Desktop Links */}
          <ul className="navbar-links">
            <li>
              <Link to="/" className="nav-link">EVENTZ</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                    className="nav-link"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn-logout">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="btn-signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className="navbar-accent" />
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Events</Link>
        {user ? (
          <>
            <Link
              to={user.role === 'admin' ? '/admin' : '/dashboard'}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="btn-logout"
              style={{ width: 'fit-content' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" className="btn-signup" onClick={() => setMenuOpen(false)} style={{ width: 'fit-content' }}>Sign Up</Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;