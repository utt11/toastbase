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
        this.levelCombiner.currentLevel().update(this.cursors);
    }

    public finish(deaths: number): void {
        (window as any).deaths = deaths;
        this.game.state.start('ChooseName');
        Sound.play();
    }
}
