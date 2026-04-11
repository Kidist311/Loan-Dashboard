
import React from 'react';
import type { Application } from '../mock/applications';

interface Props {
  application: Application;
  onClick: () => void;
}

export function ApplicationCard({ application, onClick }: Props) {
  const statusColors = {
    pending: 'text-yellow-600 bg-yellow-50',
    approved: 'text-green-600 bg-green-50',
    rejected: 'text-red-600 bg-red-50',
  };

  const riskColors = {
    low: 'text-green-700 bg-green-50',
    medium: 'text-yellow-700 bg-yellow-50',
    high: 'text-red-700 bg-red-50',
  };

  return (
    <div
      onClick={onClick}
      className="border p-4 mb-3 rounded-lg cursor-pointer hover:shadow-md shadow-[#5c7d74] transition-shadow flex justify-between items-center"
    >
      <div>
        <h3 className="font-semibold">{application.name}</h3>
        <p className="text-gray-600 text-sm">Loan: {application.amount.toLocaleString()} ETB</p>
      </div>

      <div className="flex flex-col items-end gap-1">
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[application.status]}`}>
          {application.status.toUpperCase()}
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${riskColors[application.risk]}`}>
          Risk: {application.risk.toUpperCase()}
        </div>
      </div>
    </div>
  );
}