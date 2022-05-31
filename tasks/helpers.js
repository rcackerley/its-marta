const fs = require("fs")

function logArrivalTimes(trains) {
  let stream = fs.createWriteStream("out.log", { flags: "a" })
  stream.write(JSON.stringify(trains))

  stream.on("error", function (err) {
    console.error(err)
  })
}

exports.logArrivalTimes = logArrivalTimes
