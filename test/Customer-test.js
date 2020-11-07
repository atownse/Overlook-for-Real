import { expect } from 'chai';
import sampleBookingData from './sample-booking-data'
import sampleRoomData from './sample-room-data'
import sampleUserData from './sample-user-data'
import Customer from '../src/Customer';

describe('Customer', () => {
  let customers, rooms, bookings, date, customer;

  beforeEach(() => {
    rooms = sampleRoomData;
    bookings = sampleBookingData;
    customers = sampleUserData;
    date = '2020/01/24';
    
    customer = new Customer(customers[0].id, date, bookings, customers[0].name);
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', () => {
    expect(customer).to.be.an.instanceOf(Customer);
  });

  it('should have a property of bookings', () => {
    expect(customer.bookings.length).to.be.equal(3);
  });

  it('should provide the customer\'s first name', () => {
    let firstName = customer.provideFirstName();

    expect(firstName).to.equal('Leatha');
  });

  it('should provide the booked rooms for that customer', () => {
    let customerBookings = customer.provideBookedRooms(bookings);
    expect(customerBookings).to.deep.equal([1, 5, 3]);
  });

  it('should be able to provide the total amount that user has spent at this hotel', () => {
    let totalSpent = customer.provideTotalCosts(customer.id, bookings, rooms);
    expect(totalSpent).to.equal(1189.71)
  });

});