import { ApiResponse } from "../interfaces/api-interfaces/ApiResponse";
import { Ship } from "../interfaces/Ship";
import { SearchParams } from "../interfaces/SearchParams";
import { fetchData } from "../utils/fetch";
import { ApiShipsResponse } from "../interfaces/api-interfaces/ApiShipsResponse";
import { ShipSearchResults } from "../interfaces/ShipSearchResults";
import { ApiUiData } from "../interfaces/api-interfaces/ApiUiData";
import { UiData } from "../interfaces/UiData";
import { EncyclopediaEntry } from "../interfaces/EncyclopediaEntry";

const shipsUrl : string = "https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id=3d7de89f74fffaa6db9329d2bb351f63&fields=ship_id%2C+description%2C+images%2C+nation%2C+tier%2C+type%2C+name";
const uiUrl : string = "https://api.worldofwarships.com/wows/encyclopedia/info/?application_id=3d7de89f74fffaa6db9329d2bb351f63&fields=ship_nations%2C+ship_types";

const getShips = async (params : SearchParams) : Promise<ShipSearchResults> => {
    let searchUrl : string = shipsUrl;

    searchUrl += `&nation=${params.nation}`;
    searchUrl += `&type=${params.shipType}`;
    searchUrl += `&page_no=${params.page}`;

    const response : ApiResponse = (await fetchData(searchUrl)) as ApiResponse;

    if (response.status != "ok") {
        console.log(response.error?.code + ":" + response.error?.message);
        return { ships : [], metadata : response.meta } as ShipSearchResults;
    }

    return {
        ships : formatShips(response.data as ApiShipsResponse),
        metadata : response.meta,
    } as ShipSearchResults;
}

const getUiData = async () : Promise<UiData> => {
    const response : ApiResponse = (await fetchData(uiUrl)) as ApiResponse;

    if (response.status != "ok") {
        console.log(response.error?.code + ":" + response.error?.message);
        return { shipNations : [], shipTypes : [] } as UiData;
    }

    return formatUiData(response.data as ApiUiData);
}

const formatShips = (shipData : ApiShipsResponse) : Ship[] => {
    const ships : Ship[] = [];

    for (const shipId in shipData) {
        const ship : Ship = shipData[shipId];
        ship.id = Number.parseInt(shipId);

        ships.push(ship);
    }

    return ships;
}

const formatUiData = (response : ApiUiData) : UiData => {
    const uiData : UiData = {shipTypes : [], shipNations : []} as UiData;

    for (const shipType in response.ship_types) {
        uiData.shipTypes.push({key : shipType, name : response.ship_types[shipType]} as EncyclopediaEntry);
    }

    for (const nation in response.ship_nations) {
        console.log()
        uiData.shipNations.push({key : nation, name : response.ship_nations[nation]} as EncyclopediaEntry);
    }

    return uiData;
}

export {getShips, getUiData};