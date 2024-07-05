import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Load env variables from .env file
dotenv.config()

const expectedPassword = process.env.MONGO_PWORD

if (process.argv.length < 3) {
  console.log('give password as argument to view all entries')
  console.log('give password and contact details to add new person')
  process.exit(1)
}

const password = process.argv[2]

if (password !== expectedPassword) {
  console.log('incorrect password')
  process.exit(1)
}

const url = `mongodb+srv://abunaswilliford:${password}@cluster0.4lwcdiv.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

// Mongoose configuration
mongoose.set('strictQuery', false)
mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Define the schema for the Person model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Create the Person model
const Person = mongoose.model('Person', personSchema)

// Fetch all entries when only password is provided
if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  // Add a new person when password and contact details are provided
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('Invalid number of arguments')
  process.exit(1)
}
