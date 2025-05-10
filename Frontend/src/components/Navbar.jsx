import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className=" bg-[#100325] p-2 flex justify-between items-center h-[8vh] ">
      <div className='mx-10'>
        <Link to="/">
          <img
            src="/assets/logo.png"
            alt="Noggle"
            className="h-10 w-40 rounded-full object-cover"
          />
        </Link>
      </div>

      <ul className="flex items-center">
        <li>
          <Link
            to="/home"
            className="flex items-center gap-2  text-white px-4 py-2 rounded-md hover:bg-[#1a0b33] hover:scale-105 transition duration-200"
          >
            <img src="/assets/home.png" alt="Profile" className="h-5 w-5" />
            Home
          </Link>
        </li>
        
        <li>
          <Link
            to="/profile"
            className="flex items-center gap-2  text-white px-4 py-2 rounded-md hover:bg-[#1a0b33] hover:scale-105 transition duration-200"
          >
            <img src="/assets/profile.svg" alt="Profile" className="h-5 w-5" />
            Profile
          </Link>
        </li>

        <li>
          <Link
            to="/settings"
            className="flex items-center gap-2  text-white px-4 py-2 rounded-md hover:bg-[#1a0b33] hover:scale-105 transition duration-200"
          >
            <img src="/assets/settings.svg" alt="Settings" className="h-5 w-5" />
            Settings
          </Link>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className=" flex items-center gap-2  text-white px-4 py-2 rounded-md hover:bg-[#1a0b33] hover:scale-105 transition duration-200"
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
