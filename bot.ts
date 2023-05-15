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
  }
}

run().catch(() => console.log("The loop threw"))
