import { ApiMetadata } from "./api-interfaces/ApiMetadata";
import { Ship } from "./Ship";

export interface ShipSearchResults {
    ships : Ship[],
    metadata : ApiMetadata,
}