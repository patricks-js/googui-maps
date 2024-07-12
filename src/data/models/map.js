import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose;

const mapSchema = new Schema(
  {
    name: String,
    demessions: {
      width: Number,
      height: Number
    },
    obstacles: [
      {
        x: Number,
        y: Number
      },

      {
        x: Number,
        y: Number
      }
    ]
  },
  { versionKey: false }
);

export const Maps = mongoose.model("Map", mapSchema);
