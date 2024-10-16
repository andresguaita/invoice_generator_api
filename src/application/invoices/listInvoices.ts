import { InvoiceRepository } from '../../domain/repositories/invoiceRepository';

export class ListInvoices {
  constructor(private invoiceRepo: InvoiceRepository) {}

  public async execute(page: number, limit: number): Promise<{ invoices: any[], total: number, totalPages: number }> {
    const { invoices, total } = await this.invoiceRepo.listPaginated(page, limit);
    const totalPages = Math.ceil(total / limit);

    return {
      invoices,
      total,
      totalPages
    };
  }
}
