const AppError = require('./../utils/appError');

const handleDuplicateFieldsDB = (err) => {
  const value = Object.values(err.keyValue)[0];
  const message = `Duplicate field value: ${value} Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleMatchErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.passwordConfirm);
  const message = `Invalid input data. ${errors.split(':')[1]}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  return new AppError('Invalid token. Please log in again!', 401);
};

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please Log In again!', 401);

const sendErrorDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // B) RENDERED WEBSITE
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};
const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
      // programming or other unkown error: dont leak error details
    }
    // 1) Log Error
    // console.log(`\x1b[31mERROR ☠️ \x1b[0m`, err);
    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
  // B) RENDERED WEBSITE
  // A) Operational, trusst error: send message to client
  if (err.isOperational) {
    // console.log(err);
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
    // programming or other unkown error: dont leak error details
  }
  // B) Programming or other unkown error: don't leak error details
  // 1) Log Error
  // console.log(`\x1b[31mERROR ☠️ \x1b[0m`, err);
  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.errors) error = handleValidationErrorDB(error);
    if (error._message === 'User validation failed')
      error = handleMatchErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
