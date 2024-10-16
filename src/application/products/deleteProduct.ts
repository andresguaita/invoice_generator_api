import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repositories/productRepository";


export class DeleteProduct {
  constructor(private productRepo: ProductRepository) {}

  public async execute(id: number): Promise<Product | null> {
    const productToUpdate = this.productRepo.findById(id);
    if(!productToUpdate){
        throw new Error(`Product with ID ${id} not found`);   
    }
    return this.productRepo.delete(id);
  }
}