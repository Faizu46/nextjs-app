'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (!pathname) return '';
    return pathname === path ? 'active' : '';
  };

  const getNavLinkClassName = (path: string) => {
    const activeClass = isActive(path);
    return activeClass ? `nav-link ${activeClass}` : 'nav-link';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="navbar-brand" onClick={closeMobileMenu}>
          <span style={{ marginRight: '0.5rem' }}>🚀</span>
          <span className="brand-text">CareerCraft</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-nav desktop-nav">
          <li>
            <Link href="/" className={getNavLinkClassName('/')}>
              Home
            </Link>
          </li>
          {session && (
            <>
              <li>
                <Link href="/dashboard" className={getNavLinkClassName('/dashboard')}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/interview" className={getNavLinkClassName('/interview')}>
                  Interview
                </Link>
              </li>
              <li>
                <Link href="/resume-builder" className={getNavLinkClassName('/resume-builder')}>
                  Resume Builder
                </Link>
              </li>
            </>
          )}
          {status === 'loading' ? (
            <li>
              <span className="nav-link">Loading...</span>
            </li>
          ) : session ? (
            <>
              <li className="user-greeting">
                <span className="nav-link" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>👋</span>
                  <span className="user-name-text">Hi, {session.user?.name || session.user?.email?.split('@')[0]}</span>
                </span>
              </li>
              <li>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="nav-link logout-nav-btn"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login" className={getNavLinkClassName('/login')}>
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <Link href="/" className={getNavLinkClassName('/')} onClick={closeMobileMenu}>
            <span className="nav-icon">🏠</span>
            Home
          </Link>

          {session && (
            <>
              <Link href="/dashboard" className={getNavLinkClassName('/dashboard')} onClick={closeMobileMenu}>
                <span className="nav-icon">📊</span>
                Dashboard
              </Link>
              <Link href="/interview" className={getNavLinkClassName('/interview')} onClick={closeMobileMenu}>
                <span className="nav-icon">🎤</span>
                Interview
              </Link>
              <Link href="/resume-builder" className={getNavLinkClassName('/resume-builder')} onClick={closeMobileMenu}>
                <span className="nav-icon">📄</span>
                Resume Builder
              </Link>
            </>
          )}

          {status === 'loading' ? (
            <span className="nav-link loading-text">
              <span className="nav-icon">⏳</span>
              Loading...
            </span>
          ) : session ? (
            <>
              <div className="mobile-user-info">
                <span className="nav-icon">👋</span>
                <span>Hi, {session.user?.name || session.user?.email?.split('@')[0]}</span>
              </div>
              <button
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                  closeMobileMenu();
                }}
                className="mobile-logout-btn"
              >
                <span className="nav-icon">🚪</span>
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className={getNavLinkClassName('/login')} onClick={closeMobileMenu}>
              <span className="nav-icon">🔐</span>
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}
    </nav>
  );
}
