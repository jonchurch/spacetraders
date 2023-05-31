import axios from 'axios'

import { Configuration, SystemsApi, FleetApi} from 'spacetraders-api'

const configuration = new Configuration({
  accessToken: process.env.TOKEN
})

const instance = axios.create({})
const systems = new SystemsApi(configuration, undefined, instance);
const fleet = new FleetApi(configuration, undefined, instance)

export async function run() {
  try {

  // const res = await systems.getSystem('spaga')
    const res = await fleet.getShipCooldown('SPACEJUNK-1')
  console.log('AXIOS RES:', res)
  } catch(err) {
    console.log(err)
  }
}
// run()


