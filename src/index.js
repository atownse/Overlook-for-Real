// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import Customer from './Customer';
import Manager from './Manager';
import Booking from './Booking';
import apiCalls from './apiCalls';
import Room from './Room';
import moment from 'moment';


// Query Selectors--------------------

const userNameDisplay = document.querySelector('.user-name');
const usernameInput = document.querySelector('.username');
const passwordInput = document.querySelector('.password');
const loginButton = document.querySelector('.login-button');
const managerDisplay = document.querySelector('.manager-display');
const customerDisplay = document.querySelector('.customer-display');
const managerRooms = document.querySelector('.manager-rooms');
const managerRevenue = document.querySelector('.manager-revenue');
const occupiedPercentage = document.querySelector('.percent-occupied');
const customerRooms = document.querySelector('.customer-rooms');
const customerCost = document.querySelector('.customer-cost');
const customerRoomsButton = document.querySelector('#customer-available-button');
const managerRoomsButton = document.querySelector('#manager-available-button');
const assignCustomerButton = document.querySelector('.manager-customer');
const calendarDate = document.querySelector('.manager-display .manager-calendar');
const updateDisplayButton = document.querySelector('.update-button');

// Event Listeners
loginButton.addEventListener('click', userLogin);
customerRoomsButton.addEventListener('click', showCustomerAvailableRooms);
managerRoomsButton.addEventListener('click', displayManagerAccount);
updateDisplayButton.addEventListener('click', updateManagerDisplay);
// assignCustomerButton.addEventListener('click', assignCustomer)
//Global variables

let currentCustomer, manager, customers, date, bookings, rooms, bookingData;
manager = new Manager(customers, rooms, 'manager', date, bookings);

// functions

Promise.all([apiCalls.getCustomerData(), apiCalls.getRoomData(), apiCalls.getBookingData()])
.then((data) => {
  const condensedData = data.reduce((dataList, dataItem) => {
    return dataList = {...dataList, ...dataItem};
  }, {})
  instantiateData(condensedData)
  // login('customer29', 'overlook2020'); // for development
});

function instantiateData(data) {
  bookings = data.bookings.map(booking => {
    return new Booking(booking);
  });
  rooms = data.rooms.map(room => {
    return new Room(room);
  })
  customers = data.users.map(user => {
    return new Customer(user.id, date, bookings, user.name, data.users)
  });
}

function removeLogin() {
  document.querySelector('.login-info').classList.add('hidden');
}

assignCustomerButton.addEventListener('click', assignCustomer);

function updateManagerDisplay() {
  date = calendarDate.value;
  let formattedDate = moment(date).format("YYYY/MM/DD");
  managerRevenue.innerText = manager.provideTotalRevenue(formattedDate, bookings, rooms);
  occupiedPercentage.innerText = manager.calculatePercentOccupied(formattedDate, bookings, rooms);

}

function assignCustomer() {
  const customerID = document.querySelector('.customer-input');
  currentCustomer = customers.find(customer => `customer${customer.id}` === customerID.value)
  console.log(currentCustomer)
  event.preventDefault();
  // const calendarDate = document.querySelector('.manager-display .manager-calendar');
  date = calendarDate.value;
  let formattedDate = moment(date).format("YYYY/MM/DD");
  displayAvailableRooms(formattedDate, bookings, rooms, managerRooms, manager)
  bindBookingButtons();
}


function displayManagerAccount() {
  event.preventDefault();
  // const calendarDate = document.querySelector('.manager-display .manager-calendar');
  date = calendarDate.value;
  let formattedDate = moment(date).format("YYYY/MM/DD");
  displayAvailableRooms(formattedDate, bookings, rooms, managerRooms, manager)
  managerRevenue.innerText = manager.provideTotalRevenue(date, bookings, rooms);
  occupiedPercentage.innerText = manager.calculatePercentOccupied(date, bookings, rooms);
  removeLogin();
  managerDisplay.classList.remove('hidden');
}

function displayBookedRooms() {
  let customersRooms = currentCustomer.provideBookedRooms(bookings);
  customersRooms.forEach(room => {
    let bookedDate = room.date
    customerRooms.innerHTML += `
      <section id="booked-rooms">
        <p>You booked Room ${room.roomNumber} on ${moment(bookedDate).format("MMM Do YYYY") }</p>
      </section>  
    `
  })
}

function displayAvailableRooms(date, bookingData, roomData, section, user) {
  let openRooms = user.showAvailableRooms(date, bookingData, roomData);
  section.innerHTML = '';
  openRooms.forEach(room => {
    section.innerHTML += `
    <div>
      <p>Room ${room.number}</p>
      <button data-room-id="${room.number}">Book Room</button>
    </div>
    `
  })
}

function showCustomerAvailableRooms() {
  event.preventDefault();
  const calendarDate = document.querySelector('.customer-display .booking-calendar');
  date = calendarDate.value;
  let formattedDate = moment(date).format("YYYY/MM/DD");
  const customerAvailableRooms = document.querySelector('.customer-available');
  displayAvailableRooms(formattedDate, bookings, rooms, customerAvailableRooms, currentCustomer);
  bindBookingButtons()
}

function displayCustomerAccount(userName) {
  removeLogin();
  currentCustomer = customers.find(customer => `customer${customer.id}` === userName);
  let userCosts = currentCustomer.provideTotalCosts(currentCustomer.id, bookings, rooms);
  userNameDisplay.innerText = `Howdy ${currentCustomer.provideFirstName()}`;
  displayBookedRooms();
  customerCost.innerText = `You have currently spent $${userCosts.toFixed(2)} here at the Overlook Hotel`;
  customerDisplay.classList.remove('hidden');
}

function userLogin(event) {
  event.preventDefault();
  let userName = usernameInput.value;
  let password = passwordInput.value;
  login(userName, password)
}

function login(userName, password) {
  if (userName === 'manager' && password === 'overlook2020') {
    displayManagerAccount();
  } else if (userName.includes('customer') && password === 'overlook2020') {
    displayCustomerAccount(userName);
  }
}

function bindBookingButtons() {
  let buttons = document.querySelectorAll('[data-room-id]');
  buttons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault()
      let roomToBook = event.target.getAttribute("data-room-id");
      let room = rooms.find(roomToFind => roomToFind.number == roomToBook);
      bookingData = {'userID': currentCustomer.id, 'date': moment(date).format("YYYY/MM/DD"), 'roomNumber': room.number}
      console.log(bookingData)
      apiCalls.addBookingData(bookingData);
    })
  })
}
