const mongo = require('mongoose');
const cmds = process.argv.length;

if (cmds < 3) {
  console.log('provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://admin:${password}@cluster0.6chbx.mongodb.net/phonebook-app?retryWrites=true&w=majority`;


// setup connection
mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// person schema
const personSchema = new mongo.Schema({
  name: String,
  number: String,
});

// person model
const Person = mongo.model('Person', personSchema, 'persons');

if (cmds === 3) {
  Person.find({}).then((result) => {
    console.log('phonebook:');
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongo.connection.close();
  });
} else if (cmds === 5) {
  let person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save()
    .then(() => {
      console.log(`added ${person.name} number ${person.number} to phonebook`);
      mongo.connection.close();
    });
}