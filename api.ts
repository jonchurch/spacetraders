import { ContractsApi, FleetApi, Ship, SystemsApi, createConfiguration } from './packages/space-sdk'

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

export const orbitShip = async (shipSymbol: string) => {
  const fleet = new FleetApi(config)
  try {
    const {data} = await fleet.orbitShip(shipSymbol)
    return data
  } catch(err) {
    console.log(err)
  }
}

export const dockShip = async (shipSymbol: string) => {
  const fleet = new FleetApi(config)
  const { data } = await fleet.dockShip(shipSymbol)
  return data
}
export const navigateShip = async ({shipSymbol, waypointSymbol}: {shipSymbol: string; waypointSymbol: string}) => {
  const fleet = new FleetApi(config)
  const { data } = await fleet.navigateShip(shipSymbol, {waypointSymbol})
  return data
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
export const acceptContract = async(contractId: string)=> {
  const contractApi = new ContractsApi(config)
  try {
    const {data} = await contractApi.acceptContract(contractId)
    return data
  } catch(err) {
    console.log(err)
  }
}
