import express from 'express'
import Message from '../models/Message.js'

const router = express.Router()

// Submit contact message
router.post('/', async (req, res) => {
  try {
  const { name, email, mobile, subject, message } = req.body
const newMessage = await Message.create({
  name,
  email,
  mobile,
  subject,
  message,
})

    res.status(201).json({
      message: 'Message sent successfully!',
      data: newMessage,
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed to send message',
      error: error.message,
    })
  }
})

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })

    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch messages',
      error: error.message,
    })
  }
})


// Delete a message
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id)

    if (!message) {
      return res.status(404).json({
        message: 'Message not found',
      })
    }

    res.status(200).json({
      message: 'Message deleted successfully',
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed to delete message',
      error: error.message,
    })
  }
})
export default router