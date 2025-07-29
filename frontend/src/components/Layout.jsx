import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const navigation = [
    { name: 'Services', href: '/services', current: location.pathname === '/services' },
    { name: 'My Bookings', href: '/bookings', current: location.pathname === '/bookings' },
    ...(isAdmin() ? [
      { name: 'Admin Dashboard', href: '/admin', current: location.pathname === '/admin' }
    ] : []),
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/">
            Service Booking
          </Link>
          
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navigation.map((item) => (
                <li className="nav-item" key={item.name}>
                  <Link
                    className={`nav-link ${item.current ? 'active' : ''}`}
                    to={item.href}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="navbar-nav">
              <div className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-1"></i>
                  {user?.name}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <span className="dropdown-item-text">
                      {user?.name} ({user?.role})
                    </span>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-4">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
} 