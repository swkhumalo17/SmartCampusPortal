import React from "react";

const SummaryWidget = ({ title, count, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-xl font-semibold">{count}</p>
      </div>
    </div>
  );
};

export default SummaryWidget;
