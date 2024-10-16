
import { Invoice } from '../../domain/entities/invoice';
import { AppDataSource } from './db/database';
import { InvoiceRepository } from '../../domain/repositories/invoiceRepository';
import { EntityManager } from 'typeorm';


export class InvoiceRepositoryImpl implements InvoiceRepository {
  async save(invoice: Invoice, manager?: EntityManager): Promise<Invoice> {
    if (manager) {
      return manager.save(invoice);
    } else {
      return AppDataSource.getRepository(Invoice).save(invoice);
    }
  }

  async findById(id: number): Promise<Invoice | null> {
    return AppDataSource.getRepository(Invoice).findOne({ where: { id } }) || null;
  }

  async listAll(): Promise<Invoice[]> {
    return AppDataSource.getRepository(Invoice).find();
  }

  async listPaginated(page: number, limit: number): Promise<{ invoices: Invoice[], total: number }> {
    const [invoices, total] = await AppDataSource.getRepository(Invoice)
      .findAndCount({
        take: limit, 
        skip: (page - 1) * limit,
      });
    return { invoices, total };
  }
}
