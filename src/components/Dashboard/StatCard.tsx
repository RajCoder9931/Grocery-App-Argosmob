import React from 'react';
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
}
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change
}) => {
  return <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className="rounded-full bg-gray-100 p-3">{icon}</div>
      </div>
      <div className="mt-4">
        <span className="text-sm font-medium text-green-500">{change}</span>
        <span className="text-sm text-gray-500 ml-1">from last month</span>
      </div>
    </div>;
};
export default StatCard;