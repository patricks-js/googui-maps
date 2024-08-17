import { Schema, model } from 'mongoose'

const nodeSchema = new Schema({
  x: Number,
  y: Number,
  neighbors: [{ type: Schema.Types.ObjectId, ref: 'Node' }],
})

export const Node = model('Node', nodeSchema)
