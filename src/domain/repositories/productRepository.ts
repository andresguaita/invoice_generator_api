import { Product } from '../entities/product';

export interface ProductRepository {
  save(product: Product): Promise<Product>;
  findById(id: number): Promise<Product | null>;
  listAll(): Promise<Product[]>;
}
