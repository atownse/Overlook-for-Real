import User from './User'

class Manager extends User {
  constructor(customers, rooms, id, date, bookings) {
    super(id, date, customers, bookings);
    this.rooms = rooms;
    this.currentCustomer = {};
  }

  provideAvailableRooms(date, bookingData, roomData) {
   let roomsTaken = this.determineOccupiedRooms(date, bookingData);

    let availableRooms = roomData.filter(room => {
      if (!roomsTaken.includes(room.number)) {
        return room
      }
    })
    return availableRooms.map(room => room.number);
  }

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
}

export default Manager;