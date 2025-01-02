import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout, signup } from './login';
import { updateSettings } from './updateSettings';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const logOutBtn = document.querySelector('.nav__el--logout');
const loginForm = document.querySelector('.form-login');
const signUpForm = document.querySelector('.form-signup');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('passwordConfirm');
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

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({ name, email }, 'data');
  });

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

if (logOutBtn) logOutBtn.addEventListener('click', logout);
