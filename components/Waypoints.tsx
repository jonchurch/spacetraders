import React, { FC } from 'react';
import { Waypoint } from '@spacejunk/airlock'
import { SingleWaypoint } from './SingleWaypoint';

interface WaypointsProps {
  waypointsData: Waypoint[];
}

export const Waypoints: FC<WaypointsProps> = ({ waypointsData }) => {
  return (
    <div className="rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">Waypoints</h2>
      <div className="container flex flex-wrap">
      {waypointsData.map((waypoint, index) => <SingleWaypoint key={index} waypoint={waypoint} />)}
      </div>
    </div>
  );
};

