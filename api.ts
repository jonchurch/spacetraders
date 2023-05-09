import { FleetApi, SystemsApi, createConfiguration } from './packages/space-sdk'

export const config = createConfiguration({
  authMethods: {
    AgentToken:  {
      tokenProvider: {
        getToken() {
            return process.env.TOASTY ?? 'NO_API_TOKEN_PROVIDED'
        },
      }
    }
  }
})

export const getShips = async () => {
  const fleet = new FleetApi(config)
  try {
    const { data } = await fleet.getMyShips()
    return data
  } catch (error) {
    console.error(error);
  }
}

export const getSystemAndWaypoints = async (systemSymbol: string) => {
  const systems = new SystemsApi(config)
  try {
    const { data: systemData } = await systems.getSystem(systemSymbol)
    const { data: waypointData } = await systems.getSystemWaypoints(systemSymbol)
    return {systemData, waypointData}
  } catch (err) {
    console.log(err)
  }
}

export const getShipyard = async({systemSymbol, waypointSymbol}: {systemSymbol: string, waypointSymbol: string}) => {
  const systems = new SystemsApi(config)
  try {
    const {data} = await systems.getShipyard(systemSymbol, waypointSymbol)
    return data
  } catch(err) {
    console.log(err)
  }
}
