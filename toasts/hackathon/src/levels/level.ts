import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import {Game} from '../states/game';
import {Config} from '../config';

const { defaultStartCoordX, defaultStartCoordY } = Config;

export class Level {
    private gameState: Game;
    private coordX: number;
    private coordY: number;
    private tank: Phaser.Sprite;
    private layer: Phaser.TilemapLayer;
    private map: Phaser.Tilemap;
    protected tilemap: string;
    protected levelName: string;

    constructor(gameState: Game) {
        this.gameState = gameState;
    }

    public start(coordX: number = defaultStartCoordX, coordY: number = defaultStartCoordY) {
        this.coordX = coordX;
        this.coordY = coordY;

        this.map = this.gameState.add.tilemap(this.tilemap);
        this.map.addTilesetImage('battlecity', 'tiles16x16');
        // To enable collision between our tank and walls/city
        // we have to enable collision for tiles ( now we will just enable collision for all tiles of our tile set ).

        this.layer = this.map.createLayer('Ground');
        this.layer.resizeWorld();

        this.map.setCollisionBetween(1, 10000);
        this.layer.debug = true;

        this.tank = this.gameState.add.sprite(coordX * 16, coordY * 16, 'tanks');
        this.tank.smoothed = false;
        this.gameState.physics.enable(this.tank);
        this.tank.body.collideWorldBounds = true;
        // enable physics for our player sprite so we could move it etc
        this.gameState.physics.arcade.enable(this.tank);
        this.tank.body.width = 15;
        this.tank.body.height = 15;
        // set initial frame for our player sprite
        this.tank.frame = 0;
        // define movement animations for our player - up, down etc, provide sprite numbers, timing,
        this.tank.animations.add('left', [2, 3], 10, true);
        this.tank.animations.add('right', [6, 7], 10, true);
        this.tank.animations.add('up', [0, 1], 10, true);
        this.tank.animations.add('down', [4, 5], 10, true);
    }

    public stop(): void {
        this.map.destroy();
        this.tank.destroy(true);
    }

    public debug(): void {
        this.gameState.game.debug.bodyInfo(this.tank, 32, 32);
        this.gameState.game.debug.body(this.tank);
    }

    public update(cursors: Phaser.CursorKeys): void {
        this.gameState.physics.arcade.collide(this.tank, this.layer);

        this.gameState.input.update();
        if (cursors.down.isDown) {
            this.moveDown();
        } else
        if (cursors.up.isDown) {
            this.moveUp();
        } else
        if (cursors.left.isDown) {
            this.moveLeft();
        } else
        if (cursors.right.isDown) {
            this.moveRight();
        } else {
            this.moveStop();
        }
    }

    public moveLeft(): void {
        this.tank.animations.play('left');
        this.tank.body.velocity.x = -Config.tankSpeed;
        this.tank.body.velocity.y = 0;
    }

    public moveRight(): void {
        this.tank.animations.play('right');
        this.tank.body.velocity.x = Config.tankSpeed;
        this.tank.body.velocity.y = 0;
    }

    public moveUp(): void {
        this.tank.animations.play('up');
        this.tank.body.velocity.y = -Config.tankSpeed;
        this.tank.body.velocity.x = 0;
    }

    public moveDown(): void {
        this.tank.animations.play('down');
        this.tank.body.velocity.y = Config.tankSpeed;
        this.tank.body.velocity.x = 0;
    }

    public moveStop(): void {
        this.tank.animations.stop();
        this.tank.body.velocity.x = 0;
        this.tank.body.velocity.y = 0;
    }

    public getLevelName(): string {
        return this.levelName;
    }

    public getTankPosition(): Phaser.Point {
        return this.tank.position;
    }
}
