import { InvoiceRepository } from '../../domain/repositories/invoiceRepository';
import { Invoice } from '../../domain/entities/invoice';

export class ListInvoicesWithDetails {
  constructor(private invoiceRepo: InvoiceRepository) {}

  public async execute(): Promise<Invoice[]> {
    return this.invoiceRepo.listAllWithDetails();
  }
}
