import mongoose from 'mongoose'

const journeySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['Education', 'Experience'],
    },

    year: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    institution: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const Journey = mongoose.model('Journey', journeySchema)

export default Journey