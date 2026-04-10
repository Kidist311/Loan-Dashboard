// pages/ApplicationsPage.tsx
import React from "react";
import { Search, Filter } from "lucide-react";
import { ApplicationCard } from "../components/ApplicationCard";
import type { Application } from "../mock/applications";
import { useApplicationFilter } from "../hooks/useApplicationFilter.ts     useApplicationDetails";



interface Props {
  onSelectApplication: (application: Application) => void;
  applications: Application[];
  resetData: () => void;
}

export default function ApplicationsPage({
  onSelectApplication,
  applications,
  resetData,
}: Props) {
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    filteredApplications,
    stats,
  } = useApplicationFilter(applications);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="  flex items-start justify-between">
        <div className="mb-4 ">
          <h1 className="text-[#051F20] mb-2 text-4xl font-bold">Kifiya Loan Dashboard</h1>
          <p className="text-[#163832]/70">
            Review and manage loan applications
          </p>
        </div>

        <button
            onClick={resetData}
            className="px-4 py-2 bg-[#125e61] hover:bg-[#4e7f81] text-sm  text-white rounded-lg transition"
          >
            Reset Data
        </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-[#235347] to-[#163832] rounded-xl p-6 text-white shadow-lg">
            <div className="text-white/80 text-sm mb-2">
              Total Applications
            </div>
            <div className="text-3xl">{stats.total}</div>
          </div>

          <div className="bg-white border-2 border-yellow-200 rounded-xl p-6">
            <div className="text-yellow-600 text-sm">Pending</div>
            <div className="text-2xl text-yellow-600">
              {stats.pending}
            </div>
          </div>

          <div className="bg-white border-2 border-green-200 rounded-xl p-6">
            <div className="text-green-600 text-sm">Approved</div>
            <div className="text-2xl text-green-600">
              {stats.approved}
            </div>
          </div>

          <div className="bg-white border-2 border-red-200 rounded-xl p-6">
            <div className="text-red-600 text-sm">Rejected</div>
            <div className="text-2xl text-red-600">
              {stats.rejected}
            </div>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as any)
            }
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* List */}
        {filteredApplications.length > 0 ? (
          filteredApplications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onClick={() =>
                onSelectApplication(app)
              }
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No applications found
          </p>
        )}
      </div>
    </div>
  );
}