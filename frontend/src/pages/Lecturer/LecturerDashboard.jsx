import DashboardCard from '../../components/DashboardWidgets/DashboardCard';
import { CalendarCheck, UserPlus, FileText, Bell } from 'lucide-react';

const LecturerDashboard = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <DashboardCard title="My Schedule" value="5" icon={<CalendarCheck />} />
      <DashboardCard title="Appointments" value="2" icon={<UserPlus />} />
      <DashboardCard title="Lectures Today" value="3" icon={<FileText />} />
      <DashboardCard title="Notifications" value="1" icon={<Bell />} badge="1" />
    </div>
  );
};

export default LecturerDashboard;
