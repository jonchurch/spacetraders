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

import { Cooldown } from '../models/Cooldown';
import { ShipCargo } from '../models/ShipCargo';
import { ShipRefine200ResponseDataProducedInner } from '../models/ShipRefine200ResponseDataProducedInner';
import { HttpFile } from '../http/http';

export class ShipRefine200ResponseData {
    'cargo': ShipCargo;
    'cooldown': Cooldown;
    'produced': Array<ShipRefine200ResponseDataProducedInner>;
    'consumed': Array<ShipRefine200ResponseDataProducedInner>;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "cargo",
            "baseName": "cargo",
            "type": "ShipCargo",
            "format": ""
        },
        {
            "name": "cooldown",
            "baseName": "cooldown",
            "type": "Cooldown",
            "format": ""
        },
        {
            "name": "produced",
            "baseName": "produced",
            "type": "Array<ShipRefine200ResponseDataProducedInner>",
            "format": ""
        },
        {
            "name": "consumed",
            "baseName": "consumed",
            "type": "Array<ShipRefine200ResponseDataProducedInner>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return ShipRefine200ResponseData.attributeTypeMap;
    }

    public constructor() {
    }
}

