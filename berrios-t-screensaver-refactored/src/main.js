import {getRandomInt, getRandomColor} from "./utils.js"
import {drawRectangle, drawArc, drawLine} from "./canvas-utils.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const rectMaxSize = 100;

let paused = true;
let createRectangles = true;
let createArcs = true;
let createLines = true;

const drawRandomRect = () => {
    drawRectangle(
        ctx,
        getRandomInt(0, canvas.width),
        getRandomInt(0, canvas.height),
        getRandomInt(10, rectMaxSize),
        getRandomInt(10, rectMaxSize),
        getRandomColor(),
        getRandomInt(2, 12),
        getRandomColor());
}

const drawRandomArc = () => {
    drawArc(
        ctx,
        getRandomInt(0, canvas.width),
        getRandomInt(0, canvas.height),
        getRandomInt(10, rectMaxSize),
        getRandomColor(),
        getRandomInt(2, 12),
        getRandomColor());
}

const drawRandomLine = () => {
    drawLine(
        ctx,
        getRandomInt(0, canvas.width),
        getRandomInt(0, canvas.height),
        getRandomInt(0, canvas.width),
        getRandomInt(0, canvas.height),
        getRandomInt(2, 12),
        getRandomColor());
}

const canvasClicked = (e) => {
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;

    for (let i = 0; i < 10; i++){
        drawArc(ctx, getRandomInt(-100, 100) + mouseX, getRandomInt(-100, 100) + mouseY, getRandomInt(20, 50), getRandomColor(), getRandomInt(2, 12), getRandomColor());
    }
}

const setupUI = () => {
    document.querySelector("#btn-play").onclick = () => { if (paused) { paused = false; update(); } };
    document.querySelector("#btn-pause").onclick = () => { paused = true };
    document.querySelector("#btn-clear").onclick = () => {ctx.clearRect(0, 0, canvas.width, canvas.height)};
    document.querySelector("#cb-rectangles").onclick = () => { createRectangles = !createRectangles };
    document.querySelector("#cb-arcs").onclick = () => { createArcs = !createArcs };
    document.querySelector("#cb-lines").onclick = () => { createLines = !createLines };
    canvas.onclick = canvasClicked;
}

const update = () => {
    if (paused) return;

    if (createRectangles) drawRandomRect();
    if (createArcs) drawRandomArc();
    if (createLines) drawRandomLine();

    window.requestAnimationFrame(update);
}

drawRectangle(ctx, 20, 20, 600, 440, "red");

setupUI();
update();