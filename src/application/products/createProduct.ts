import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repositories/productRepository";
import { CreateProductDTO } from "../../interfaces/dtos/createProductsDTO";


export class CreateProduct {
  constructor(private productRepo: ProductRepository) {}

  public async execute(createProductDTO: CreateProductDTO): Promise<Product> {
    const product = new Product();
    product.name = createProductDTO.name;
    product.price = createProductDTO.price;
    product.stock = createProductDTO.stock;
    await this.productRepo.save(product);
    return product;
  }
}
