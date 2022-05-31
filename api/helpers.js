const TWO_MINUTES = 120

function handleError(error) {
  console.error(`${error.response?.status}: ${error.message}`)
  return error
}

function filterTrains(trains) {
  return trains.reduce((filteredTrains, train) => {
    if (train.WAITING_SECONDS < TWO_MINUTES) {
      filteredTrains.push(filterTrainProps(train))
    }
    return filteredTrains
  }, [])
}

function filterTrainProps({ TRAIN_ID, STATION, WAITING_SECONDS }) {
  return {
    trainId: TRAIN_ID,
    station: STATION,
    waitingSeconds: WAITING_SECONDS,
  }
}

exports.filterTrains = filterTrains
exports.handleError = handleError
