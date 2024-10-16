import { Invoice } from '../entities/invoice';
import { EntityManager } from 'typeorm';

export interface InvoiceRepository {
  save(invoice: Invoice, manager?: EntityManager): Promise<Invoice>;
  findById(id: number): Promise<Invoice | null>;
  listAll(): Promise<Invoice[]>;
  listPaginated(page: number, limit: number): Promise<{ invoices: Invoice[], total: number }>;
}
