const fs = require("fs")

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
  if (waits[0] > 120) return (waits[0] - 120) * 1000
  return 10000
}

exports.logArrivalTimes = logArrivalTimes
exports.calculateLatency = calculateLatency
