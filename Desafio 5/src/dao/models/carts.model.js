import mongoose from "mongoose";

const cartsCollection = 'carts'
const cartsSchema = new mongoose.Schema(
  {
    id: Number, 
    title: {
      type: String, required: true
    },
    description: {
      type: String, required: true
    },
    price: {
      type: Number, required: true
    },
    thumbnail: {
      type: Array, required: true
    },
    code: {
      type: Number, required: true, unique: true
    },
    stock: {
      type: Number, required: true
    },
    status: {
      type: Boolean, default: true
    }
  },
  {
    timestamps: true
  }
)

export const productsModel = mongoose.model(productsCollection, productsSchema)


/* [
  {
    "id": 1,
    "products": [
      { "product": 1, "quantity": 4 },
      { "product": 2, "quantity": 2 }
    ]
  },
  {
    "id": 2,
    "products": [
      { "product": 3, "quantity": 1 },
      { "product": 4, "quantity": 1 },
      { "product": 1, "quantity": 1 }
    ]
  },
  {
    "id": 3,
    "products": [
      { "product": 5, "quantity": 1 },
      { "product": 6, "quantity": 1 }
    ]
  },
  { "id": 4, "products": [{ "product": 7, "quantity": 4 }] }
] */