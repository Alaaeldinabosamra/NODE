// core modules
const path = require('path');
// third-party modules
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
// custom modules
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const bookingRouter = require('./routes/bookingRoutes');

// init app
const app = express();

// Setup the templete engine in express
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving static files because we need serve static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

// GLOBAL Middlewares

// Security HTTP HEADERS
app.use(helmet());

// init app environment status
// if (process.env.NODE_ENV === 'developmentt') {
//   app.use(morgan('dev'));
//   app.use((req, res, next) => {
//     console.log('Hello from the middleware!');
//     next();
//   });
// }

// control user requests
// allow 100 requests from the same IP: in one hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour!',
  keyGenerator: function (req, res) {
    // استخدام X-Forwarded-For header
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  },
});
app.use('/api', limiter);
app.set('trust proxy', true);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

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

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  // console.log(req.cookies);

  next();
});

// allow Leaflet to access out source to display map in our app
app.use((req, res, next) => {
  // res.setHeader(
  //   'Content-Security-Policy',
  //   "script-src 'self' https://unpkg.com;",
  // );

  res.setHeader(
    'Content-Security-Policy',
    // "script-src 'self' https://unpkg.com https://cdn.jsdelivr.net; object-src 'none';",
    "script-src 'self' https://unpkg.com https://cdn.jsdelivr.net https://js.stripe.com; object-src 'none';",
  );
  next();
});

// Endpoints & Routes

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

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
