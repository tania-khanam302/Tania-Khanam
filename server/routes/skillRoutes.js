import express from 'express'
import Skill from '../models/Skill.js'

const router = express.Router()

// Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 })

    res.status(200).json(skills)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch skills',
      error: error.message,
    })
  }
})

// Add a new skill
router.post('/', async (req, res) => {
  try {
    const skill = await Skill.create(req.body)

    res.status(201).json(skill)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create skill',
      error: error.message,
    })
  }
})

// Update skill
router.put('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!skill) {
      return res.status(404).json({
        message: 'Skill not found',
      })
    }

    res.status(200).json(skill)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update skill',
      error: error.message,
    })
  }
})

// Delete skill
router.delete('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id)

    if (!skill) {
      return res.status(404).json({
        message: 'Skill not found',
      })
    }

    res.status(200).json({
      message: 'Skill deleted successfully',
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed to delete skill',
      error: error.message,
    })
  }
})

export default router