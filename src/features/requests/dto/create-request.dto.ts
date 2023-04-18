export interface CreateRequestDto {
  destination: string;
  productCode: string;
  amount: number;
  description?: string;
}
