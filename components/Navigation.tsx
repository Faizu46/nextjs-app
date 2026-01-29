'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Navigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isActive = (path: string) => {
    if (!pathname) return '';
    return pathname === path ? 'active' : '';
  };

  const getNavLinkClassName = (path: string) => {
    const activeClass = isActive(path);
    return activeClass ? `nav-link ${activeClass}` : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="navbar-brand">
          <span style={{ marginRight: '0.5rem' }}>🚀</span>
          CareerCraft
        </Link>
        <ul className="navbar-nav">
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
      </div>
    </nav>
  );
}
