import * as main from "./main.js";

const Assets = {
	eyes : "eyes",
}

window.onload = ()=>{
	// 1 - do preload here - load fonts, images, additional sounds, etc...
	Assets.eyes = new Image();
	Assets.eyes.src = "./media/images/eyes.png";

	// 2 - start up app
	main.init();
}

export {Assets};