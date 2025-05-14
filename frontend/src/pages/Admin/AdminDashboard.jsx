import DashboardCard from '../../components/DashboardWidgets/DashboardCard';
import { Users, BarChart, Building2, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <DashboardCard title="Total Users" value="120" icon={<Users />} />
      <DashboardCard title="Analytics" value="99%" icon={<BarChart />} />
      <DashboardCard title="Active Rooms" value="25" icon={<Building2 />} />
      <DashboardCard title="Requests" value="4" icon={<AlertTriangle />} badge="New" />
    </div>
  );
};

export default AdminDashboard;
