// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

import Customer from './Customer';
import Manager from './Manager';


// Query Selectors--------------------

const usernameInput = document.querySelector('.username');
const passwordInput = document.querySelector('.password');
const loginButton = document.querySelector('.login-button');
const managerDisplay = document.querySelector('.manager-display');
const customerDisplay = document.querySelector('.customer-display');

// Event Listeners
loginButton.addEventListener('click', userLogin)

//Global variables

let currentCustomer, manager;

function removeLogin() {
  document.querySelector('.login-info').classList.add('hidden');
}

function displayManagerAccount() {
  // manager = new Manager(currentDate, rooms, bookings);
  removeLogin();
  managerDisplay.classList.remove('hidden');
}

function displayCustomerAccount() {
  removeLogin();
  customerDisplay.classList.remove('hidden');
}

function userLogin(event) {
  event.preventDefault();
  let userName = usernameInput.value;
  let password = passwordInput.value;

  if (userName === 'manager' && password === 'overlook2020') {
    displayManagerAccount();
  } else if (userName.includes('customer') && password === 'overlook2020') {
    displayCustomerAccount();
  }
}
