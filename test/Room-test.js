import { expect } from 'chai';
import sampleRoomData from './sample-room-data'
import Room from '../src/Room';

describe('Room', () => {
  let  rooms, room;

  beforeEach(() => {
    rooms = sampleRoomData;
    
    room = new Room(rooms[0])
  });

  it('should be a function', () => {
    expect(Room).to.be.a('function');
  });

  it('should be an instance of Manager', () => {
    expect(room).to.be.an.instanceOf(Room);
  });

  it('should have a number', () => {
    expect(room.number).to.equal(1);
  });

  it('should have a type', () => {
    expect(room.roomType).to.equal('residential suite');
  });

  it('should have a boolean for bidet', () => {
    expect(room.bidet).to.equal(true);
  });

  it('should have a bed size', () => {
    expect(room.bedSize).to.equal('queen');
  });

  it('should have a number of beds in the room', () => {
    expect(room.numBeds).to.equal(1);
  });

  it('should have a cost per night', () => {
    expect(room.costPerNight).to.equal(358.4);
  });
});
