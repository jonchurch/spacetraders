import { WaypointShipyard } from "@/components/Shipyard";

type ShipyardPageParams = {
	systemSymbol: string;
	waypointSymbol: string;
}

export default function ShipyardPage({params}: {params: ShipyardPageParams}) {
	return (
	<WaypointShipyard systemSymbol={params.systemSymbol} waypointSymbol={params.waypointSymbol}/>
	)
}
