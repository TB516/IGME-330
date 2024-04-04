import * as map from "./map.js";
import * as ajax from "./ajax.js";

let poi;

const setupUI = () => {
    const lnglatRIT = [-77.67454147338866, 43.08484339838443];
    const lnglatIGM = [-77.67990589141846, 43.08447511795301];

    document.querySelector("#btn-focus-rit").onclick = () => {
        map.setZoomLevel(15.5);
        map.setPitchAndBearing(0, 0);
        map.flyTo(lnglatRIT);
    }
    document.querySelector("#btn-isometric-view").onclick = () => {
        map.setZoomLevel(15.5);
        map.setPitchAndBearing(45, 0);
        map.flyTo(lnglatRIT);
    }
    document.querySelector("#btn-focus-world").onclick = () => {
        map.setZoomLevel();
        map.setPitchAndBearing();
        map.flyTo();
    }
    document.querySelector("#btn-focus-igme").onclick = () => {
        map.setZoomLevel(18);
        map.setPitchAndBearing(0, 0);
        map.flyTo(lnglatIGM);
    }
    document.querySelector("#btn-load-markers").onclick = () => {
        if (!poi){
            loadPOI();
        }
    }
}

const loadPOI = () => {
    const url = "https://people.rit.edu/~acjvks/shared/330/igm-points-of-interest.php";

    const callback = (json) => {
        poi = json;

        for (let p of poi){
            map.addMarker(p.coordinates, p.title, "A POI!", "marker poi");
        }
    };

    ajax.downloadFile(url, callback);
}

export const init = () => {
    setupUI();

    map.initMap();
    map.loadMarkers();
    map.addMarkersToMap();
}