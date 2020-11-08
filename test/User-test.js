import { expect } from 'chai';
import sampleBookingData from './sample-booking-data';
import sampleUserData from './sample-user-data'
import User from '../src/User';

describe('User', () => {
  let manager, customer5, date, customers, bookings;

  beforeEach(() => {
    customers = sampleUserData;
    bookings = sampleBookingData;
    manager = new User('manager', date, customers, bookings);
    customer5 = new User(5, date, bookings);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(manager).to.be.an.instanceOf(User);
  });

  it('should deafault to manager if no id is provided', () => {
    expect(manager.id).to.equal('manager');
  });

  it('should have an id if a customer', () => {
    expect(customer5.id).to.equal(5);
  });

  it('should have a username if id is provided', () => {
    expect(customer5.username).to.equal('customer5');
  });

  it('should have a username of manager if no id is provided', () => {
    expect(manager.username).to.equal('manager');
  });

  it('should have a default password of overlook2020', () => {
    expect(manager.password).to.equal('overlook2020');
  });


})