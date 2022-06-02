# It's Marta 🚊

## Goals ✅

- Poll the Marta realtime api for train arrivals at a minimum interval of 10 seconds
- Filter train properties and write data to a log file when trains are arriving within 120 seconds

## Why Start a New Project 🙋‍♂️

With a scenario of working to productionize a departed intern's project on a quick turnaround, I decided to rework the app in Node.js instead of sticking with the original Go implementation. As the new maintainer, I have no existing experience in Go and with a quick turnaround time, I decided to implement the solution in Node to spend my time wisely solving the problem, rather than spending my time learning a new language.

## Approach ⧟

I originally had a version written where I was using a cron job to schedule and queue jobs every 10 seconds, but I found myself wrestling with the library `node-cron` to make that interval time dynamic. Instead I decided to use Node's builtin `setTimeout` and recursively call with a calculated latency.

As any frequent marta rider knows, its' arrival times during the daytime hours are drastically different from its' night, weekend, and holiday hours. The approach to calculate latency looks for if there is zero arrival times within two minutes. If there are no trains coming within two minutes, the poller will wait to query. The wait time is calculated as the difference between the first arriving train's waiting seconds and 120.

## Setup

- Make sure to have Node installed. The project was created using version `v17.8.0`
- `git clone git@github.com:rcackerley/its-marta.git`
- `node app.js`
