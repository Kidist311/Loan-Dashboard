import { useState } from 'react';

import React from 'react';
import { ApplicationDetails } from './pages/ApplicationDetails';
import ApplicationsList from './pages/ApplicationsPage';
import { Application } from './mock/applications';
import ApplicationsPage from './pages/ApplicationsPage';


export default function App() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  return (
    <div className="min-h-screen">
      {selectedApplication ? (
        <ApplicationDetails
          application={selectedApplication}
          onBack={() => setSelectedApplication(null)}
        />
      ) : (
        <ApplicationsPage onSelectApplication={setSelectedApplication} />
      )}
    </div>
  );
}