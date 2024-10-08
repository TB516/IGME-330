import * as utils from './utils.js';
import * as audio from './audio.js';

const DEFAULTS = Object.freeze({
    sound1  :  "media/New Adventure Theme.mp3"
});

const init = () => {
  audio.setupWebAudio(DEFAULTS.sound1);

	let canvasElement = document.querySelector("canvas"); // hookup <canvas> element

	setupUI(canvasElement);

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
}

function loop(){
  /* NOTE: This is temporary testing code that we will delete in Part II */
    requestAnimationFrame(loop);
    // 1) create a byte array (values of 0-255) to hold the audio data
    // normally, we do this once when the program starts up, NOT every frame
    let audioData = new Uint8Array(audio.analyserNode.fftSize/2);
    
    // 2) populate the array of audio data *by reference* (i.e. by its address)
    audio.analyserNode.getByteFrequencyData(audioData);
    
    // 3) log out the array and the average loudness (amplitude) of all of the frequency bins
      console.log(audioData);
      
      console.log("-----Audio Stats-----");
      let totalLoudness =  audioData.reduce((total,num) => total + num);
      let averageLoudness =  totalLoudness/(audio.analyserNode.fftSize/2);
      let minLoudness =  Math.min(...audioData); // ooh - the ES6 spread operator is handy!
      let maxLoudness =  Math.max(...audioData); // ditto!
      // Now look at loudness in a specific bin
      // 22050 kHz divided by 128 bins = 172.23 kHz per bin
      // the 12th element in array represents loudness at 2.067 kHz
      let loudnessAt2K = audioData[11]; 
      console.log(`averageLoudness = ${averageLoudness}`);
      console.log(`minLoudness = ${minLoudness}`);
      console.log(`maxLoudness = ${maxLoudness}`);
      console.log(`loudnessAt2K = ${loudnessAt2K}`);
      console.log("---------------------");
  }

export {init};