const domUpdate = {
  fixManagerDisplay: (revenueElement, percentageElement, provideTotal, providePercent) => {
    revenueElement.innerText = `The hotel has earned ${provideTotal} for the day.`
    percentageElement.innerText = `The hotel is at ${providePercent} capacity today.`
  },
}

export default domUpdate