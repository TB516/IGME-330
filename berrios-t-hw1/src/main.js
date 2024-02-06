import {getRandomNum} from "./utils.js"

const output = document.querySelector("#output");

let words1;
let words2;
let words3;

const babble = () => {
    return `${words1[Math.round(getRandomNum(0, words1.length - 1))]} ${words2[Math.round(getRandomNum(0, words2.length - 1))]} ${words3[Math.round(getRandomNum(0, words3.length - 1))]}`;
}

const generateTechno = (num) => {
    let techno = "";

    for (let i = 0; i < num; i++){
        techno += `<p class = "babble">${babble()}</p>`;
    }

    output.innerHTML = techno;
}

const loadBabble = () => {
    const xhr = new XMLHttpRequest();

    xhr.onload = babelLoaded;
    xhr.onerror = (e) => {output.innerHTML = `<h2>${e.target.status}</h2><p>An error occurred while loading the Babble Data</p>`};

    xhr.open("GET", "./data/babble-data.json");
    xhr.send();
}

const babelLoaded = (e) => {
    let json

    try{
        json = JSON.parse(e.target.responseText);
    }
    catch{
        output.innerHTML = `<h2>An error occurred while parsing the babble data!</h2>`;
        return
    }
    
    words1 = json["words1"];
    words2 = json["words2"];
    words3 = json["words3"];

    document.querySelector("#more-technobabble").addEventListener("click", () => {generateTechno(1)});
    document.querySelector("#five-tecnnobabble").addEventListener("click", () => {generateTechno(5)});

    generateTechno(1);
}

loadBabble();