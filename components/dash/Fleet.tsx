import { getAllShips } from '@/api';
import { GetMyShips200Response, ShipNav, ShipNavStatus } from '@spacejunk/airlock';
import { useQuery } from '@tanstack/react-query';
import Countdown from 'react-countdown';

function ShipNavigation({ shipNav } : {shipNav: ShipNav}) {
  const { systemSymbol, waypointSymbol, route, status } = shipNav;

  // const departureTime = new Date(route.departureTime);
  const arrivalTime = new Date(route.arrival);

  const isTraveling = status === ShipNavStatus.InTransit

  const DestinationName = () => (
    <span
      className={`text-lg font-semibold transition-colors duration-300 ${
        isTraveling ? 'text-indigo-600' : 'text-gray-800'
      }`}
    >
      {route.destination.symbol}
    </span>
  );

  const CountdownRenderer = ({ hours, minutes, seconds, completed }: { hours: number, minutes: number, seconds: number, completed : boolean}) => {
    if (completed) {
      return <span>Arrived</span>;
    }
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  };
    console.log({isTraveling})
  return (
    <div className="space-y-2">
      <div>
        <span className="font-medium">System:</span> {systemSymbol}
      </div>
      <div>
        <span className="font-medium">Waypoint:</span> {waypointSymbol}
      </div>
      {isTraveling && (
        <div>
          <span className="font-medium">Arriving at </span>
          <DestinationName />
          <span className="font-medium"> in </span>
          <Countdown
            date={arrivalTime}
            renderer={CountdownRenderer}
            autoStart={true}
          />
        </div>
      )}
    </div>
  );
}

function ShipList({ ships }: {ships: GetMyShips200Response['data']}) {
  return (
    <div className="space-y-4">
      {ships.map((ship, index) => (
        <div
          key={index}
          className="p-4 dark:bg-slate-800 bg-white rounded-md shadow-md space-y-2"
        >
          <h3 className="text-xl font-semibold">{ship.symbol}</h3>
          <ShipNavigation shipNav={ship.nav} />
        </div>
      ))}
    </div>
  );
}

export function Fleet() {
  const {data: ships} = useQuery({queryKey: ['ships'], queryFn: getAllShips});
  // const [ships, setShips] = useState([]);

  // useEffect(() => {
  //   // Load the ship here from shipSchema
  //   // setShips([shipSchema]);
  // }, []);
    if (!ships) {
        return <p className="dark:text-slate-400">No Ships</p>
    }
  return (
    <div className="dark:bg-slate-700 bg-slate-200 p-5 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Your Fleet</h2>
      <ShipList ships={ships} />
    </div>
  );
}
