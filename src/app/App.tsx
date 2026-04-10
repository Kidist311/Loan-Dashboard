// App.tsx
import React, { useState } from 'react';
import ApplicationsPage from './pages/ApplicationsPage';
import { ApplicationDetails } from './pages/ApplicationDetails';
import { mockApplications, Application } from './mock/applications';

export default function App() {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const handleSelectApplication = (app: Application) => {
    setSelectedApplication(app);
  };

  const handleBack = () => setSelectedApplication(null);

  const handleApprove = (appId: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, status: 'approved' } : app
      )
    );
    if (selectedApplication?.id === appId) {
      setSelectedApplication({ ...selectedApplication, status: 'approved' });
    }
  };

  const handleReject = (appId: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, status: 'rejected' } : app
      )
    );
    if (selectedApplication?.id === appId) {
      setSelectedApplication({ ...selectedApplication, status: 'rejected' });
    }
  };

  return selectedApplication ? (
    <ApplicationDetails
      application={selectedApplication}
      onBack={handleBack}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  ) : (
    <ApplicationsPage
      onSelectApplication={handleSelectApplication}
      applications={applications}
    />
  );
}