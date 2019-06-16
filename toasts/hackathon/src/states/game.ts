import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import {Sound} from '../helpers/sound';
import {Mushroom} from '../prefabs/mushroom';
import {LevelCombiner} from '../levels/levelCombiner';

export class Game extends Phaser.State {
    private mushroom: Mushroom;
    private cursors: Phaser.CursorKeys;
    private text: Phaser.BitmapText;
    private spaceKey: Phaser.Key;

    private levelCombiner: LevelCombiner;

    public create(): void {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.levelCombiner = new LevelCombiner(this);
        // this.text = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY + 100, 'font', 'Press Arrows / Space', 15);
        // this.text.x = this.text.x - ~~(this.text.width * 0.5);

        // this.mushroom = new Mushroom(this.game, this.game.world.centerX, this.game.world.centerY);
        // this.game.add.existing(this.mushroom);

        this.cursors = this.game.input.keyboard.createCursorKeys();

        (window as any).finish = (deaths: number): void => {
            (window as any).deaths = deaths;
            this.game.state.start('ChooseName');
            Sound.play();
        };
    }

    public update(): void {
        this.game.input.update();

        if (this.cursors.down.isDown) {
            this.mushroom.position.y++;
        }
        if (this.cursors.up.isDown) {
            this.mushroom.position.y--;
        }
        if (this.cursors.left.isDown) {
            this.mushroom.position.x--;
        }
        if (this.cursors.right.isDown) {
            this.mushroom.position.x++;
        }
    }
}