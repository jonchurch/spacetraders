import axios from 'axios'
import { Configuration, Ship, System, SystemsApi } from 'spacetraders-api'
import RequestQueue from './axiosRequestQueue'
import env from './.env.js'

const instance = axios.create()
const configuration = new Configuration({
  // read token from environment variables
  accessToken: env.TOKEN
})

 // create rate limit queue
const rateLimitedAxiosQueue = new RequestQueue({
  maxRequestsPerSecond: 2,
  burstRequests: 10,
  burstTime: 10,
  instance
})

// pass axios instance with rate limit queue
const systems = new SystemsApi(configuration, undefined, rateLimitedAxiosQueue.getInstance())
// let currentSystem: System | null = null

async function run() {
  for (let i = 0; i < 20; i++) {
    console.log(`Running: ${i}`)
    systems.getSystem(env.HOME_SYSTEM)
      .then(res => {
        // const burst = res.headers['x-ratelimit-limit-burst']
        const remaining = res.headers['x-ratelimit-remaining']
        const reset = res.headers['x-ratelimit-reset']
        console.log(`${i}:${res.status}: Remaining:${remaining} reset:${Math.abs(new Date(reset).getTime() - new Date().getTime())}`)
    })
  }
}

run().catch(() => console.log("The loop threw"))
