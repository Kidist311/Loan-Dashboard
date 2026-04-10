import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'pending' | 'approved' | 'rejected' | 'verified' | 'missing' | 'low' | 'medium' | 'high';
}

export function Badge({ children, variant = 'pending' }: BadgeProps) {
  const styles = {
    pending: 'bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30 shadow-sm',
    approved: 'bg-[#DAF1DE] text-[#235347] border border-[#8EB69B]/30 shadow-sm',
    rejected: 'bg-red-50 text-red-700 border border-red-300 shadow-sm',
    verified: 'bg-[#DAF1DE] text-[#235347] border border-[#8EB69B]/30 shadow-sm',
    missing: 'bg-red-50 text-red-700 border border-red-300 shadow-sm',
    low: 'bg-[#DAF1DE] text-[#235347] border border-[#8EB69B]/30 shadow-sm',
    medium: 'bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30 shadow-sm',
    high: 'bg-red-50 text-red-700 border border-red-300 shadow-sm',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm capitalize ${styles[variant]}`}>
      {children}
    </span>
  );
}
