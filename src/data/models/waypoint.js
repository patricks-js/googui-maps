import mongoose from "mongoose";
const { Schema } = mongoose;

const waypointSchema = new Schema(
  {
    mapId: { type: String, required: true },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true }
    },

    name: { type: String, required: true }
  },

  { versionKey: false }
);

export const Waypoint = mongoose.model("Waypoint", waypointSchema);
