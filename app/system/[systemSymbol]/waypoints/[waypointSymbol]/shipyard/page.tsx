import { WaypointShipyard } from "@/components/Shipyard";


export default function ShipyardPage({params}: {params: {shipyardSymbol: string; waypointSymbol: string;}}) {
	return (
	<WaypointShipyard systemSymbol={params.shipyardSymbol} waypointSymbol={params.waypointSymbol}/>
	)
}
