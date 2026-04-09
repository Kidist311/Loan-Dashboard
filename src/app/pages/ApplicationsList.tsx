import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { ApplicationCard } from '../components/ApplicationCard';
import React from 'react';

interface Application {
  id: string;
  name: string;
  loanAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  riskLevel: 'low' | 'medium' | 'high';
  monthlyIncome: number;
  creditScore: number;
}

const mockApplications: Application[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    loanAmount: 25000,
    status: 'pending',
    riskLevel: 'low',
    monthlyIncome: 6500,
    creditScore: 720,
  },
  {
    id: '2',
    name: 'Michael Chen',
    loanAmount: 45000,
    status: 'pending',
    riskLevel: 'medium',
    monthlyIncome: 5200,
    creditScore: 680,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    loanAmount: 15000,
    status: 'approved',
    riskLevel: 'low',
    monthlyIncome: 7800,
    creditScore: 750,
  },
  {
    id: '4',
    name: 'David Kim',
    loanAmount: 60000,
    status: 'pending',
    riskLevel: 'high',
    monthlyIncome: 4500,
    creditScore: 620,
  },
  {
    id: '5',
    name: 'Amanda Foster',
    loanAmount: 35000,
    status: 'rejected',
    riskLevel: 'high',
    monthlyIncome: 3200,
    creditScore: 590,
  },
  {
    id: '6',
    name: 'James Wilson',
    loanAmount: 28000,
    status: 'approved',
    riskLevel: 'low',
    monthlyIncome: 8200,
    creditScore: 780,
  },
];

interface ApplicationsListProps {
  onSelectApplication: (application: Application) => void;
}

export function ApplicationsList({ onSelectApplication }: ApplicationsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    pending: mockApplications.filter((app) => app.status === 'pending').length,
    approved: mockApplications.filter((app) => app.status === 'approved').length,
    rejected: mockApplications.filter((app) => app.status === 'rejected').length,
    total: mockApplications.length,
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#051F20] mb-2">Mini Loan Dashboard</h1>
          <p className="text-[#163832]/70">Review and manage loan applications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-[#235347] to-[#163832] rounded-xl p-6 text-white shadow-lg">
            <div className="text-white/80 text-sm mb-2">Total Applications</div>
            <div className="text-3xl mb-1">{stats.total}</div>
            <div className="text-white/60 text-sm">All time</div>
          </div>
          <div className="bg-white border-2 border-[#f59e0b]/20 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-[#f59e0b]/70 text-sm mb-2">Pending</div>
            <div className="text-3xl text-[#f59e0b] mb-1">{stats.pending}</div>
            <div className="text-[#163832]/50 text-sm">Awaiting review</div>
          </div>
          <div className="bg-white border-2 border-[#8EB69B]/30 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-[#235347]/70 text-sm mb-2">Approved</div>
            <div className="text-3xl text-[#235347] mb-1">{stats.approved}</div>
            <div className="text-[#163832]/50 text-sm">Successfully processed</div>
          </div>
          <div className="bg-white border-2 border-red-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-red-600/70 text-sm mb-2">Rejected</div>
            <div className="text-3xl text-red-600 mb-1">{stats.rejected}</div>
            <div className="text-[#163832]/50 text-sm">Did not qualify</div>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#163832]/40" />
            <input
              type="text"
              placeholder="Search by applicant name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8EB69B] focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#163832]/40 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#8EB69B] focus:border-transparent cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {filteredApplications.length > 0 ? (
          <div className="grid gap-4">
            {filteredApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onClick={() => onSelectApplication(application)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-lg">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#DAF1DE] flex items-center justify-center">
              <Search className="w-8 h-8 text-[#235347]" />
            </div>
            <h3 className="text-[#051F20] mb-2">No applications found</h3>
            <p className="text-[#163832]/70">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export type { Application };
