import axios from 'axios'

import { Configuration, SystemsApi } from 'spacetraders-api'

const configuration = new Configuration({
  accessToken: process.env.TOKEN
})

const instance = axios.create({})
const systems = new SystemsApi(configuration, undefined, instance)

export async function run() {
  try {

  const res = await systems.getSystem('spaga')
  console.log(res)
  } catch(err) {
    console.log(err)
  }
}
run()


