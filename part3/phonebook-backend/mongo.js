import mongoose from 'mongoose'

if (process.argv.length < 3) {
  console.log('give password as argument to view all entries')
  console.log('give password and contact details to add new person')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://abunaswilliford:${password}@cluster0.4lwcdiv.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

// Mongoose configuration
mongoose.set('strictQuery', false)
mongoose.connect(url)

// Define the schema for the Person model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Create the Person model
const Person = mongoose.model('Person', personSchema)

// new person object
const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

person.save().then(() => {
  console.log(`added ${person.name} number ${person.number} to phonebook`)
  mongoose.connection.close()
})
