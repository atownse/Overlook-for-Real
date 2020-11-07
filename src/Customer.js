import User from './User'

class Customer extends User {
  constructor(id, date, bookings, name) {
    super(id, date, bookings);
    this.name = name;
    this.bookings = this.provideBookedRooms(bookings);
  }

  provideFirstName() {
    let firstName = this.name.split(' ');
    return firstName[0]
  }

  provideBookedRooms(bookingData) {
    let bookedRooms =  bookingData.filter(booking => {
      return booking.userID === this.id
    });
    return bookedRooms.map(room => {
      return room.roomNumber
    });
    // return bookingData.filter(booking => {
    //   return booking.userID === this.id
    // });
  }

  provideTotalCosts(id, bookingData, roomData) {
    return bookingData.reduce((totalSpent, booking) => {
      roomData.forEach(room => {
        if (id === booking.userID && room.number === booking.roomNumber) {
          totalSpent += room.costPerNight;
        }
      });
      return totalSpent;
    }, 0)
  }
}

export default Customer;