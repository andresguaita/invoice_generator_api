import { Invoice } from '../entities/invoice';

export interface InvoiceRepository {
  save(invoice: Invoice): Promise<Invoice>;
  findById(id: number): Promise<Invoice | null>;
  listAll(): Promise<Invoice[]>;
}
