import React from 'react';

const Card = ({ title, icon, count, to }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full text-2xl">
          {icon}
        </div>
        {count !== undefined && (
          <div className="text-2xl font-bold text-gray-800">{count}</div>
        )}
      </div>
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      {to && (
        <a
          href={to}
          className="text-sm text-blue-600 hover:underline mt-2 inline-block"
        >
          View details →
        </a>
      )}
    </div>
  );
};

export default Card;
