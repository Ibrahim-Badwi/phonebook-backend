require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

/* morgan assignBody middleware */
const assignBody = (request, response, next) => {
  request.method === 'POST'
    ? (request.body = JSON.stringify(request.body))
    : (request.body = '');

  next();
};

/* add body token to morgan */
logger.token('body', (getBody = (req) => {
  return req.body;
}));

/* Middlewares */
app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(assignBody);
app.use(logger(':method :url :status - :response-time :body'));


/* Routes */
// Create
app.post('/api/persons', (request, response, next) => {
  const body = JSON.parse(request.body);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then(savedPerson => {
      response.status(201).send(savedPerson);
    })
    .catch(error => next(error));
});
// Retrieve
app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch(error => next(error));
});
// Retrieve
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person);
    })
    .catch(error => next(error));
});
// Update
app.post('/api/persons/:id', (request, response, next) => {
  const body = JSON.parse(request.body);

  const updatedPerson = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(request.params.id, updatedPerson, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error));
});
// Delete
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((deletedPerson) => {
      response.status(201).send({ message: `${deletedPerson.name} deleted` });
    })
    .catch(error => next(error));
});

app.get('/info', (request, response) => {
  Person.count({})
    .then(count => {
      let info = `<p>Phonebook has info ${count} people</p>
                <p>${new Date()}</p>`;

      response.send(info);
    });
});


/* handle unknown routes */
function unknownEndpoint(request, response) {
  response.status(404).send({ error: 'unknown endpoint' });
}
app.use(unknownEndpoint);


/* handle requests errors */
function errorHandler(error, request, response, next) {
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' });
  } else if(error.name === 'ValidationError') {
    response.status(400).send({ error: error.message });
  }

  next(error);
}
app.use(errorHandler);


/* starting APP! */
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});