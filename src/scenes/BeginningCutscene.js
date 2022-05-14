import Phaser, { Tilemaps } from "phaser";
import PlayerImg from "../assets/player.png";
import Bg1 from "../assets/Backgrounds/Desert/PNGs/Desert Background Desert Layer 1.png";
import Bg2 from "../assets/Backgrounds/Desert/PNGs/Desert Background Desert Layer 2.png";
import Bg3 from "../assets/Backgrounds/Desert/PNGs/Desert Background Desert Layer 3.png";
import Bg4 from "../assets/Backgrounds/Desert/PNGs/Desert Background Desert Layer 4.png";
import Bg5 from "../assets/Backgrounds/Desert/PNGs/Desert Background Desert Layer 5.png";
import GroundImg from "../assets/Desert/Ground.png";
import HoleImg from "../assets/HoleBg.png";
export default class BeginningCutScene extends Phaser.Scene {
	constructor() {
		super("BeginningCutScene");
		this.hasCutSceneStarted = false;
		this.screenH = 480;
		this.screenW = 854;
		this.centerX = this.screenW / 2;
		this.centerY = this.screenH / 2;
	}

	preload() {
		this.load.spritesheet("player", PlayerImg, {
			frameWidth: 50,
			frameHeight: 37,
		});
		this.load.image("Bg1", Bg1);
		this.load.image("Bg2", Bg2);
		this.load.image("Bg3", Bg3);
		this.load.image("Bg4", Bg4);
		this.load.image("Bg5", Bg5);
		this.load.image("Ground", GroundImg);
		this.load.image("Hole", HoleImg);
	}

	create() {
		const difference = 15 * 3.5;
		//*=============
		//* Background
		//*=============
		this.add.image(this.centerX, this.centerY, "Bg5").setScale(100);
		for (let i = 1; i < 50; i++) {
			this.add.image(
				this.centerX * (i * (Math.random() * 2)),
				this.centerY - 140,
				"Bg4"
			);
		}

		this.holeBg = this.add.image(
			difference + difference * (24 * 1.79),
			this.screenW - 65,
			"Hole"
		);

		//*=============
		//* Ground
		//*=============
		this.ground = this.physics.add.staticGroup();

		for (let i = 1; i < 20; i++) {
			this.ground.create(difference + difference * i * 2, 400, "Ground");
		}
		this.ground.create(difference + difference * 24 * 2, 400, "Ground");

		this.ground.getChildren().forEach((e) => {
			e.setScale(3.5);
			e.refreshBody();
		});

		//*=============
		//* Player
		//*=============
		this.player = this.physics.add.sprite(100, 100, "player");
		this.player.setPosition(
			this.centerX + 120,
			this.screenH - this.ground.getChildren()[0].height * 3.6
		);
		this.player.setScale(2);
		this.player.setBounce(0.2);

		this.cameras.main.startFollow(this.player);

		this.anims.create({
			key: "run",
			frames: this.anims.generateFrameNumbers("player", { start: 8, end: 13 }),
			frameRate: 10,
			repeat: -1,
		});

		this.anims.create({
			key: "idle",
			frames: this.anims.generateFrameNumbers("player", {
				start: 0,
				end: 3,
			}),
			frameRate: 2,
			repeat: -1,
		});

		this.anims.create({
			key: "fall",
			frames: this.anims.generateFrameNumbers("player", {
				start: 7,
				end: 8,
			}),
			frameRate: 2,
			repeat: -1,
		});

		this.speechBg = this.add.rectangle(
			this.player.x,
			this.player.y,
			100,
			100,
			0
		);

		this.speech = this.add.text(this.centerX, this.screenH - 50, "Oops!", {
			fontFamily: "Arial",
		});

		this.speech.visible = false;
		this.speechBg.visible = false;
	}

	update() {
		if (!this.hasCutSceneStarted) this.cutScene();

		// this.speech.x = this.player.x;
		this.speech.setPosition(
			this.player.x + this.player.width / 2 - this.speech.width / 2,
			this.player.y - 50
		);

		this.speechBg.width = this.speech.width + 30;
		this.speechBg.height = this.speech.height + 10;
		this.speechBg.setPosition(
			this.speech.x + this.speechBg.width / 2,
			this.speech.y + this.speechBg.height * 1.65
		);

		this.physics.collide(this.ground, this.player);
	}

	cutScene() {
		this.hasCutSceneStarted = true;
		this.player.setVelocityX(200);
		this.player.anims.play("run");

		setTimeout(() => {
			this.cameras.main.stopFollow();
			this.speech.visible = true;
			this.speechBg.visible = true;
		}, 8000);
		setTimeout(() => {
			const cam = this.cameras.main;

			cam.fade(1000);

			setTimeout(() => {
				this.scene.start("Level1");
			}, 500);
		}, 10000);
	}
}
