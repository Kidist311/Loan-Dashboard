
import type { Document } from "../types/document";

export const applicationDetailsMock: Record<
  string,
  { documents: Document[] }
> = {
    "1": {
      documents: [
        { id: "d1", name: "National ID", status: "verified" },
        { id: "d2", name: "Bank Statement", status: "pending" },
      ],
    },
    "2": {
      documents: [
        { id: "d3", name: "National ID", status: "pending" },
        { id: "d4", name: "Salary Letter", status: "missing" },
      ],
    },
  };