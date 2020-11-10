const domUpdate = {
  fixManagerDisplay: (revenueElement, percentageElement, provideTotal, providePercent) => {
    revenueElement.innerText = `The hotel has earned ${provideTotal} for the day.`
    percentageElement.innerText = `The hotel is at ${providePercent} capacity today.`
  },

  createAvailableRooms: (element, roomData) => {
    let type = roomData.roomType
    let bedNumber = roomData.numBeds
    let bedType = roomData.bedSize
    let cost = roomData.costPerNight
    let roomNumber = roomData.number
    element.innerHTML += `
    <section class="room-container">
      <div>
        <img class="room-image" src="../images/hotel-2.jpg">
        <button data-room-id="${roomNumber}">Book Room ${roomNumber}</button>
      </div>
      <p class="room-description">Room ${roomNumber} is a ${type} with ${bedNumber} ${bedType} and costs $${cost} per night</P
    </section>
    `
  },

  createBookedRooms: (element, roomNumber, date) => {
    element.innerHTML += `
      <section id="booked-rooms">
        <p>You booked Room ${roomNumber} on ${date}</p>
      </section>  
  `
  },

  showBookedRooms: (element, roomNumber) => {
    element.innerHTML += `
      <section id="occupied-rooms">
        <p>Room ${roomNumber} is occupied</p>
        <button delete-button-id="${roomNumber}">Remove Booking</button>
      </section>
    `
  },

  displayFilteredRoomsByType: (element, roomNumber, event) => {
    element.innerHTML += `
      <article class="filtered-rooms">Room ${roomNumber} is a ${event}</article>
    `
  }
}

export default domUpdate