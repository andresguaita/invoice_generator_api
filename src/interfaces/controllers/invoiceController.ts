import { Request, Response } from 'express';
import { CreateInvoice } from '../../application/invoices/createInvoice';
import { AppDataSource } from '../../infrastructure/repositories/db/database';
import { InvoiceRepositoryImpl } from '../../infrastructure/repositories/invoiceRepositoryImpl';
import { ListInvoices } from '../../application/invoices/listInvoices';
import { ListInvoicesWithDetails } from '../../application/invoices/listInvoicesWithDetails';
import { ProductRepositoryImpl } from '../../infrastructure/repositories/productRepositoryImpl';
import { CreateBatchInvoices } from '../../application/invoices/createBatchInvoices';


export class InvoiceController {
    private createInvoiceUseCase: CreateInvoice;
    private listInvoicesUseCase: ListInvoices;
    private listInvoicesWithDetailsUseCase: ListInvoicesWithDetails;
    createBatchInvoicesUseCase: CreateBatchInvoices;
    constructor() {
        const invoiceRepository = new InvoiceRepositoryImpl();
        const productRepository = new ProductRepositoryImpl();
        this.createInvoiceUseCase = new CreateInvoice(invoiceRepository, productRepository, AppDataSource);
        this.listInvoicesUseCase = new ListInvoices(invoiceRepository);
        this.listInvoicesWithDetailsUseCase = new ListInvoicesWithDetails(invoiceRepository);
        this.createBatchInvoicesUseCase = new CreateBatchInvoices(invoiceRepository, productRepository);
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
            res.status(500).json({ message: 'Error listing invoices with details', error: (error as Error).message });
        }
    }

    public async createBatchInvoices(req: Request, res: Response): Promise<void> {
        try {
            const file = req.file;

            if (!file) {
                res.status(400).json({ message: 'No file uploaded' });
                return;
            }
            else if (
                file.mimetype !== 'application/vnd.ms-excel' &&
                file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ) {
                res.status(400).json({ message: 'Invalid file type. Only Excel files are allowed.' });
                return;
            }
            const results = await this.createBatchInvoicesUseCase.execute(file.buffer);
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ message: 'Error creating batch invoices', error: (error as Error).message });
        }
    }


}
