import { InvoiceRepository } from '../../domain/repositories/invoiceRepository';
import { DIANService } from '../../infrastructure/services/dianService';
import { Invoice } from '../../domain/entities/invoice';
import { DataSource } from 'typeorm';
import { CreateInvoiceDTO } from '../../interfaces/dtos/InvoiceDTO';

export class CreateInvoice {
    constructor(
        private invoiceRepo: InvoiceRepository,
        private dataSource: DataSource
    ) { }

    public async execute(createnvoiceDTO: CreateInvoiceDTO): Promise<Invoice> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const taxAmount= this.calculateAmountTax(createnvoiceDTO.amount);
            const invoice = new Invoice();
            invoice.client = <any>{ id: createnvoiceDTO.clientId };
            invoice.totalAmount = createnvoiceDTO.amount + taxAmount;
            invoice.date = new Date().toISOString();
            invoice.tax = 0;

            createnvoiceDTO.productIds.map(productId => {
                invoice.products = <any>{ id: productId };
            });

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
