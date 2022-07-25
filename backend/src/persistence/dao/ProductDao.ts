import { ProductDto } from "../dto/ProductDto";

export interface ProductDao {
  insert: (productDto: ProductDto) => Promise<ProductDto>;
  getProduct: (id: number) => Promise<ProductDto | null>;
  listProducts: (pageSize: number, pageNumber: number) => Promise<ProductDto[]>;
  deleteProduct: (id: number) => Promise<boolean>;
  editProduct: (productDto: ProductDto) => Promise<boolean>;
  getProductsByIds: (ids: number[]) => Promise<Map<number, ProductDto>>;
}
