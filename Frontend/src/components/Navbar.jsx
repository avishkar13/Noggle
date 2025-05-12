import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);



 return (
    <nav className="bg-[#100325] p-2 flex justify-between items-center h-[8vh] relative ">
      {/* Logo */}
      <div className="mx-10">
        <Link to="/">
          <img
            src="/assets/logo.png"
            alt="Noggle"
            className="h-10 w-40 rounded-full object-cover"
          />
        </Link>
      </div>

      {/* Hamburger Icon */}
      <button
        ref={buttonRef}
        className="lg:hidden mr-6 z-20"
        onClick={toggleMenu}
      >
        <img src="/assets/menu.svg" alt="Menu" className="h-8 w-8" />
      </button>

      {/* Menu */}
      <ul
        ref={menuRef}
        className={`${
          menuOpen ? 'flex' : 'hidden'
        } lg:flex flex-col lg:flex-row absolute lg:static right-6 top-[8vh] lg:top-auto bg-[#1a0b33] lg:bg-transparent rounded-md lg:rounded-none shadow-md lg:shadow-none transition-all duration-300 z-10`}
      >
        {[
          { to: '/home', icon: '/assets/home.png', label: 'Home' },
          { to: '/profile', icon: '/assets/profile.svg', label: 'Profile' },
          { to: '/settings', icon: '/assets/settings.svg', label: 'Settings' },
        ].map(({ to, icon, label }) => (
          <li key={to}>
            <Link
              to={to}
              className="flex items-center gap-2 text-white px-4 py-2 rounded-md hover:bg-[#261146] hover:scale-105 transition duration-200"
              onClick={() => setMenuOpen(false)}
            >
              <img src={icon} alt={label} className="h-5 w-5" />
              {label}
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 text-white px-4 py-2 rounded-md hover:bg-[#261146] hover:scale-105 transition duration-200"
          >
            <img src="/assets/logout.svg" alt="Logout" className="h-5 w-5" />
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
