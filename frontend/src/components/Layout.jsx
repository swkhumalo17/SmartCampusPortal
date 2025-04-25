import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ role }) => {
  const username = JSON.parse(localStorage.getItem('user'))?.username;

  return (
    <div className="flex h-screen bg-mint-50">
      <Sidebar role={role} />
      <div className="flex flex-col flex-1">
        <Topbar username={username} role={role} />
        <main className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
