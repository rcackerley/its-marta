const axios = require("axios")
const { BASE_URL } = require("./client")
const { handleError } = require("./helpers")

function fetchTrains() {
  return axios.get(BASE_URL).catch(handleError)
}

exports.fetchTrains = fetchTrains
