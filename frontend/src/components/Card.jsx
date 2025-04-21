import React from "react";

export const Card = ({ title, children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-tutGray">
      {title && <h2 className="text-2xl font-bold text-tutBlack mb-4">{title}</h2>}
      {children}
    </div>
  );
};
