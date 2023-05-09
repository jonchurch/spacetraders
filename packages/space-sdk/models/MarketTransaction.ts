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

export class MarketTransaction {
    /**
    * The symbol of the waypoint where the transaction took place.
    */
    'waypointSymbol': string;
    /**
    * The symbol of the ship that made the transaction.
    */
    'shipSymbol': string;
    /**
    * The symbol of the trade good.
    */
    'tradeSymbol': string;
    /**
    * The type of transaction.
    */
    'type': MarketTransactionTypeEnum;
    /**
    * The number of units of the transaction.
    */
    'units': number;
    /**
    * The price per unit of the transaction.
    */
    'pricePerUnit': number;
    /**
    * The total price of the transaction.
    */
    'totalPrice': number;
    /**
    * The timestamp of the transaction.
    */
    'timestamp': Date;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "waypointSymbol",
            "baseName": "waypointSymbol",
            "type": "string",
            "format": ""
        },
        {
            "name": "shipSymbol",
            "baseName": "shipSymbol",
            "type": "string",
            "format": ""
        },
        {
            "name": "tradeSymbol",
            "baseName": "tradeSymbol",
            "type": "string",
            "format": ""
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "MarketTransactionTypeEnum",
            "format": ""
        },
        {
            "name": "units",
            "baseName": "units",
            "type": "number",
            "format": ""
        },
        {
            "name": "pricePerUnit",
            "baseName": "pricePerUnit",
            "type": "number",
            "format": ""
        },
        {
            "name": "totalPrice",
            "baseName": "totalPrice",
            "type": "number",
            "format": ""
        },
        {
            "name": "timestamp",
            "baseName": "timestamp",
            "type": "Date",
            "format": "date-time"
        }    ];

    static getAttributeTypeMap() {
        return MarketTransaction.attributeTypeMap;
    }

    public constructor() {
    }
}


export type MarketTransactionTypeEnum = "PURCHASE" | "SELL" ;

