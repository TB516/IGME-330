export interface Ship {
    id : number,
    description : string,
    images : {
        small : string,
        large : string,
        medium : string,
        contour : string,
    },
    nation : string,
    tier : number,
    type : string,
    name : string,
}