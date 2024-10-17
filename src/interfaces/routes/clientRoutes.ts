import { Router } from 'express';
import { ClientController } from '../controllers/clientController';


const router = Router();
const clientController = new ClientController();  


router.post('/', (req, res) => clientController.createClient(req, res));
router.put('/:id', (req, res) => clientController.updateClient(req, res));
router.delete('/:id', (req, res) => clientController.deleteClient(req, res));
router.get('/:id', (req, res) => clientController.getClient(req, res));
router.get('/', (req, res) => clientController.listPaginated(req, res));
export { router as clientRoutes };
