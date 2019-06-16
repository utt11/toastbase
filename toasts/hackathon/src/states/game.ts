import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import {Mushroom} from '../prefabs/mushroom';
import {LevelCombiner} from '../levels/levelCombiner';

const getDeathsText = (): string => `${(window as any).deaths} deaths`;

export class Game extends Phaser.State {
    private mushroom: Mushroom;
    private cursors: Phaser.CursorKeys;
    private text: Phaser.BitmapText;
    private spaceKey: Phaser.Key;
    private levelName: Phaser.BitmapText;
    private deaths: Phaser.BitmapText;

    private levelCombiner: LevelCombiner;

    public create(): void {
        (window as any).deaths = 0;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.levelCombiner = new LevelCombiner(this);
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.levelName = this.game.add.bitmapText(550, 450, 'font', this.levelCombiner.currentLevel().getLevelName(), 25);
        this.deaths = this.game.add.bitmapText(550, 425, 'font', getDeathsText(), 25);
    }

    public update(): void {
        this.levelCombiner.update();
        this.levelCombiner.currentLevel().update(this.cursors);

        this.levelName.text = this.levelCombiner.currentLevel().getLevelName();
        this.deaths.text = getDeathsText();
    }
}
