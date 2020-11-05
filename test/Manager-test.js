import { expect } from 'chai';
import sampleBookingData from './sample-booking-data'
import sampleRoomData from './sample-room-data'
import sampleUserData from './sample-user-data'
import Manager from '../src/Manager';

describe.only('Manager', () => {
  let customers, rooms, bookings, date, manager;

  beforeEach(() => {
    rooms = sampleRoomData;
    bookings = sampleBookingData;
    customers = sampleUserData;
    date = '2020/01/24';
    
    manager = new Manager(customers, rooms, 'manager', date, bookings);
  });

  it('should be a function', () => {
    expect(Manager).to.be.a('function');
  });

  it('should be an instance of Manager', () => {
    expect(manager).to.be.an.instanceOf(Manager);
  });

  it('should have a property of bookings', () => {
    expect(manager.bookings.length).to.be.equal(5);
  });

  it('should provide available rooms for the date given', () => {
    let availableRooms = manager.provideAvailableRooms(date, bookings, rooms);

    expect(availableRooms).to.deep.equal([sampleRoomData[2].number, sampleRoomData[4].number])
  });

  it('should provide the total revenue for the date', () => {
    let totalRevenue = manager.provideTotalRevenue(date, bookings, rooms);

    expect(totalRevenue).to.equal('$1265.22');
  })
});