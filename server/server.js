import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import projectRoutes from './routes/projectRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import skillRoutes from './routes/skillRoutes.js'
import journeyRoutes from './routes/journeyRoutes.js'


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully!')
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message)
  })

app.use('/api/projects', projectRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/journeys', journeyRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'Tania Khanam Portfolio API is running!'
  })
})

const PORT = process.env.PORT || 5176

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})