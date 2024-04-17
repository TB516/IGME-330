import { ApiError } from "./ApiError";
import { ApiUiData } from "./ApiUiData";
import { ApiShipsResponse } from "./ApiShipsResponse";
import { ApiMetadata } from "./ApiMetadata";

export interface ApiResponse {
    status : string,
    meta : ApiMetadata,
    data : ApiShipsResponse | ApiUiData,
    error : ApiError | undefined,
}