import { Request, Response } from 'express';
import { ProductRepositoryImpl } from '../../infrastructure/repositories/productRepositoryImpl';
import { CreateProduct } from '../../application/products/createProduct';
import { UpdateProduct } from '../../application/products/updateProduct';
import { DeleteProduct } from '../../application/products/deleteProduct';
import { ListProducts } from '../../application/products/listProducts';


export class ProductController {
  private productRepo = new ProductRepositoryImpl();

  private createProductUseCase = new CreateProduct(this.productRepo);
  private updateProductUseCase = new UpdateProduct(this.productRepo);
  private deleteProductUseCase = new DeleteProduct(this.productRepo);
  private getProductUseCase = new DeleteProduct(this.productRepo);
  private listProductsUseCase = new ListProducts(this.productRepo);
  
  public async createProduct(req: Request, res: Response): Promise<void> {
    const product = req.body;
    const newProduct = await this.createProductUseCase.execute(product);
    res.status(201).json(newProduct);
  }

  public async updateProduct(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const product = req.body;
    const updatedProduct = await this.updateProductUseCase.execute(id, product);
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }

  public async deleteProduct(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const deletedProduct = await this.deleteProductUseCase.execute(id);
    if (deletedProduct) {
      res.status(200).json(deletedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }

  public async getProduct(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const product = await this.getProductUseCase.execute(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }

  public async listPaginated(req: Request, res: Response): Promise<void> {
    try {
        const page = parseInt(req.query.page as string, 10) || 1; 
        const limit = parseInt(req.query.limit as string, 10) || 10;

        const result = await this.listProductsUseCase.execute(page, limit);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error listing products', error: (error as Error).message });
    }
}
}
