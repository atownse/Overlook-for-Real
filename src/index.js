// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

import Customer from './Customer';
import Manager from './Manager';
import Booking from './Booking';
import apiCalls from './apiCalls';
import Room from './Room';


// Query Selectors--------------------

const usernameInput = document.querySelector('.username');
const passwordInput = document.querySelector('.password');
const loginButton = document.querySelector('.login-button');
const managerDisplay = document.querySelector('.manager-display');
const customerDisplay = document.querySelector('.customer-display');

// Event Listeners
loginButton.addEventListener('click', userLogin)

//Global variables

let currentCustomer, manager, customers, date, bookings, rooms;
date = "2020/01/21"; // reminder to change

// functions

Promise.all([apiCalls.getCustomerData(), apiCalls.getRoomData(), apiCalls.getBookingData()])
  .then((data) => {
    const condensedData = data.reduce((dataList, dataItem) => {
      return dataList = {...dataList, ...dataItem};
    }, {})
    instantiateData(condensedData)
  })

function instantiateData(data) {
  bookings = data.bookings.map(booking => {
    return new Booking(booking);
  });
  rooms = data.rooms.map(room => {
    return new Room(room);
  })
  customers = data.users.map(user => {
    return new Customer(user.id, user.name, date, bookings)
  });
  console.log(customers[29]);
  console.log(rooms)
}

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
