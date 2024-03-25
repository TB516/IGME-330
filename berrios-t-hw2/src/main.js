import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './visualizer.js';

const drawParams = {
  waveform : true,
  spinKirby : false,
  speed : .1,
  noise : false,
}

const init = async () => {
	let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
  let response = await fetch("./data/av-data.json");
  let data = await response.json();

  document.title = data["title"];
  document.querySelector("#select-track").innerHTML = data["fileNames"].map(o => `<option value=\"${o['path']}\">${o['name']}</option>`).join("");
  audio.setupWebAudio(data["fileNames"][0]["path"]);

	setupUI();
  canvas.setupCanvas(canvasElement,audio.analyserNode, data["gradientColor"]);

  loop();
}

const setupUI = () => {
  // Hookup play button
  const playButton = document.querySelector("#btn-play");
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
  let volumeSlider = document.querySelector("#slider-volume");
  let volumeLabel = document.querySelector("#volume-label");
  
  volumeSlider.oninput = e => {
    audio.setVolume(e.target.value);
    volumeLabel.innerHTML = Math.round(e.target.value/2 * 100);
  }

  volumeSlider.dispatchEvent(new Event("input"));

  let trackSelect = document.querySelector("#select-track");
  trackSelect.onchange = e => {
    audio.loadSoundFile(e.target.value);

    if (playButton.dataset.playing == "yes") playButton.dispatchEvent(new Event("click"));
  }

  //Hookup settings
  const soundSettings = document.querySelector("#sound-settings");
  const mainElement = document.querySelector("main");
  const spinSpeedLabel = document.querySelector("#spin-speed-label");

  document.querySelector("#btn-sound-settings").onclick = (e) => {
    soundSettings.dataset.open = "true";
    mainElement.dataset.blur = "true";
  }

  document.querySelector("#btn-apply-settings").onclick = (e) => { 
    soundSettings.dataset.open = "false";
    mainElement.dataset.blur = "false";
  }
  
  document.querySelector("#cb-bass").onchange = (e) => {
    audio.useBassBoost(e.target.checked);
  }
  document.querySelector("#cb-treble").onchange = (e) => {
    audio.useTrebleBoost(e.target.checked);
  }

  document.querySelector("#cb-use-frequency").onclick = (e) => {
    drawParams.waveform = !drawParams.waveform;
  }
  document.querySelector("#cb-spin-kirby").onclick = (e) => {
    drawParams.spinKirby = !drawParams.spinKirby;
  }
  document.querySelector("#slider-spin-speed").oninput = (e) => {
    drawParams.speed = e.target.value;
    spinSpeedLabel.innerHTML = Math.round(e.target.value * 100);
  }
  document.querySelector("#cb-noise").onclick = (e) => {
    drawParams.noise = !drawParams.noise;
  }
}

const loop = () => {
  setTimeout(loop,1/60);
  canvas.draw(drawParams);
}

export {init};