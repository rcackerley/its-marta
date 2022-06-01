const { fetchTrains } = require("../api")
const { filterTrains } = require("../api/helpers")
const { calculateLatency, logArrivalTimes } = require("./helpers")

function startPoller(milliseconds = 10000) {
  let preferredLatency = milliseconds

  var pollApi = function () {
    console.log(
      `Polling marta api at an interval of ${preferredLatency / 1000} seconds`
    )
    fetchTrains()
      .then(({ data: trains }) => {
        preferredLatency = calculateLatency(trains)
        logArrivalTimes(filterTrains(trains))
        setTimeout(pollApi, preferredLatency)
      })
      .catch((error) => {
        console.error(error)
        restartPoller(pollApi, preferredLatency)
      })
  }

  return setTimeout(pollApi, preferredLatency)
}

function restartPoller(pollApi, preferredLatency) {
  console.log(`Retrying failed job`)
  setTimeout(pollApi, preferredLatency)
}

exports.startPoller = startPoller
