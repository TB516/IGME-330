import * as firebase from "./firebase.js"

const init = () => {
    const favoritesListElement = document.querySelector("#ol-favorites");

    const updateList = (snapshot) => {
        let html = "";

        console.log(snapshot)

        snapshot.forEach(park => {
            const parkData = park.val();

            html += `<li>${parkData.name} (${park.key}) - Likes: ${parkData.favorites}</li>`;
        });

        if (html == "") {
            html = "No Parks Found!";
        }

        favoritesListElement.innerHTML = html;
    }

    firebase.createListener(updateList);
}

init();