import { Product } from "../generated/swagger/shop-it";
import { ProductDto } from "../persistence/dto/ProductDto";

export const allFields: Set<string> = new Set([
  "id",
  "title",
  "description",
  "price",
  "image",
  "creationTime",
]);

export const mapProductDtosToProducts = (
  productDtos: ProductDto[],
  fieldMask: Set<string>
): Product[] => {
  if (fieldMask.size === 0) {
    return [];
  }

  return productDtos.map((productDto: ProductDto) =>
    mapProductDtoToProduct(productDto, fieldMask)
  );
};

export const mapProductDtoToProduct = (
  productDto: ProductDto,
  fieldMask: Set<string> = allFields
): Product => {
  if (fieldMask.size === 0) return {};

  return {
    id: fieldMask.has("id") ? productDto.id : undefined,
    title: fieldMask.has("title") ? productDto.title : undefined,
    description: fieldMask.has("description")
      ? productDto.description
      : undefined,
    price: fieldMask.has("price") ? productDto.price : undefined,
    image: fieldMask.has("image") ? productDto.image : undefined,
  };
};
