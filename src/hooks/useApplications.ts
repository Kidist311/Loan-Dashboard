import { useState } from "react";
import { Application, mockApplications } from "../mock/applications";

export function useApplications() {
  const [applications, setApplications] =
    useState<Application[]>(mockApplications);

  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

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

  return {
    applications,
    selectedApplication,
    selectApplication,
    goBack,
    approve,
    reject,
  };
}