import React from "react";

const RoleCard = ({ role }) => (
  <div className={`flex flex-col items-center p-6 rounded-2xl shadow-xl bg-white/80 backdrop-blur-lg border border-gray-200 hover:scale-105 transition cursor-pointer min-w-[250px] max-w-[300px] mx-auto mb-6 bg-gradient-to-br ${role.color}`}>
    <div className="text-5xl mb-2">{role.icon}</div>
    <h2 className="text-xl font-bold mb-2 text-gray-800">{role.name}</h2>
    <ul className="text-gray-700 text-left list-disc pl-5 mb-2">
      {role.features.map((f, i) => (
        <li key={i}>{f}</li>
      ))}
    </ul>
  </div>
);

export default RoleCard;
