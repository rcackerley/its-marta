const { calculateLatency } = require("./helpers")

describe("calculateLatency", () => {
  describe("when the closest train is within 120 seconds", () => {
    it("returns 10000", () => {
      const trains = createMockData(30)
      expect(calculateLatency(trains)).toBe(10000)
    })
  })

  describe("when the closest train is greater than 120 seconds", () => {
    it("returns the difference between next arriving train and 120 seconds", () => {
      const trains = createMockData(140)
      expect(calculateLatency(trains)).toBe(20000)
    })

    it("returns 10000 when the difference is under 10 seconds", () => {
      const trains = createMockData(125)
      expect(calculateLatency(trains)).toBe(10000)
    })
  })
})

function createMockData(nextArrivalTime) {
  return [
    {
      WAITING_SECONDS: nextArrivalTime,
      STATION: "brookhaven",
      TRAIN_ID: 1,
    },
    {
      WAITING_SECONDS: 200,
      STATION: "chamblee",
      TRAIN_ID: 2,
    },
    {
      WAITING_SECONDS: 220,
      STATION: "brookhaven",
      TRAIN_ID: 3,
    },
  ]
}
