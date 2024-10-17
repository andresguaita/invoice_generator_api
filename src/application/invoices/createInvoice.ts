import { InvoiceRepository } from '../../domain/repositories/invoiceRepository';
import { DIANService } from '../../infrastructure/services/dianService';
import { Invoice } from '../../domain/entities/invoice';
import { DataSource, In } from 'typeorm';
import { CreateInvoiceDTO } from '../../interfaces/dtos/InvoiceDTO';
import { ProductRepository } from '../../domain/repositories/productRepository';

export class CreateInvoice {
    constructor(
        private invoiceRepo: InvoiceRepository,
        private productRepo: ProductRepository,
        private dataSource: DataSource
    ) { }

    public async execute(createInvoiceDTO: CreateInvoiceDTO): Promise<Invoice> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const taxAmount = this.calculateAmountTax(createInvoiceDTO.amount);
            const invoice = new Invoice();
            invoice.client = <any>{ id: createInvoiceDTO.clientId };
            invoice.totalAmount = createInvoiceDTO.amount + taxAmount;
            invoice.date = new Date().toISOString();
            invoice.tax = taxAmount;


            const products = await this.productRepo.findProductsByIds(createInvoiceDTO.productIds);

            if (products.length !== createInvoiceDTO.productIds.length) {
                throw new Error('Algunos productos no fueron encontrados');
            }


            invoice.products = products;
            const dianResponse = await DIANService.submitInvoice(invoice);
            if (!dianResponse.success) {
                throw new Error('DIAN service failed');
            }

            const savedInvoice = await this.invoiceRepo.save(invoice, queryRunner.manager);

            await queryRunner.commitTransaction();
            return savedInvoice;

        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }



    public calculateAmountTax(amount: number): number {
        const taxRate = 0.19;
        const taxAmount = amount * taxRate;
        return taxAmount;
    }
}
