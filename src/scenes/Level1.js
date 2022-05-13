import Phaser from "phaser";
import PlayerImg from "../assets/player.png";
export default class Level1 extends Phaser.Scene {
	constructor() {
		super("Level1");
	}

	preload() {
		this.load.spritesheet("player", PlayerImg, {
			frameWidth: 50,
			frameHeight: 37,
		});
	}

	create() {
		this.player = this.physics.add.sprite(100, 100, "player");
		this.player.setCollideWorldBounds(true);
		this.player.setScale(2);
		this.player.setBounce(0.2);

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

		// if (cursors.up.isDown && this.player.body.touching.down) {
		// 	this.player.setVelocityY(-330);
		// }
		if (cursors.up.isDown) {
			this.player.setVelocityY(-200);
		}
	}
}
