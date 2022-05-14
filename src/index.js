import Phaser from "phaser";
import BeginningCutScene from "./scenes/BeginningCutscene";
import Level1 from "./scenes/Level1";

const config = {
	type: Phaser.AUTO,
	parent: "phaser-example",
	width: 854,
	height: 480,
	scene: [Level1],
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 300 },
			debug: false,
		},
	},
};

const game = new Phaser.Game(config);
