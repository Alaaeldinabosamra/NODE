// core modules

// third-party modules
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// custom modules
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// init app
const app = express();

// GLOBAL Middlewares

// Security HTTP HEADERS
app.use(helmet());

// init app environment status
if (process.env.NODE_ENV === 'developmentt') {
  app.use(morgan('dev'));
  app.use((req, res, next) => {
    console.log('Hello from the middleware!');
    next();
  });
}

// control user requests
// allow 100 requests from the same IP: in one hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection [prevent doing stuff like this  "email": {"$gt": ""}, this always be true to it get all users emails ]
app.use(mongoSanitize());

// Data sanitization against XSS [prevent injection malicious HTML code and js code like this  "name": "<div id='bad-code'>Name</div>",]
app.use(xss());

// Prevent parameter pollution [handle dublicated parameters and staff like that]
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'difficulty',
      'price',
      'maxGroupSize',
    ],
  }),
);

// Serving static files because we need serve static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// Endpoints & Route
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

// Hanlding Routers not exist
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`,
  // });

  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error middleware handlers
app.use(globalErrorHandler);

//  Start Server
module.exports = app;
