import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './visualizer.js';

const DEFAULTS = Object.freeze({
    sound1  :  "media/New Adventure Theme.mp3"
});
const drawParams = {
  showGradient : true,
  showBars : true,
  showCircles : true,
  showNoise : false,
  showInvert: false,
  showEmboss : false,
}

const init = () => {
  audio.setupWebAudio(DEFAULTS.sound1);

	let canvasElement = document.querySelector("canvas"); // hookup <canvas> element

	setupUI(canvasElement);
  canvas.setupCanvas(canvasElement,audio.analyserNode);

  loop();
}

const setupUI = (canvasElement) => {
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#fsButton");
	
  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("goFullscreen() called");
    utils.goFullscreen(canvasElement);
  };

  // Hookup play button
  const playButton = document.querySelector("#playButton");
  playButton.onclick = e => {
    if (audio.audioCtx.state == "suspended") audio.audioCtx.resume();

    if (e.target.dataset.playing == "no"){
      audio.playCurrentSound();
      e.target.dataset.playing = "yes";
    }
    else {
      audio.pauseCurrentSound();
      e.target.dataset.playing = "no";
    }
  }

  // Hookup volume slider
  let volumeSlider = document.querySelector("#volumeSlider");
  let volumeLabel = document.querySelector("#volumeLabel");
  
  volumeSlider.oninput = e => {
    audio.setVolume(e.target.value);
    volumeLabel.innerHTML = Math.round(e.target.value/2 * 100);
  }

  volumeSlider.dispatchEvent(new Event("input"));

  let trackSelect = document.querySelector("#trackSelect");
  trackSelect.onchange = e => {
    audio.loadSoundFile(e.target.value);

    if (playButton.dataset.playing == "yes") playButton.dispatchEvent(new Event("click"));
  }

  //Hook up checkboxes
  document.querySelector("#gradientCB").onclick = () => { drawParams.showGradient = !drawParams.showGradient; }
  document.querySelector("#barsCB").onclick = () => { drawParams.showBars = !drawParams.showBars; }
  document.querySelector("#circlesCB").onclick = () => { drawParams.showCircles = !drawParams.showCircles; }
  document.querySelector("#noiseCB").onclick = () => { drawParams.showNoise = !drawParams.showNoise; }
  document.querySelector("#invertCB").onclick = () => { drawParams.showInvert = !drawParams.showInvert; }
  document.querySelector("#embossCB").onclick = () => { drawParams.showEmboss = !drawParams.showEmboss; }
}

const loop = () => {
  requestAnimationFrame(loop);
  canvas.draw(drawParams);
}

export {init};