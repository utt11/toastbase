import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import {GameState} from '../states/game';
import {Config} from '../config';
import { Player } from '../classes/Player';
import { Mushroom } from '../prefabs/mushroom';

const { defaultStartCoordX, defaultStartCoordY } = Config;

export class Level {
    private gameState: GameState;
    private coordX: number;
    private coordY: number;
    private player: Player;
    private layer: Phaser.TilemapLayer;
    private map: Phaser.Tilemap;
    protected tilemap: string;
    protected levelName: string;

    private spaceKey: Phaser.Key;

    private bullets: Phaser.Group;

    private objectsToDestroy: Array<Phaser.Sprite> = []

    constructor(gameState: GameState) {
        this.gameState = gameState;
    }

    public start(coordX: number = defaultStartCoordX, coordY: number = defaultStartCoordY) {
        this.coordX = coordX;
        this.coordY = coordY;

        this.map = this.gameState.add.tilemap(this.tilemap);
        this.map.addTilesetImage('battlecity', 'tiles16x16');
        // To enable collision between our tank and walls/city
        // we hase to enable collision for tiles ( now we will just enable collision for all tiles of our tile set ).

        this.layer = this.map.createLayer('Ground');
        this.layer.resizeWorld();

        this.bullets = this.gameState.game.add.group();

        this.map.setCollisionBetween(1, 10000);
        this.layer.debug = true;
        this.player = new Player(this.gameState, coordX * 16 + 8, coordY * 16 + 8, this.bullets);

        this.spaceKey = this.gameState.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // enable physics for our player sprite so we could move it etc
    }

    public stop(): void {
        this.map.destroy();
        this.player.destroy(true);
    }

    public debug(): void {
        this.player.debug();
    }

    public update(cursors: Phaser.CursorKeys): void {
        this.objectsToDestroy.forEach(obj => {
            obj.destroy();
        })
        this.objectsToDestroy = [];

        this.gameState.physics.arcade.collide(this.player.sprite, this.layer);

        this.gameState.physics.arcade.collide(this.bullets, this.layer, (bullet: Phaser.Sprite, other: Phaser.Sprite) => {
            console.log(bullet, other)
            this.objectsToDestroy.push(bullet);
        });

        this.gameState.input.update();
        if (cursors.down.isDown) {
            this.player.moveDown();
        } else
        if (cursors.up.isDown) {
            this.player.moveUp();
        } else
        if (cursors.left.isDown) {
            this.player.moveLeft();
        } else
        if (cursors.right.isDown) {
            this.player.moveRight();
        } else {
            this.player.setZeroVelocity();
        }

        if (this.spaceKey.isDown) {
            this.player.shoot();
        }
    }

    public getLevelName(): string {
        return this.levelName;
    }

    public getTankPosition(): Phaser.Point {
        return this.player.position;
    }
}
