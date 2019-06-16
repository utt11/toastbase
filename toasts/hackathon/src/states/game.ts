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
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    public update(): void {
        this.game.input.update();

        if (this.cursors.down.isDown) {
            this.levelCombiner.currentLevel().moveDown();
        } else
        if (this.cursors.up.isDown) {
            this.levelCombiner.currentLevel().moveUp();
        } else
        if (this.cursors.left.isDown) {
            this.levelCombiner.currentLevel().moveLeft();
        } else
        if (this.cursors.right.isDown) {
            this.levelCombiner.currentLevel().moveRight();
        } else {
            this.levelCombiner.currentLevel().moveStop();
        }
    }

    public finish(deaths: number): void {
        (window as any).deaths = deaths;
        this.game.state.start('ChooseName');
        Sound.play();
    };
}
