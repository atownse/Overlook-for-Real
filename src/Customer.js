import User from './User'

class Customer extends User {
  constructor(id, name, date, bookings) {
    super(id, date, bookings);
    this.name = name;
    // this.bookings = [];
  }

  provideFirstName() {
    let firstName = this.name.split(' ');
    return firstName[0]
  }

  // bookRoom(booking) {
  //   this.bookings.push(booking);
  // }

  provideBookedRooms() {

  }

  provideTotalCosts() {

  }
}

export default Customer;