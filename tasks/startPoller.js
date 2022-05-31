const { fetchTrains } = require("../api")
const { filterTrains } = require("../api/helpers")
const { calculateLatency, logArrivalTimes } = require("./helpers")

function startPoller(milliseconds = 10000) {
  let preferredLatency = milliseconds

  var pollApi = function () {
    try {
      console.log(
        `Polling marta api at an interval of ${preferredLatency / 1000} seconds`
      )
      fetchTrains().then(({ data: trains }) => {
        preferredLatency = calculateLatency(trains)
        logArrivalTimes(filterTrains(trains))
        setTimeout(pollApi, preferredLatency)
      })
    } catch (error) {
      setTimeout(pollApi, preferredLatency)
    }
  }

  return setTimeout(pollApi, preferredLatency)
}

exports.startPoller = startPoller
