import mongoose from "mongoose";

const messagesCollection = 'messages'
const messagesSchema = new mongoose.Schema(
  {
    messageId: {
      type: Number,
      unique: true // Ensures that each cart has a unique ID
    },
    sender: {
      type: String
    },
    recipient: {
      type: String
    },
    content: {
      type: String
    },
    deleted: {
      type: Boolean, default: false
    }
    
  },
  {
    timestamps: true
  }
  
)

export const cartsModel = mongoose.model(cartsCollection, cartsSchema)