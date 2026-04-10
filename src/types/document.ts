export interface Document {
    id: string;
    name: string;
    status: "verified" | "pending" | "missing";
  }