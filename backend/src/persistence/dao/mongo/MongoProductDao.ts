import { ProductDto } from "../../dto/ProductDto";
import { ProductDao } from "../ProductDao";
import { generateId } from "./MongoCounterDao";
import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  creationTime: { type: Number, required: true },
});

productSchema.plugin(mongooseUniqueValidator);

const mongoProduct = mongoose.model<ProductDto>("Product", productSchema);

const getProduct = (id: number): Promise<ProductDto | null> => {
  return mongoProduct.findOne({ id }).then((res) => res && mapMongoToDto(res));
};

const insert = async (productDto: ProductDto): Promise<ProductDto> => {
  const id = await generateId("product");

  const productDtoWithId: ProductDto = {
    ...productDto,
    id: id,
  };

  return mongoProduct.create(productDtoWithId).then(() => productDtoWithId);
};

export const listProducts = async (
  pageSize: number,
  pageNumber: number
): Promise<ProductDto[]> => {
  const offset = pageSize * pageNumber;
  return mongoProduct
    .find()
    .sort("-id")
    .skip(offset)
    .limit(pageSize)
    .then((res) => res && res.map(mapMongoToDto));
};

const deleteProduct = (id: number): Promise<boolean> => {
  return mongoProduct
    .deleteOne({ id })
    .then((res) => res.deletedCount > 0)
    .catch(() => false);
};

const editProduct = (productDto: ProductDto): Promise<boolean> => {
  return mongoProduct
    .updateOne({ id: productDto.id }, productDto)
    .then((res) => res.modifiedCount > 0);
};

const getProductsByIds = (ids: number[]): Promise<Map<number, ProductDto>> => {
  return mongoProduct
    .find({ id: { $in: ids } })
    .then((res) => res && res.map(mapMongoToDto))
    .then(
      (res) =>
        new Map(res.map((productDto) => [productDto.id || -1, productDto]))
    );
};

const mapMongoToDto = ({
  id,
  title,
  description,
  image,
  price,
  creationTime,
}: mongoose.Document<unknown, unknown, ProductDto> &
  ProductDto): ProductDto => {
  return {
    id,
    title,
    description,
    image,
    price,
    creationTime,
  };
};

export const dao: ProductDao = {
  getProduct,
  insert,
  listProducts,
  deleteProduct,
  editProduct,
  getProductsByIds,
};

export default dao;
