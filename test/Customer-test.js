import { expect } from 'chai';
import Customer from '../src/Customer';

describe('Customer', () => {
  let customer5, booking1, booking2;

  beforeEach(() => {
    customer5 = new Customer(5, 'Johnny Appleseed');
    booking1 = {
      "id": "5fwrgu4i7k55hl6to",
      "userID": 5,
      "date": "2020/02/22",
      "roomNumber": 13,
      "roomServiceCharges":[ ]
    }
    booking2 = {
      "id": "5fwrgu4i7k55hl6tw",
      "userID": 5,
      "date": "2020/04/01",
      "roomNumber": 12,
      "roomServiceCharges": []
    }
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(customer5).to.be.an.instanceOf(Customer);
  });

  it('should have a name', () => {
    expect(customer5.name).to.equal('Johnny Appleseed');
  });

  it('should have an empty array of bookings initially', () => {
    expect(customer5.bookings).to.deep.equal([]);
  });

  it('should be able to provide the first name of the customer only', () => {
    let firstName = customer5.provideFirstName();

    expect(firstName).to.equal('Johnny');
  });

  it('should be able to book a room and save it to bookings', () => {
    customer5.bookRoom(booking1);
    customer5.bookRoom(booking2);

    expect(customer5.bookings).to.deep.equal([booking1, booking2]);
  })
})