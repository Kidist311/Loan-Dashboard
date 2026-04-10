// App.tsx
import React from "react";
import { useApplications } from "../hooks/useApplications";
import { ApplicationDetails } from "../pages/ApplicationDetails";
import ApplicationsPage from "../pages/ApplicationsPage";


export default function App() {
  const {
    applications,
    selectedApplication,
    selectApplication,
    goBack,
    approve,
    reject,
  } = useApplications();

  return selectedApplication ? (
    <ApplicationDetails
      application={selectedApplication}
      onBack={goBack}
      onApprove={approve}
      onReject={reject}
    />
  ) : (
    <ApplicationsPage
      applications={applications}
      onSelectApplication={selectApplication}
    />
  );
}