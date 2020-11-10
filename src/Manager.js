import User from './User'

class Manager extends User {
  constructor(customers, rooms, id, date, bookings) {
    super(id, date, customers, bookings);
    this.rooms = rooms;
    this.currentCustomer = {};
  }

  // want to match current date to booking date, if dates match, provide list of rooms that are not taken
  provideAvailableRooms(date, bookingData, roomData) {
   let roomsTaken = this.determineOccupiedRooms(date, bookingData);

    let availableRooms = roomData.filter(room => {
      if (!roomsTaken.includes(room.number)) {
        return room
      }
    })
    return availableRooms.map(room => room.number);
  }

  // want to look at all booked rooms for specific date and return an accumulated total cost for all booked rooms on that day
  provideTotalRevenue(date, bookingData, roomData) {
    let roomsTaken = this.determineOccupiedRooms(date, bookingData);
    let roomTotals = roomData.reduce((total, room) => {
      if (roomsTaken.includes(room.number)) {
        total += room.costPerNight;
      }
      return total;
    }, 0)
    return `$${roomTotals.toFixed(2)}`;
  }

  // I want to look through the booked rooms for that date and determine out of all the rooms what percentage has been occupied
  calculatePercentOccupied(date, bookingData, roomData) {
    let roomsTaken = this.determineOccupiedRooms(date, bookingData);
    let percentOccupied = (roomsTaken.length / roomData.length) * 100;
    return `${percentOccupied.toFixed(1)}%`;
  }

  setCurrentCustomer(customer) {
    this.currentCustomer = customer;
  }

  provideCustomerInfo(customer) {
    this.setCurrentCustomer(customer);
    return this.bookings.filter(booking => booking.userID === this.currentCustomer.id);
  }

  compareDate(todayDate, dateInput) {
    if (todayDate > dateInput) {
      return false
    } else {
      return true
    }
  }

  // deleteBookingData(bookingData) {
  //   const deleteData = (path, data) => {
  //     return fetch(path, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(data)
  //     })
  //       .then(response => response.json())
  //       .catch(err => console.log(err))
  //   }
  //   deleteData('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', bookingData)
  // }

}

export default Manager;