import { Router } from 'express';
import { ProductController } from '../controllers/productController';

const router = Router();
const productController = new ProductController();

router.post('/', (req, res) => productController.createProduct(req, res));
router.put('/:id', (req, res) => productController.updateProduct(req, res));
router.delete('/:id', (req, res) => productController.deleteProduct(req, res));
router.get('/:id', (req, res) => productController.getProduct(req, res));
router.get('/', (req, res) => productController.listPaginated(req, res));


export { router as productRoutes };