import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ username, role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b">
      <div>
        <h1 className="text-lg font-semibold text-gray-800">
          Welcome, {username || 'User'} 👋
        </h1>
        <span className="text-sm text-gray-500 capitalize">
          {role} Portal
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition" title="Notifications">
          <FaBell className="text-gray-700 text-lg" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
        >
          <FaSignOutAlt />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
