import { Router } from 'express';
import { InvoiceController } from '../controllers/invoiceController'; 

const router = Router();
const invoiceController = new InvoiceController();  


router.post('/', (req, res) => invoiceController.createInvoice(req, res));
router.get('/', (req, res) => invoiceController.listPaginated(req, res));

export { router as invoiceRoutes };
