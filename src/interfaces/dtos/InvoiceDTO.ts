export interface CreateInvoiceDTO {
    clientId: number;
    productIds: number[];
    amount: number;
    date: Date;
  }
  