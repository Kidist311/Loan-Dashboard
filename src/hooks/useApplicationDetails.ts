import { useState } from "react";
import type { Application } from "../mock/applications";

interface Document {
  id: string;
  name: string;
  status: "verified" | "pending" | "missing";
}

export function useApplicationDetails(application: Application) {
  const [documents, setDocuments] = useState<Document[]>([
    { id: "1", name: "National ID", status: "verified" },
    { id: "2", name: "Bank Statement", status: "pending" },
    { id: "3", name: "Salary Letter", status: "verified" },
  ]);

  const [notes, setNotes] = useState("");

  const toggleDocumentStatus = (docId: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              status:
                doc.status === "verified" ? "pending" : "verified",
            }
          : doc
      )
    );
  };

  const riskIndicators = [
    {
      show: application.creditScore < 650,
      message: "Credit score below 650",
      severity: "high" as const,
    },
    {
      show: application.amount > application.income * 5,
      message: "Loan exceeds 5× income",
      severity: "high" as const,
    },
    {
      show: documents.some((d) => d.status === "missing"),
      message: "Missing documents",
      severity: "medium" as const,
    },
  ].filter((i) => i.show);

  return {
    documents,
    notes,
    setNotes,
    toggleDocumentStatus,
    riskIndicators,
  };
}

//