import { Product } from '../entities/product';

export interface ProductRepository {
  save(product: Product): Promise<Product>;
  update(id:number,product: Product): Promise<Product>;
  delete(id:number): Promise<Product>;
  findById(id: number): Promise<Product | null>;
  findProductsByIds(productIds: number[]): Promise<Product[]>;
  listAll(): Promise<Product[]>;
  listPaginated(page: number, limit: number): Promise<{ products: Product[], total: number }>;
}
