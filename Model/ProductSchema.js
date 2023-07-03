import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    // created: {
    //   type: Date,
    //   required: true,
    // },
  },
  { timestamps: true }
);
export default mongoose.model("Products", ProductSchema);
