class User {
  constructor(id, date, bookings) {
    this.id = id || 'manager';
    if (id) {
      this.username = `customer${this.id}`
    } else {
      this.username = 'manager'
    }
    this.password = 'overlook2020';
    this.date = date;
    this.bookings = bookings || [];
  }

  bookRoom(booking) {
    this.bookings.push(booking);
  }
}

export default User;