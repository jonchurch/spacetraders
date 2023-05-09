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

import { ShipEngine } from '../models/ShipEngine';
import { ShipFrame } from '../models/ShipFrame';
import { ShipModule } from '../models/ShipModule';
import { ShipMount } from '../models/ShipMount';
import { ShipReactor } from '../models/ShipReactor';
import { ShipType } from '../models/ShipType';
import { HttpFile } from '../http/http';

/**
* 
*/
export class ShipyardShip {
    'type'?: ShipType;
    'name': string;
    'description': string;
    'purchasePrice': number;
    'frame': ShipFrame;
    'reactor': ShipReactor;
    'engine': ShipEngine;
    'modules': Array<ShipModule>;
    'mounts': Array<ShipMount>;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "type",
            "baseName": "type",
            "type": "ShipType",
            "format": ""
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string",
            "format": ""
        },
        {
            "name": "description",
            "baseName": "description",
            "type": "string",
            "format": ""
        },
        {
            "name": "purchasePrice",
            "baseName": "purchasePrice",
            "type": "number",
            "format": ""
        },
        {
            "name": "frame",
            "baseName": "frame",
            "type": "ShipFrame",
            "format": ""
        },
        {
            "name": "reactor",
            "baseName": "reactor",
            "type": "ShipReactor",
            "format": ""
        },
        {
            "name": "engine",
            "baseName": "engine",
            "type": "ShipEngine",
            "format": ""
        },
        {
            "name": "modules",
            "baseName": "modules",
            "type": "Array<ShipModule>",
            "format": ""
        },
        {
            "name": "mounts",
            "baseName": "mounts",
            "type": "Array<ShipMount>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return ShipyardShip.attributeTypeMap;
    }

    public constructor() {
    }
}



