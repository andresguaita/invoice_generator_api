import { Request, Response } from 'express';
import { CreateInvoice } from '../../application/invoices/createInvoice';
import { AppDataSource } from '../../infrastructure/repositories/db/database';
import { InvoiceRepositoryImpl } from '../../infrastructure/repositories/invoiceRepositoryImpl';
import { ListInvoices } from '../../application/invoices/listInvoices';
import { ListInvoicesWithDetails } from '../../application/invoices/listInvoicesWithDetails';
import { ProductRepositoryImpl } from '../../infrastructure/repositories/productRepositoryImpl';


export class InvoiceController {
    private createInvoiceUseCase: CreateInvoice;
    private listInvoicesUseCase: ListInvoices;
    private listInvoicesWithDetailsUseCase: ListInvoicesWithDetails;
    constructor() {
        const invoiceRepository = new InvoiceRepositoryImpl();
        const productRepository = new ProductRepositoryImpl();
        this.createInvoiceUseCase = new CreateInvoice(invoiceRepository,productRepository ,AppDataSource);
        this.listInvoicesUseCase = new ListInvoices(invoiceRepository);
        this.listInvoicesWithDetailsUseCase = new ListInvoicesWithDetails(invoiceRepository);
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

    public async listInvoicesWithDetails(req: Request, res: Response): Promise<void> {
        try {
            const invoices = await this.listInvoicesWithDetailsUseCase.execute();
            res.status(200).json(invoices);
        } catch (error) {
            res.status(500).json({ message: 'Error listing invoices with details',  error: (error as Error).message });
        }
    }


}
