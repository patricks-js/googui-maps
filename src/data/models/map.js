import mongoose from 'mongoose'
const { Schema } = mongoose

const mapSchema = new Schema(
  {
    name: { type: String, required: true },
    dimensions: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    obstacles: [
      {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        _id: false, // This disables the automatic addition of _id for each obstacle
      },
    ],
  },
  { versionKey: false },
)

export const Maps = mongoose.model('Map', mapSchema)
