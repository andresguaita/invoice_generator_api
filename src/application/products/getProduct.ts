import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repositories/productRepository";


export class GetProduct {
  constructor(private productRepo: ProductRepository) {}

  public async execute(id: number): Promise<Product | null> {
    return this.productRepo.findById(id);
  }
}