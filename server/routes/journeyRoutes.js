import express from 'express'
import Journey from '../models/Journey.js'

const router = express.Router()

// Get all journeys
router.get('/', async (req, res) => {
  try {
    const journeys = await Journey.find().sort({ createdAt: -1 })

    res.status(200).json(journeys)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch journeys',
      error: error.message,
    })
  }
})

// Add journey
router.post('/', async (req, res) => {
  try {
    const journey = await Journey.create(req.body)

    res.status(201).json(journey)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create journey',
      error: error.message,
    })
  }
})

// Update journey
router.put('/:id', async (req, res) => {
  try {
    const journey = await Journey.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!journey) {
      return res.status(404).json({
        message: 'Journey not found',
      })
    }

    res.status(200).json(journey)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update journey',
      error: error.message,
    })
  }
})

// Delete journey
router.delete('/:id', async (req, res) => {
  try {
    const journey = await Journey.findByIdAndDelete(req.params.id)

    if (!journey) {
      return res.status(404).json({
        message: 'Journey not found',
      })
    }

    res.status(200).json({
      message: 'Journey deleted successfully',
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed to delete journey',
      error: error.message,
    })
  }
})

export default router