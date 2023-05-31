import {
  AgentsApi,
  Configuration,
  ContractsApi,
  FleetApi,
  GetShipyardRequest,
  PurchaseShipRequest,
  ShipCargoItem,
  Survey,
  SystemsApi,
} from "@spacejunk/airlock";

export const config = new Configuration({
  accessToken: process.env.TOKEN,
});
export const badRequest = async () => {
  const fleet = new FleetApi(config);
  const res = await fleet.getShipCooldown('asdfasdfasa');
  if (res) {
    return res.data;
  }
  return undefined
};

export const getAgent = async () => {
  const agent = new AgentsApi(config)
  const { data } = await agent.getMyAgent()
  return data
}

export const purchaseShip = async ({shipType, waypointSymbol}: PurchaseShipRequest) => {
  const fleet = new FleetApi(config);
  const { data } = await fleet.purchaseShip({
    shipType,
    waypointSymbol
  })
  return data
}

export const getShips = async () => {
  const fleet = new FleetApi(config);
  try {
    const { data } = await fleet.getMyShips();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const orbitShip = async (shipSymbol: string) => {
  const fleet = new FleetApi(config);
  try {
    const { data } = await fleet.orbitShip(shipSymbol);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const dockShip = async (shipSymbol: string) => {
  const fleet = new FleetApi(config);
  const { data } = await fleet.dockShip(shipSymbol);
  return data;
};
export const navigateShip = async ({
  shipSymbol,
  waypointSymbol,
}: {
  shipSymbol: string;
  waypointSymbol: string;
}) => {
  const fleet = new FleetApi(config);
  const { data } = await fleet.navigateShip(shipSymbol, { waypointSymbol });
  return data;
};

export const extractResources = async ({
  shipSymbol,
  survey,
}: {
  shipSymbol: string;
  survey?: Survey;
}) => {
  const fleet = new FleetApi(config);
  const { data } = await fleet.extractResources(shipSymbol, { survey });
  return data;
};

export const refuelShip = async (shipSymbol: string) => {
  const fleet = new FleetApi(config);
  const { data } = await fleet.refuelShip(shipSymbol);
  return data;
};

export const getShipCooldown = async (shipSymbol: string) => {
  const fleet = new FleetApi(config);
  console.log("SANITY")
  const res = await fleet.getShipCooldown(shipSymbol);
  console.log('=================cooldown res:', res)
  if (res) {
    return res.data;
  }
  return undefined
};

export const sellCargo = async ({
  shipSymbol,
  cargoSymbol,
  units,
}: {
  shipSymbol: string;
  cargoSymbol: string;
  units: number;
}) => {
  const fleet = new FleetApi(config);
  const { data } = await fleet.sellCargo(shipSymbol, {
    symbol: cargoSymbol,
    units,
  });
  return data;
};

export const sellAllCargo = async ({
  shipSymbol,
  inventory,
}: {
  shipSymbol: string;
  inventory: ShipCargoItem[];
}) => {
  let data = [];
  for (const inv of inventory) {
    try {
      const res = await sellCargo({
        shipSymbol,
        cargoSymbol: inv.symbol,
        units: inv.units,
      });
      data.push(res);
    } catch (err) {
      data.push(err);
    }
  }
  return data;
};

export const getSystemWaypoints = async (systemSymbol: string) => {
  const systems = new SystemsApi(config);
  const { data } = await systems.getSystemWaypoints(systemSymbol);
  return data;
};
export const getWaypoint = async (waypointSymbol: string) => {
  const systems = new SystemsApi(config);
  const [sector, system] = waypointSymbol.split('-')
  const systemSymbol = [sector, system].join('-')
  const { data } = await systems.getWaypoint(systemSymbol, waypointSymbol);
  return data;
};

export const getShipyard = async ({
  systemSymbol,
  waypointSymbol,
}: GetShipyardRequest) => {
  const systems = new SystemsApi(config);
  const { data } = await systems.getShipyard(systemSymbol, waypointSymbol);
  return data;

};
export const getContracts = async () => {
  const contracts = new ContractsApi(config);
  const { data } = await contracts.getContracts()
  return data
}
export const acceptContract = async (contractId: string) => {
  const contractApi = new ContractsApi(config);
  try {
    const { data } = await contractApi.acceptContract(contractId);
    return data;
  } catch (err) {
    console.log(err);
  }
};
