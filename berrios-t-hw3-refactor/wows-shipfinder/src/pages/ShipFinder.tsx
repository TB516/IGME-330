import { useEffect, useRef, useState } from "react";
import { Ship } from "../interfaces/Ship";
import { getShips, getUiData } from "../services/shipService";
import { SearchParams } from "../interfaces/SearchParams";
import { ShipSearchResults } from "../interfaces/ShipSearchResults";
import { UiData } from "../interfaces/UiData";

import "./ShipFinder.css";

const ShipFinder = () : JSX.Element => {
    const [ships, setShips] = useState([] as Ship[]);
    const [uiData, setUiData] = useState({shipNations : [], shipTypes : []} as UiData);
    const [atFirstPage, setAtFirstPage] = useState(true);
    const [atLastPage, setAtLastPage] = useState(true);
    const [loading, setLoading] = useState(true);
    const searchParams = useRef({page : 1, pageMax : 1, shipType : "", nation : ""} as SearchParams);

    useEffect(() => {
        getUiData().then((data : UiData) => {
            setUiData(data);
        });
    }, []);

    const search = () : void => {
        setLoading(true);

        getShips(searchParams.current).then((newShips : ShipSearchResults) => {
            setShips(newShips.ships);

            searchParams.current.page = newShips.metadata.page;
            searchParams.current.pageMax = newShips.metadata.page_total;
            
            setAtFirstPage(searchParams.current.page == 1);
            setAtLastPage(searchParams.current.page == searchParams.current.pageMax);

            setLoading(false);
        });
    }

    return (
        <>
            <main className="columns m-1">
                <nav className="column is-one-fifth sidebar">
                    <div className="field">
                        <label className="label">Ship Type</label>
                        <div className="control">
                            <div className="select">
                                <select id="select-type" defaultValue={""} onChange={(e) => {searchParams.current.shipType= e.target.value}}>
                                    <option value={""}>None</option>
                                    {
                                        uiData.shipTypes.map((type) => (
                                            <option key={type.key} value={type.key}>{type.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="field">
                        <label className="label">Ship Nation</label>
                        <div className="control">
                            <div className="select">
                                <select id="select-nation" defaultValue={""} onChange={(e) => {searchParams.current.nation = e.target.value}}>
                                    <option value="">None</option>
                                    {
                                        uiData.shipNations.map((nation) => (
                                            <option key={nation.key} value={nation.key}>{nation.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="field">
                        <button id="btn-search" className="control button is-link" onClick={() => {searchParams.current.page = 1; search();}}>Search</button>
                    </div>
                    
                    <nav className="pagination">
                        <ul className="pagination-list">
                            <li>
                                <button className="pagination-previous" disabled={loading || atFirstPage} onClick={() => {
                                    searchParams.current.page -= 1;
                                    search();
                                }}>Previous</button>
                            </li>
                            <li>
                                <div className="pagination-link is-current">{searchParams.current.page}</div>
                            </li>
                            <li>
                                <button className="pagination-next" disabled={loading || atLastPage} onClick={() => {
                                    searchParams.current.page += 1;
                                    search();
                                }}>Next page</button>
                            </li>
                        </ul>
                    </nav>
                </nav>
                
                <div id="ships" className="column has-text-centered">
                    {
                        ships.length ? 
                        (
                            ships.map((ship : Ship) => (
                                <div key={ship.id} className="card">
                                    <div className="card-image">
                                        <img src={ship.images.large}></img>
                                    </div>
                                    <div className="card-content">
                                        <div className="media">
                                            <div className="media-content">
                                                <p className="title is-4">{ship.name}</p>
                                                <p className="subtitle is-5">Tier {ship.tier} {ship.type} - {ship.nation.toUpperCase()}</p>
                                            </div>
                                        </div>
                                        <div className="content">
                                            <p>{ship.description}</p>
                                        </div>
                                    </div>                              
                                </div>
                            ))
                        ) 
                        : 
                        (
                            <div className="message is-info">
                                <p className="message-header">No Ships Found</p>
                                <p className="message-body">Enter filters or just click the search button to get some results!</p>
                            </div>
                        )
                    }   
                </div>
            </main>
        </>
    );
}

export default ShipFinder;