import { Request, Response } from 'express';
import { CreateInvoice } from '../../application/invoices/createInvoice';
import { AppDataSource } from '../../infrastructure/repositories/db/database';
import { InvoiceRepositoryImpl } from '../../infrastructure/repositories/invoiceRepositoryImpl';
import { ListInvoices } from '../../application/invoices/listInvoices';


export class InvoiceController {
    private createInvoiceUseCase: CreateInvoice;
    private listInvoicesUseCase: ListInvoices;

    constructor() {
        const invoiceRepository = new InvoiceRepositoryImpl();
        this.createInvoiceUseCase = new CreateInvoice(invoiceRepository, AppDataSource);
        this.listInvoicesUseCase = new ListInvoices(invoiceRepository);
    }


    public async createInvoice(req: Request, res: Response): Promise<void> {
        try {
            const invoiceDTO = req.body;
            const invoice = await this.createInvoiceUseCase.execute(invoiceDTO);
            res.status(201).json(invoice);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Error creating invoice', error: error.message });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    }

    public async listPaginated(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string, 10) || 1; 
            const limit = parseInt(req.query.limit as string, 10) || 10;

            const result = await this.listInvoicesUseCase.execute(page, limit);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error listing invoices', error: (error as Error).message });
        }
    }


}
