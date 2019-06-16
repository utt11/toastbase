import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import {Game} from '../states/game';
import {Config} from '../config';

const { defaultStartCoordX, defaultStartCoordY } = Config;

export class Level {
    private game: Game;
    private coordX: number;
    private coordY: number;
    private tank: Phaser.Sprite;
    private layer: Phaser.TilemapLayer;

    constructor(game: Game) {
        this.game = game;
    }

    public start(coordX: number = defaultStartCoordX, coordY: number = defaultStartCoordY) {
        this.coordX = coordX;
        this.coordY = coordY;

        const map = this.game.add.tilemap('tilemap');
        map.addTilesetImage('battlecity', 'tiles16x16');
        // To enable collision between our tank and walls/city
        // we have to enable collision for tiles ( now we will just enable collision for all tiles of our tile set ).
        map.setCollisionBetween(1, 10000);
        const layer = map.createLayer('Ground');
        layer.debug = true;
        layer.resizeWorld();


        this.tank = this.game.add.sprite(coordX * 16, coordY * 16, 'tanks');
        this.game.physics.enable(this.tank);
        this.tank.body.collideWorldBounds = true;
        // enable physics for our player sprite so we could move it etc
        this.game.physics.arcade.enable(this.tank);
        // set initial frame for our player sprite
        this.tank.frame = 0;
        // define movement animations for our player - up, down etc, provide sprite numbers, timing,
        this.tank.animations.add('left', [2, 3], 10, true);
        this.tank.animations.add('right', [6, 7], 10, true);
        this.tank.animations.add('up', [0, 1], 10, true);
        this.tank.animations.add('down', [4, 5], 10, true);
    }

    public update(cursors: Phaser.CursorKeys): void {
        this.game.physics.arcade.collide(this.tank, this.layer);

        this.game.input.update();
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
}
