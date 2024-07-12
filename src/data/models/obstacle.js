import mongoose from "mongoose";
const { Schema } = mongoose;

const mapSchema = new Schema(
  {
    mapId: { type: String, required: true },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
      _id: false
    },
    size: { type: Number, required: true }
  },
  { versionKey: false }
);

export const Obstacle = mongoose.model("Obstacle", mapSchema);
