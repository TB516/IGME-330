import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, set, increment, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDmJstNuJNTfV-zdNFCWASof-Urn1ycu2s",
    authDomain: "nys-park-buddy-330.firebaseapp.com",
    databaseURL: "https://nys-park-buddy-330-default-rtdb.firebaseio.com",
    projectId: "nys-park-buddy-330",
    storageBucket: "nys-park-buddy-330.appspot.com",
    messagingSenderId: "636746526335",
    appId: "1:636746526335:web:f4c5f0ba061f117139594a"
};

let app = initializeApp(firebaseConfig);
let db = getDatabase();


const addFavorite = (parkId, parkName) => {
    const parkRef = ref(db, `favorites/${parkId}`);
    set(parkRef, { name: parkName, favorites: increment(1) });
}
const removeFavorite = (parkId) => {
    const parkRef = ref(db, `favorites/${parkId}/favorites`);
    set(parkRef, increment(-1));
}
const createListener = (callback) => {
    onValue(ref(db, `favorites`), callback);
}

export { addFavorite, removeFavorite, createListener }