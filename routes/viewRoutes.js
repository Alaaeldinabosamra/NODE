const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview,
);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get(
  '/signup',
  authController.isLoggedIn,
  viewsController.getRegisterForm,
);
router.get('/me', authController.protect, viewsController.getAccount);
router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.UpdateUserData,
);

router.get('/my-tours', authController.protect, viewsController.getMyTours);
router.get('/manage-tour', authController.protect, viewsController.ManageTour);

module.exports = router;
