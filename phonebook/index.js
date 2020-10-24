const express = require("express");
const morgan = require('morgan');

const app = express();
const PORT = 3001;

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

/* morgan assignBody middleware */
const assignBody = (request, response, next) => {
  (request.method === 'POST')
    ? request.body = JSON.stringify(request.body)
    : request.body = ""
    
  next();
};

/* add body token to morgan */
morgan.token('body', getBody = (req) => {
  return req.body;
});

app.use(express.json());
app.use(assignBody);
app.use(morgan(':method :url :status - :response-time :body'));

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

const generateRandomId = (limit=1000) => {
  return Math.floor(Math.random() * limit);
}
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if(!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  
  const found = persons.find(person => person.name === body.name)
  if(found) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  
  const person = {
    name: body.name,
    number: body.number,
    id: generateRandomId()
  }
  
  persons = persons.concat(person);

  response.json(request.body);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
