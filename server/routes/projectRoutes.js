import express from 'express'
import Project from '../models/Project.js'

const router = express.Router()

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })

    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch projects',
      error: error.message,
    })
  }
})


// Add a new project
router.post('/', async (req, res) => {
  try {
    const project = await Project.create(req.body)

    res.status(201).json(project)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create project',
      error: error.message,
    })
  }
})


// Update project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!project) {
      return res.status(404).json({
        message: 'Project not found',
      })
    }

    res.status(200).json(project)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update project',
      error: error.message,
    })
  }
})


// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(
      req.params.id
    )

    if (!project) {
      return res.status(404).json({
        message: 'Project not found',
      })
    }

    res.status(200).json({
      message: 'Project deleted successfully',
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed to delete project',
      error: error.message,
    })
  }
})


export default router