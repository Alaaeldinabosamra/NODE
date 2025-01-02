import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');
const logOutBtn = document.querySelector('.nav__el--logout');

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

if (logOutBtn) logOutBtn.addEventListener('click', logout);
