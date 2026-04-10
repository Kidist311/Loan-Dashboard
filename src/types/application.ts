export interface Application {
    id: string;
    name: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    risk: 'low' | 'medium' | 'high';
    income: number;
    creditScore: number;
  }

 
