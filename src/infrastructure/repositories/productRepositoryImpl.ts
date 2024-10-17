
import { AppDataSource } from './db/database';
import { Product } from '../../domain/entities/product';
import { ProductRepository } from '../../domain/repositories/productRepository';
import { In } from 'typeorm';


export class ProductRepositoryImpl implements ProductRepository {
  private ormRepo = AppDataSource.getRepository(Product);

  async save(product: Product): Promise<Product> {
    return this.ormRepo.save(product);
  }

  async update(id: number, product: Product): Promise<Product> {
    await this.ormRepo.update(id, product);
    const updatedProduct = <Product>await this.ormRepo.findOne({ where: { id } });
    return updatedProduct;
  }
  

  async findById(id: number): Promise<Product | null> {
    return this.ormRepo.findOne({ where: { id } }) || null;
  }

  async listAll(): Promise<Product[]> {
    return this.ormRepo.find();
  }

  async delete(id: number): Promise<Product> {
    await this.ormRepo.update(id, { isDeleted: true });
    const updatedProduct = <Product>await this.ormRepo.findOne({ where: { id } });
    return updatedProduct;
  }

  async listPaginated(page: number, limit: number): Promise<{ products: Product[], total: number }> {
    const [products, total] = await  this.ormRepo
      .findAndCount({
        take: limit, 
        skip: (page - 1) * limit,
      });
    return { products, total };
  }

  async findProductsByIds(productIds: number[]): Promise<Product[]> {
    return this.ormRepo.find({
      where: {
        id: In(productIds),
      },
    });
  }
}
