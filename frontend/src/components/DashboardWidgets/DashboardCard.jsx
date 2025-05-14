// src/components/DashboardWidgets/DashboardCard.jsx
import { cn } from "../../utils/classnames";

const DashboardCard = ({ icon, title, value, badge, className }) => {
  return (
    <div className={cn("bg-white rounded-2xl p-4 shadow flex flex-col gap-2", className)}>
      <div className="flex justify-between items-center">
        <div className="text-gray-700 font-semibold text-lg">{title}</div>
        {badge && <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded-full">{badge}</span>}
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      {icon && <div className="text-green-500 text-2xl">{icon}</div>}
    </div>
  );
};

export default DashboardCard;
