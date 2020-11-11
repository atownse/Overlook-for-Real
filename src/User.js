class User {
  constructor(id, date, customers, bookings) {
    this.id = id || 'manager';
    if (id === 'manager') {
      this.username = 'manager'
    } else {
      this.username = `customer${this.id}`
    }
    this.password = 'overlook2020';
    this.date = date;
    this.customers = customers;
    this.bookings = bookings || [];
    this.sorryMessage = `Yo, blame covid for the room shortage`
  }

  createDate(date) {
    let currentDate = new Date(date);
    return currentDate.toLocaleDateString();
  }

  determineOccupiedRooms(date, bookingData) {
    let roomsTaken = bookingData.reduce((filledRooms, bookedRoom) => {
      if (bookedRoom.date === date) {
        filledRooms.push(bookedRoom.roomNumber)
      }
      return filledRooms
    }, []);
    return roomsTaken;
  }

  showAvailableRooms(date, bookingData, roomData) {
    let takenRooms = this.determineOccupiedRooms(date, bookingData);
    let openRooms = roomData.reduce((vacantRooms, room) => {
      if (!takenRooms.includes(room.number)) {
        vacantRooms.push(room);
      }
      return vacantRooms;
    }, [])
    return openRooms;
  }
}

export default User;