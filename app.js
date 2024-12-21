// core modules

// third-party modules
const express = require('express');
const morgan = require('morgan');
// custom modules
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// init app
const app = express();

// Middlewares
if (process.env.NODE_ENV === 'developmentt') {
  app.use(morgan('dev'));
  app.use((req, res, next) => {
    console.log('Hello from the middleware!');
    next();
  });
}

app.use(express.json());
// because we need serve static files
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Endpoints & Route

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

//  Start Server

module.exports = app;
