import User from './User'

class Manager extends User {
  constructor(customers, rooms, id, date, bookings) {
    super(id, date, bookings);
    this.customers = customers;
    this.rooms = rooms;
  }

  // want to match current date to booking date, if dates match, provide list of rooms that are not taken
  provideAvailableRooms(date, bookingData, roomData) {
    let roomsTaken = bookingData.reduce((filledRooms, bookedRoom) => {
      if (bookedRoom.date === date) {
        filledRooms.push(bookedRoom.roomNumber)
      }
      return filledRooms
    }, []);

    let availableRooms = roomData.filter(room => {
      if (!roomsTaken.includes(room.number)) {
        return room
      }
    })
    return availableRooms.map(room => room.number);
  }

  // want to look at all booked rooms for specific date and return an accumulated total cost for all booked rooms on that day
  provideTotalRevenue(date, bookingData, roomData) {
    let roomsTaken = bookingData.reduce((filledRooms, bookedRoom) => {
      if (bookedRoom.date === date) {
        filledRooms.push(bookedRoom.roomNumber)
      }
      return filledRooms
    }, []);

    let roomTotals = roomData.reduce((total, room) => {
      if (roomsTaken.includes(room.number)) {
        total += room.costPerNight;
      }
      return total;
    }, 0)
    return `$${roomTotals}`;
  }

  calculatePercentOccupied(date) {

  }

  provideCustomerInfo(customer) {

  }

}

export default Manager;