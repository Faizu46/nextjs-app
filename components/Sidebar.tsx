'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import './Sidebar.css';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Hide sidebar on auth pages
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return null;
  }

  const isActive = (path: string) => {
    return pathname === path ? 'active' : '';
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/resume-builder', label: 'Resume Builder', icon: '📄' },
    { href: '/interview', label: 'Interview Prep', icon: '🎤' },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Toggle Button */}
        <button
          className="sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? '→' : '←'}
        </button>

        {/* Logo/Branding */}
        <div className="sidebar-header">
          {!isCollapsed && <h2>CareerCraft</h2>}
        </div>

        {/* Main Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            {!isCollapsed && <p className="nav-section-title">Main</p>}
            <ul className="nav-items">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-item ${isActive(item.href)}`}
                    title={item.label}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {!isCollapsed && <span className="nav-label">{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Section */}
          <div className="nav-section">
            {!isCollapsed && <p className="nav-section-title">Tools</p>}
            <ul className="nav-items">
              <li>
                <Link
                  href="/dashboard"
                  className="nav-item"
                  title="My Resumes"
                >
                  <span className="nav-icon">📋</span>
                  {!isCollapsed && <span className="nav-label">My Resumes</span>}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="nav-item"
                  title="Applications"
                >
                  <span className="nav-icon">💼</span>
                  {!isCollapsed && <span className="nav-label">Applications</span>}
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="sidebar-bottom">
          {session && (
            <div className="user-info">
              {!isCollapsed && (
                <>
                  <div className="user-avatar">
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-details">
                    <p className="user-name">{session.user?.name}</p>
                    <p className="user-email">{session.user?.email}</p>
                  </div>
                </>
              )}
            </div>
          )}

          <button
            onClick={handleLogout}
            className="logout-btn"
            title="Logout"
          >
            <span className="nav-icon">🚪</span>
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      <div className="sidebar-overlay"></div>
    </>
  );
}
