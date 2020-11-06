import { expect } from 'chai';
import sampleBookingData from './sample-booking-data'
import Booking from '../src/Booking';

describe('Booking', () => {
  let  bookings, booking, date;

  beforeEach(() => {
    bookings = sampleBookingData;
    date = '2020/01/24';
    
    booking = new Booking(bookings[0])
  });

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of Manager', () => {
    expect(booking).to.be.an.instanceOf(Booking);
  });

  it('should have an id', () => {
    expect(booking.id).to.equal('5fwrgu4i7k55hl6t5');
  })

  it('should have a userID', () => {
    expect(booking.userID).to.equal(1);
  })

  it('should have a date', () => {
    expect(booking.date).to.equal('2020/01/24');
  })

  it('should have a room number', () => {
    expect(booking.roomNumber).to.equal(1);
  })

  it('should have an array of room service charges', () => {
    expect(booking.roomServiceCharges).to.deep.equal([]);
  })
});