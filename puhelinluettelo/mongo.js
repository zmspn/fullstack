const mongoose = require('mongoose')


if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]


const url =
  `mongodb+srv://fullstack:${password}@cluster0.urlmj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  phone: String
})


const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  phone: process.argv[4]
})

if(process.argv.length > 4){

  person.save().then(() => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]}`)
    mongoose.connection.close()
  })
}


if(process.argv.length === 3){
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.phone)
    })
    mongoose.connection.close()
  })

}