import mongoose from "mongoose";

const cartsCollection = 'carts'
const cartsSchema = new mongoose.Schema(
  {
    cartId: {
      type: Number,
      unique: true // Ensures that each cart has a unique ID
    },
    products: [{
      productId: {
        type: Number, 
        required: true
      },
      quantity: {
        type: Number,
        required: true,
      }
    }],
    deleted: {
      type: Boolean, default: false
    }
    
  },
  {
    timestamps: true
  }
  
)

export const cartsModel = mongoose.model(cartsCollection, cartsSchema)


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