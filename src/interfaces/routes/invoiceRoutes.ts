import { Router } from 'express';
import { InvoiceController } from '../controllers/invoiceController'; 
import multer,  { FileFilterCallback } from 'multer';



const router = Router();
const invoiceController = new InvoiceController();  


router.post('/', (req, res) => invoiceController.createInvoice(req, res));
router.get('/', (req, res) => invoiceController.listPaginated(req, res));
router.get('/details', (req, res) => invoiceController.listInvoicesWithDetails(req, res));

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post('/batch', upload.single('file'), (req, res) => invoiceController.createBatchInvoices(req, res));



export { router as invoiceRoutes };
