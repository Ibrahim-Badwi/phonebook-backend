require('dotenv').config();
const mongo = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongo.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'name must be at least 3 characters']
  },
  number: {
    type: String,
    required: true,
    minlength: [8, 'phone number must be at least 8 digits']
  }
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
  }
});

module.exports = mongo.model('Person', personSchema, 'persons');