import React from "react";

interface Props {
  label: string;
  value: number | string;
}

const StatsCard: React.FC<Props> = ({ label, value }) => (
  <div className="p-4 border rounded bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
    <div className="text-sm text-gray-500 dark:text-gray-300">{label}</div>
    <div className="mt-1 font-semibold text-gray-900 dark:text-white">{value}</div>
  </div>
);

export default StatsCard;