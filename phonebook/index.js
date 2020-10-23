const express = require("express");
const app = express();
const PORT = 3001;

const persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "Ibrahim Badwi",
    number: "77-33-1234567",
    id: 5,
  },
  {
    name: "ahmed",
    number: "77-33-1234567",
    id: 6,
  },
];

app.get('/info', (request, response) => {
  const info = `<p>Phonebook has info ${persons.length} people</p>
    ${new Date}
  `
  response.send(info);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
