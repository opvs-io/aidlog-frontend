export interface Request {
  id: number;
  productCode: string;
  amount: number;
  description: string | null;
  destination: string;
  organizationId: number;
  requesterUid: string;
  createdAt: string;
  updatedAt: string;
}
