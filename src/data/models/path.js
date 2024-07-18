import mongoose from "mongoose";
const { Schema } = mongoose;

const pathSchema = new Schema(
  {
    mapId: { type: String, required: true },
    start: {
      x: { type: Number, required: true },
      y: { type: Number, required: true }
    },
    end: {
      x: { type: Number, required: true },
      y: { type: Number, required: true }
    },
    distance: { type: Number, required: true }
  },
  { versionKey: false }
);

export const Path = mongoose.model("Path", pathSchema);
