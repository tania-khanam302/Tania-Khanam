import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'Tools'],
    },
  },
  {
    timestamps: true,
  }
)

const Skill = mongoose.model('Skill', skillSchema)

export default Skill