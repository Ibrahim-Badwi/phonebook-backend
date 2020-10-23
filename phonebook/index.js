const { request, response } = require("express");
const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

let persons = [
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
                <p>${new Date}</p>
  `
  response.send(info);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  console.log(person);
  if(person) {
    return response.json(person)
  }
  return response.status(404).end();
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id)

  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const person = request.body;
  person.id = Math.floor(Math.random() * 1000);

  persons = persons.concat(person);

  response.json(request.body);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
