import {
  Configuration,
  ContractsApi,
  FleetApi,
  ShipCargoItem,
  Survey,
  SystemsApi,
} from "@spacejunk/airlock";

export const config = new Configuration({
  accessToken: process.env.TOKEN,
});

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
  const res = await fleet.getShipCooldown(shipSymbol);
  if (res) {
    return res.data;
  }
  return false;
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

export const getSystemAndWaypoints = async (systemSymbol: string) => {
  const systems = new SystemsApi(config);
  try {
    const { data: systemData } = await systems.getSystem(systemSymbol);
    const { data: waypointData } = await systems.getSystemWaypoints(
      systemSymbol
    );
    return { systemData, waypointData };
  } catch (err) {
    console.log(err);
  }
};

export const getShipyard = async ({
  systemSymbol,
  waypointSymbol,
}: {
  systemSymbol: string;
  waypointSymbol: string;
}) => {
  const systems = new SystemsApi(config);
  try {
    const { data } = await systems.getShipyard(systemSymbol, waypointSymbol);
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const acceptContract = async (contractId: string) => {
  const contractApi = new ContractsApi(config);
  try {
    const { data } = await contractApi.acceptContract(contractId);
    return data;
  } catch (err) {
    console.log(err);
  }
};
