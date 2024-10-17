import { InvoiceRepository } from '../../domain/repositories/invoiceRepository';
import { ExcelParser } from '../../infrastructure/services/excelParser';
import { Invoice } from '../../domain/entities/invoice';
import { ProductRepository } from '../../domain/repositories/productRepository';

export class CreateBatchInvoices {
    constructor(
        private invoiceRepo: InvoiceRepository,
        private productRepo: ProductRepository) { }

    public async execute(file: Buffer): Promise<{ invoice: Invoice, success: boolean }[]> {
        const parsedInvoices = ExcelParser.parse(file);
        const results: { invoice: Invoice, success: boolean }[] = [];

        for (const invoiceDTO of parsedInvoices) {
            let invoice = new Invoice();
            try {

                invoice.client = <any>{ id: invoiceDTO.clientId };
                invoice.totalAmount = invoiceDTO.amount;
                invoice.tax = this.calculateAmountTax(invoiceDTO.amount);
                invoice.date = new Date().toISOString();

                const products = await this.productRepo.findProductsByIds(invoiceDTO.productIds);
  
                invoice.products = products;

                const savedInvoice = await this.invoiceRepo.save(invoice);
                results.push({ invoice: savedInvoice, success: true });
            } catch (error) {
                results.push({ invoice: invoice , success: false });
            }
        }

        return results;
    }

    private calculateAmountTax(amount: number): number {
        const taxRate = 0.19;
        return amount * taxRate;
    }
}
