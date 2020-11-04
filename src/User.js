class User {
  constructor(id) {
    this.id = id || 'manager';
    if (id) {
      this.username = `customer${this.id}`
    } else {
      this.username = 'manager'
    }
    this.password = 'overlook2020';
    this.bookings = [];
  }

  bookRoom(booking) {
    this.bookings.push(booking);
  }
}

export default User;