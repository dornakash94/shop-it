import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import { TransactionDto, LineItem } from "../../dto/TransactionDto";
import { TransactionDao } from "../TransactionDao";
import { generateId } from "./MongoCounterDao";

const transactionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  lineItems: { type: Object, required: true },
  totalPrice: { type: Number, required: true },
  creationTime: { type: Number, required: true },
});

transactionSchema.plugin(mongooseUniqueValidator);

const MongoTransaction = mongoose.model<TransactionDto>(
  "Transaction",
  transactionSchema
);

const makePurchase = async (lineItems: LineItem[]): Promise<TransactionDto> => {
  const id = await generateId("transaction");
  const totalPrice = lineItems
    .map((lineItem) => lineItem.price * lineItem.count)
    .reduce((a, b) => a + b, 0);

  const transactionDto: TransactionDto = {
    id,
    lineItems,
    totalPrice,
    creationTime: new Date().getTime(),
  };

  return MongoTransaction.create(transactionDto).then(() => transactionDto);
};

const getTopSales = async (
  numberOfTops: number
): Promise<{ id: number; count: number }[]> => {
  return MongoTransaction.aggregate([
    {
      $unwind: "$lineItems",
    },
    {
      $group: {
        _id: "$lineItems.id",
        count: {
          $sum: "$lineItems.count",
        },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: numberOfTops,
    },
  ]).then(
    (res) =>
      res &&
      res.map((agg) => {
        return { id: agg["_id"], count: agg.count };
      })
  );
};

const getTopItems = async (
  numberOfTops: number
): Promise<{ id: number; count: number }[]> => {
  return MongoTransaction.aggregate([
    {
      $unwind: "$lineItems",
    },
    {
      $group: {
        _id: "$lineItems.id",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: numberOfTops,
    },
  ]).then(
    (res) =>
      res &&
      res.map((agg) => {
        return { id: agg["_id"], count: agg.count };
      })
  );
};

const getPastDays = async (
  numberOfDays: number
): Promise<{ date: number; totalProfit: number }[]> => {
  return MongoTransaction.aggregate([
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: {
              $toDate: "$creationTime",
            },
          },
        },
        count: {
          $sum: "$totalPrice",
        },
      },
    },
    {
      $sort: {
        creationTime: 1,
      },
    },
    {
      $limit: numberOfDays,
    },
  ]).then(
    (res) =>
      res &&
      res.map((agg) => {
        return { date: agg["_id"], totalProfit: agg.count };
      })
  );
};

export const dao: TransactionDao = {
  makePurchase,
  getTopSales,
  getTopItems,
  getPastDays,
};

export default dao;
