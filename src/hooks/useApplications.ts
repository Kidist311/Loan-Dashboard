import { useEffect, useState } from "react";
import { Application, mockApplications } from "../mock/applications";

const STORAGE_KEY = "loan_applications";

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : mockApplications;
  });

  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  const selectApplication = (app: Application) => {
    setSelectedApplication(app);
  };

  const goBack = () => setSelectedApplication(null);

  const approve = (appId: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, status: "approved" } : app
      )
    );

    setSelectedApplication((prev) =>
        prev && prev.id === appId
          ? { ...prev, status: "approved" }
          : prev
      );
  };


  const reject = (appId: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, status: "rejected" } : app
      )
    );

    setSelectedApplication((prev) =>
        prev && prev.id === appId
          ? { ...prev, status: "rejected" }
          : prev
      );
  };

  const resetData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setApplications(mockApplications);
  };

  return {
    applications,
    selectedApplication,
    selectApplication,
    goBack,
    approve,
    reject,
    resetData,
  };
}