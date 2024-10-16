import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repositories/productRepository";

export class ListProducts {
  constructor(private productRepo: ProductRepository) {}

  public async execute(page: number, limit: number): Promise<{ products: any[], total: number, totalPages: number }> {
    const { products, total } = await this.productRepo.listPaginated(page, limit);
    const totalPages = Math.ceil(total / limit);

    return {
      products,
      total,
      totalPages
    };
  }
}
