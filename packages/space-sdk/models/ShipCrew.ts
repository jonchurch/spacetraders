/**
 * SpaceTraders API
 * SpaceTraders is an open-universe game and learning platform that offers a set of HTTP endpoints to control a fleet of ships and explore a multiplayer universe.  The API is documented using [OpenAPI](https://github.com/SpaceTradersAPI/api-docs). You can send your first request right here in your browser to check the status of the game server.  ```json http {   \"method\": \"GET\",   \"url\": \"https://api.spacetraders.io/v2\", } ```  Unlike a traditional game, SpaceTraders does not have a first-party client or app to play the game. Instead, you can use the API to build your own client, write a script to automate your ships, or try an app built by the community.  We have a [Discord channel](https://discord.com/invite/jh6zurdWk5) where you can share your projects, ask questions, and get help from other players.   
 *
 * OpenAPI spec version: 2.0.0
 * Contact: joel@spacetraders.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { HttpFile } from '../http/http';

/**
* The ship's crew service and maintain the ship's systems and equipment.
*/
export class ShipCrew {
    /**
    * The current number of crew members on the ship.
    */
    'current': number;
    /**
    * The minimum number of crew members required to maintain the ship.
    */
    'required': number;
    /**
    * The maximum number of crew members the ship can support.
    */
    'capacity': number;
    /**
    * The rotation of crew shifts. A stricter shift improves the ship's performance. A more relaxed shift improves the crew's morale.
    */
    'rotation': ShipCrewRotationEnum;
    /**
    * A rough measure of the crew's morale. A higher morale means the crew is happier and more productive. A lower morale means the ship is more prone to accidents.
    */
    'morale': number;
    /**
    * The amount of credits per crew member paid per hour. Wages are paid when a ship docks at a civilized waypoint.
    */
    'wages': number;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "current",
            "baseName": "current",
            "type": "number",
            "format": ""
        },
        {
            "name": "required",
            "baseName": "required",
            "type": "number",
            "format": ""
        },
        {
            "name": "capacity",
            "baseName": "capacity",
            "type": "number",
            "format": ""
        },
        {
            "name": "rotation",
            "baseName": "rotation",
            "type": "ShipCrewRotationEnum",
            "format": ""
        },
        {
            "name": "morale",
            "baseName": "morale",
            "type": "number",
            "format": ""
        },
        {
            "name": "wages",
            "baseName": "wages",
            "type": "number",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return ShipCrew.attributeTypeMap;
    }

    public constructor() {
    }
}


export type ShipCrewRotationEnum = "STRICT" | "RELAXED" ;

