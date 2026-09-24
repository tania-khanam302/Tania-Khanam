import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      default: '',
      trim: true,
    },

    subject: {
      type: String,
      default: '',
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Message = mongoose.model('Message', messageSchema)

export default Message