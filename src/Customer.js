import User from './User'

class Customer extends User {
  constructor(id, name, date, bookings) {
    super(id, date, bookings);
    this.name = name;
    this.bookings = this.provideBookedRooms(bookings);
  }

  provideFirstName() {
    let firstName = this.name.split(' ');
    return firstName[0]
  }

  // bookRoom(booking) {
  //   this.bookings.push(booking);
  // }

  provideBookedRooms(bookingData) {
    return bookingData.filter(booking => {
      return booking.userID === this.id
    })
  }

  provideTotalCosts() {

  }
}

export default Customer;