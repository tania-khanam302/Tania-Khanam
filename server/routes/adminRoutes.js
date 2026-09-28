
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const router = express.Router()

// Create Admin
router.post('/create', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingAdmin = await Admin.findOne({ email })

    if (existingAdmin) {
      return res.status(400).json({
        message: 'Admin already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    })

    res.status(201).json({
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create admin',
      error: error.message,
    })
  }
})

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })

    if (!admin) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password
    )

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    )

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    })
  } catch (error) {
    res.status(500).json({
      message: 'Login failed',
      error: error.message,
    })
  }
})

// Update Admin Profile
router.put('/profile', async (req, res) => {
  try {
    const {
      adminId,
      name,
      email,
      currentPassword,
      newPassword,
    } = req.body

    const admin = await Admin.findById(adminId)

    if (!admin) {
      return res.status(404).json({
        message: 'Admin not found',
      })
    }

    // Check current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      admin.password
    )

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Current password is incorrect',
      })
    }

    // Check if email is already used by another admin
    if (email && email !== admin.email) {
      const existingAdmin = await Admin.findOne({
        email,
        _id: { $ne: adminId },
      })

      if (existingAdmin) {
        return res.status(400).json({
          message: 'This email is already in use',
        })
      }

      admin.email = email
    }

    // Update name
    if (name) {
      admin.name = name
    }

    // Update password only if new password is provided
    if (newPassword) {
      admin.password = await bcrypt.hash(newPassword, 10)
    }

    await admin.save()

    res.status(200).json({
      message: 'Profile updated successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update profile',
      error: error.message,
    })
  }
})

export default router
