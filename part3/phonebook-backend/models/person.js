import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Load env variables
dotenv.config()

// Mongoose config
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL
console.log('connecting to', url)

// DB connection
mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default mongoose.model('Person', personSchema)
