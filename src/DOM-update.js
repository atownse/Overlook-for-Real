const domUpdate = {
  fixManagerDisplay: (revenueElement, percentageElement, provideTotal, providePercent) => {
    revenueElement.innerText = `The hotel has earned ${provideTotal} for the day.`
    percentageElement.innerText = `The hotel is at ${providePercent} capacity today.`
  },

  createAvailableRooms: (element, roomNumber) => {
    element.innerHTML += `
    <div>
      <p>Room ${roomNumber}</p>
      <button data-room-id="${roomNumber}">Book Room</button>
    </div>
    `
  },

  createBookedRooms: (element, roomNumber, date) => {
    element.innerHTML += `
    <section id="booked-rooms">
      <p>You booked Room ${roomNumber} on ${date}</p>
    </section>  
  `
  }
}

export default domUpdate