import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout, signup } from './login';
import { updateSettings } from './updateSettings';
import { createTour } from './manageTours';
import { bookTour } from './stripe';
import { showAlert } from './alerts';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const logOutBtn = document.querySelector('.nav__el--logout');
const loginForm = document.querySelector('.form-login');
const signUpForm = document.querySelector('.form-signup');
const userDataForm = document.querySelector('.form-user-data');
const tourDataForm = document.querySelector('.form-tour-data');
const userPasswordForm = document.querySelector('.form-user-password');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('passwordConfirm');
const bookBtn = document.getElementById('book-tour');

// DELEGATION
if (mapBox) {
  const locationsData = JSON.parse(mapBox.dataset.locations);
  displayMap(locationsData);
}

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // VALUES from login form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (signUpForm)
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // VALUES from signup form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const name = document.getElementById('name').value;
    if (password !== passwordConfirm) {
      // Add custom red border if passwords don't match
      passwordInput.style.borderBottom = '3px solid #ff7730'; // Add red border to password input
      passwordConfirmInput.style.borderBottom = '3px solid #ff7730'; // Add red border to confirmPassword input
    } else {
      // If passwords match, remove the red border (if any)
      passwordInput.style.borderBottom = 'none';
      passwordConfirmInput.style.borderBottom = 'none';
    }
    signup(email, password, passwordConfirm, name);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Create a new FormData object to prepare the form data for submission
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    // Call your updateSettings function to handle the form submission
    updateSettings(form, 'data');
  });

  // Listen for changes to the file input element
  const photoInput = document.getElementById('photo');
  const fileNameDisplay = document.getElementById('file-name');

  photoInput.addEventListener('change', () => {
    const file = photoInput.files[0];
    if (file) {
      // Get the file name and check its length
      let fileName = file.name;
      if (fileName.length > 20) {
        // Truncate the file name to 20 characters and append "..."
        fileName = fileName.substring(0, 20) + '...' + fileName.slice(-5);
      }
      // Display the name of the file selected
      fileNameDisplay.textContent = fileName;
      // fileNameDisplay.textContent = file.name;
    } else {
      // If no file is selected, display the default message
      fileNameDisplay.textContent = 'No file selected';
    }
  });
}

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );
    document.querySelector('.btn--save-password').textContent =
      'Save passwords';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (tourDataForm)
  tourDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const tourName = document.getElementById('tourName').value;
    const duration = document.getElementById('duration').value;
    const maxGroupSize = document.getElementById('maxGroupSize').value;
    const difficulty = document.getElementById('difficulty').value;
    const price = document.getElementById('price').value;
    const summary = document.getElementById('summary').value;
    const description = document.getElementById('description').value;
    const imageCover = document.getElementById('imageCover').files[0];
    const dateIndex = document.getElementById('tourDate').value;
    // console.log('###############');
    // console.log(dateIndex);
    // console.log('###############');

    // handled date
    const startDates = []; // Store selected dates

    if (dateIndex) {
      // Format the selected date to "YYYY-MM-DD,HH:mm"
      const formattedDate = dateIndex.replace('T', ',').substring(0, 16);
      // console.log(formattedDate);
      // Push the formatted date into the startDates array
      startDates.push(formattedDate);
    }

    // console.log(
    //   tourName,
    //   duration,
    //   maxGroupSize,
    //   difficulty,
    //   price,
    //   summary,
    //   description,
    //   // imageCover,
    //   startDates,
    // );
    const formData = new FormData();
    formData.append('name', tourName);
    formData.append('duration', duration);
    formData.append('maxGroupSize', maxGroupSize);
    formData.append('difficulty', difficulty);
    formData.append('price', price);
    formData.append('summary', summary);
    formData.append('description', description);

    // Append the startDates array
    formData.append('startDates', startDates);
    // formData.append('startDates', JSON.stringify(startDates));

    // Unhandled input locations
    const locations = [
      {
        type: 'Point',
        coordinates: [-118.7798, 34.0315],
        description: 'Point Dume Beach',
      },
    ];
    formData.append('startLocation', locations);

    // Handle cover image
    formData.append('imageCover', imageCover);

    // console.log(formData);
    createTour(formData);
  });

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
if (bookBtn) {
  // Show alert when mouse hovers over the button
  bookBtn.addEventListener('mouseenter', () => {
    showAlert(
      'warn',
      'Do not use sensitive data or real credit card. This is a beta version and still under testing!',
    );
  });
}
