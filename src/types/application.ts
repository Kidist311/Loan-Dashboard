export interface Application {
    id: string;
    name: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    risk: 'low' | 'medium' | 'high';
    income: number;
    creditScore: number;
  }

 export interface Document {
    id: string;
    name: string;
    status: "verified" | "pending" | "missing";
  }

  export type Status = "pending" | "approved" | "rejected";
export type Risk = "low" | "medium" | "high";