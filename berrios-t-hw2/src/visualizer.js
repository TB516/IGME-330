import * as utils from './utils.js';
import { KirbySprite } from './classes/kirbySprite.js';

let ctx,canvasWidth,canvasHeight,analyserNode,audioData,gradient,kirby, averageData, maxRadius, spinAmount;


const setupCanvas = (canvasElement,analyserNodeRef, pColor) => {
	// create drawing context
	ctx = canvasElement.getContext("2d");
	canvasWidth = canvasElement.width = 2560;
	canvasHeight = canvasElement.height = 1440;

	// create a gradient that runs top to bottom
	gradient = utils.getLinearGradient(ctx,0,0,0,canvasHeight,[{percent : .1, color : pColor}, {percent : .9, color : "black"}]);
	kirby = new KirbySprite(canvasWidth/2, canvasHeight/2, canvasHeight/3, "#df6da9");
	averageData = 0;
	maxRadius = canvasHeight / 12;
	spinAmount = 0;

    // keep a reference to the analyser node
	analyserNode = analyserNodeRef;

	// this is the array where the analyser data will be stored
	audioData = new Uint8Array(analyserNode.fftSize/2);
}

const draw = (params={}) => {
	if (params.waveform){
		analyserNode.getByteTimeDomainData(audioData); //Waveform
	}
	else{
		analyserNode.getByteFrequencyData(audioData); //Frequency
	}

	if (params.spinKirby){
		spinAmount = params.speed;
	}
	else{
		spinAmount = 0;
	}

	for (let i = 0; i < audioData.length; i++){
		averageData += audioData[i];
	}
	averageData /= audioData.length;

	//Draw gradient
	ctx.save();
	ctx.fillStyle = gradient;
	ctx.globalAlpha = .3;
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	ctx.restore();


	kirby.update(1/60, spinAmount,(averageData/100) * maxRadius);
	kirby.draw(ctx);
	
	if (params.noise){
		let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
		let data = imageData.data;
		let length = data.length;

		for (let i = 0; i < length; i += 16){
			if (Math.random() < .05) {
				data[i] = data[i+1] = data[i+2] = 255; //White noise
			}
		}

		ctx.putImageData(imageData, 0, 0);
	}

	averageData = 0;
}

export {setupCanvas,draw};