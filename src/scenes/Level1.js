import Phaser from "phaser";
import PlayerImg from "../assets/player.png";
import mapJson from "../assets/Maps/Level1/map.json";
import tilesetBase from "../assets/Base Tileset/PNG/Tileset Base.png";
export default class Level1 extends Phaser.Scene {
	constructor() {
		super("Level1");
	}

	preload() {
		this.load.spritesheet("player", PlayerImg, {
			frameWidth: 50,
			frameHeight: 37,
		});
		this.load.image("tiles", tilesetBase);
		this.load.tilemapTiledJSON("map", mapJson);
	}

	create() {
		const map = this.make.tilemap({ key: "map" });
		const tileset = map.addTilesetImage("Tileset Base", "tiles");
		this.layer = map.createLayer("Tile Layer 1", tileset, 0, 0);
		this.layer.setCollisionByExclusion(-1, true);

		this.player = this.physics.add.sprite(500, 100, "player");
		// this.player.setCollideWorldBounds(true);
		this.player.setScale(1.7);
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

		this.cameras.main.fadeIn(1000);
	}

	update() {
		const cursors = this.input.keyboard.createCursorKeys();

		if (cursors.left.isDown) {
			this.player.setVelocityX(-160);
			this.player.flipX = true;

			this.player.anims.play("run", true);
		} else if (cursors.right.isDown) {
			this.player.setVelocityX(160);
			this.player.flipX = false;

			this.player.anims.play("run", true);
		} else {
			this.player.setVelocityX(0);

			this.player.anims.play("idle", true);
		}

		console.log(this.player.body.touching.down);

		if (cursors.up.isDown && this.player.body.touching.down) {
			this.player.setVelocityY(-200);
		} else if (cursors.down.isDown) {
			this.player.setVelocityY(350);
			this.player.anims.play("fall", true);
		}

		this.physics.add.collider(this.player, this.layer);
	}
}
