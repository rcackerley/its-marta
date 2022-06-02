const fs = require("fs")

const TEN_SECONDS = 10000

function logArrivalTimes(trains) {
  let stream = fs.createWriteStream("out.log", { flags: "a" })
  stream.write(JSON.stringify(trains))

  stream.on("error", function (err) {
    console.error(err)
  })
}

function calculateLatency(trains) {
  let waits = trains
    .map((train) => parseInt(train.WAITING_SECONDS))
    .sort((a, b) => a - b)
  if (waits[0] > 120) return determineNextNeededPoll(waits[0])
  return TEN_SECONDS
}

function determineNextNeededPoll(closestTrainTime) {
  if (closestTrainTime - 120 < 10) return TEN_SECONDS
  return (closestTrainTime - 120) * 1000
}

exports.logArrivalTimes = logArrivalTimes
exports.calculateLatency = calculateLatency
