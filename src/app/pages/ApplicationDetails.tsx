import { useState } from 'react';
import { ArrowLeft, FileText, AlertTriangle, Check, X } from 'lucide-react';
import { Badge } from '../components/Badge';

import React from 'react';
import { Application } from '../mock/applications';

interface Document {
  id: string;
  name: string;
  status: 'verified' | 'pending' | 'missing';
}

interface ApplicationDetailsProps {
  application: Application;
  onBack: () => void;
}

export function ApplicationDetails({ application, onBack }: ApplicationDetailsProps) {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'National ID', status: 'verified' },
    { id: '2', name: 'Bank Statement', status: 'pending' },
    { id: '3', name: 'Salary Letter', status: 'verified' },
  ]);
  const [notes, setNotes] = useState('');

  const riskIndicators = [
    {
      show: application.creditScore < 650,
      message: 'Credit score below 650',
      severity: 'high' as const,
    },
    {
      show: application.amount > application.income * 5,
      message: 'Loan amount exceeds 5× monthly income',
      severity: 'high' as const,
    },
    {
      show: documents.some((doc) => doc.status === 'missing'),
      message: 'Missing required documents',
      severity: 'medium' as const,
    },
  ].filter((indicator) => indicator.show);

  const toggleDocumentStatus = (docId: string) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          return {
            ...doc,
            status: doc.status === 'verified' ? 'pending' : 'verified',
          };
        }
        return doc;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#163832] hover:text-[#235347] mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Applications
        </button>

        <div className="mb-8 p-6 bg-gradient-to-br from-[#235347] to-[#163832] rounded-xl text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-white mb-2">{application.name}</h1>
              <p className="text-white/80">Application ID: {application.id}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white capitalize">{application.status}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-[#051F20] mb-6">Basic Information</h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-4 bg-[#fafafa] rounded-lg">
                <div className="text-sm text-[#163832]/60 mb-2">Applicant Name</div>
                <div className="text-lg text-[#051F20]">{application.name}</div>
              </div>
              <div className="p-4 bg-[#fafafa] rounded-lg">
                <div className="text-sm text-[#163832]/60 mb-2">Loan Amount</div>
                <div className="text-lg text-[#235347]">
                  ${application.amount.toLocaleString()}
                </div>
              </div>
              <div className="p-4 bg-[#fafafa] rounded-lg">
                <div className="text-sm text-[#163832]/60 mb-2">Monthly Income</div>
                <div className="text-lg text-[#051F20]">
                  ${application.income.toLocaleString()}
                </div>
              </div>
              <div className="p-4 bg-[#fafafa] rounded-lg">
                <div className="text-sm text-[#163832]/60 mb-2">Credit Score</div>
                <div className="text-lg text-[#051F20]">{application.creditScore}</div>
              </div>
            </div>
          </div>

          {/* Risk Indicators */}
          {riskIndicators.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-[#051F20] mb-6">Risk Indicators</h2>
              <div className="space-y-4">
                {riskIndicators.map((indicator, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-5 rounded-xl border-l-4 ${
                      indicator.severity === 'high'
                        ? 'bg-red-50 border-red-500'
                        : 'bg-[#f59e0b]/5 border-[#f59e0b]'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      indicator.severity === 'high'
                        ? 'bg-red-100'
                        : 'bg-[#f59e0b]/10'
                    }`}>
                      <AlertTriangle
                        className={`w-5 h-5 ${
                          indicator.severity === 'high'
                            ? 'text-red-600'
                            : 'text-[#f59e0b]'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div
                        className={
                          indicator.severity === 'high'
                            ? 'text-red-900'
                            : 'text-[#f59e0b]'
                        }
                      >
                        {indicator.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-[#051F20] mb-6">Documents</h2>
            <div className="space-y-4 mb-6">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-5 bg-[#fafafa] border border-gray-200 rounded-xl hover:border-[#235347] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                      <FileText className="w-5 h-5 text-[#235347]" />
                    </div>
                    <div>
                      <div className="text-[#051F20] mb-1">{doc.name}</div>
                      <Badge variant={doc.status}>{doc.status}</Badge>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleDocumentStatus(doc.id)}
                    className="px-5 py-2.5 bg-[#235347] text-white rounded-lg hover:bg-[#163832] transition-colors"
                  >
                    {doc.status === 'verified' ? 'Mark as Pending' : 'Mark as Verified'}
                  </button>
                </div>
              ))}
            </div>
            <div>
              <label className="block text-[#051F20] mb-3">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about documents..."
                rows={4}
                className="w-full px-4 py-3 bg-[#fafafa] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#235347] focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="sticky bottom-6 flex gap-4 bg-white border-2 border-gray-200 rounded-xl p-6 shadow-2xl">
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-br from-[#8EB69B] to-[#235347] text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
              <Check className="w-5 h-5" />
              Approve Application
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
              <X className="w-5 h-5" />
              Reject Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
