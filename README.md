
  # Mini Loan Dashboard
A React + TypeScript-based mini loan management dashboard that allows users to view, filter, and manage loan applications. 

## Tech Stack
React (Vite)
TypeScript
React Router DOM
Tailwind CSS
Lucide Icons
Local State Management (React Hooks)
LocalStorage (for persistence)

## Project Structure

src/
│
├── app/
│   └── App.tsx
│
├── components/
|   |--- ui/
│   ├── ApplicationCard.tsx
│   └── Badge.tsx
│
├── pages/
│   ├── ApplicationsPage.tsx
│   └── ApplicationDetails.tsx
│
├── hooks/
│   ├── useApplications.ts
│   ├── useApplicationDetails.ts
│   └── useApplicationFilter.ts
│
├── mock/
│   ├── applications.ts
│   └── details.ts
│
├── types/
│   ├── application.ts
│
└── styles/

## Features
** Applications List Page **
Displays loan applications in a clean card layout
Search applications by applicant name
Filter applications by status (pending / approved / rejected)
Displays risk level and status badges
Empty state when no results are found
Click on an application to view full details

** Application Details Page **
---Displays full applicant information:  Name, Loan amount, Monthly income, Credit score
---Document management system: View document list, Toggle document status (verified / pending / missing), Add internal notes (stored in UI state)
---Risk indicators based on business rules

## Setup Instructions
npm install
npm run dev

## What I Would Improve With More Time??
--Replace mock data with a real backend API 
--Add proper data fetching layer 

## Testing
-- Risk calculation logic
-- Hooks (useApplications, useApplicationDetails)
