const _ = require('lodash');

import {Sound} from '../helpers/sound';
import {Level} from './level';
import {SimpleLevel} from './simpleLevel/simpleLevel';
import {Game} from '../states/game';
import {Config} from '../config';

const { DIRECTIONS } = Config;
const dx = {
    [DIRECTIONS.BOTTOM]: -1,
    [DIRECTIONS.LEFT]: 0,
    [DIRECTIONS.RIGHT]: 0,
    [DIRECTIONS.TOP]: 1
};

const dy = {
    [DIRECTIONS.BOTTOM]: 0,
    [DIRECTIONS.LEFT]: -1,
    [DIRECTIONS.RIGHT]: 1,
    [DIRECTIONS.TOP]: 0
};

export class LevelCombiner {
    private levels: (Level | null)[][];
    private game: Game;
    private currentLevelX: number;
    private currentLevelY: number;

    private winLevelX: number = 0;
    private winLevelY: number = 0;
    private winDirection: number = 1;

    constructor(game: Game) {
        this.game = game;

        this.levels = [
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, new SimpleLevel(game, 'Additional'), new SimpleLevel(game, 'Main'), null, null],
            [null, null, null, null, null],
            [null, null, null, null, null]
        ];
        this.currentLevelX = Config.defaultStartLevelX;
        this.currentLevelY = Config.defaultStartLevelX;

        (window as any).levelCombiner = this;

        this.chooseWinPlace();
        this.currentLevel().start();
    }

    private chooseWinPlace(): void {
        while (!this.levels[this.winLevelX][this.winLevelY]
            || this.levels[this.winLevelX + dx[this.winDirection]][this.winLevelY + dy[this.winDirection]]) {
                this.winLevelX = _.random(0, Config.levelRowLength - 1);
                this.winLevelY = _.random(0, Config.levelRowLength - 1);
                this.winDirection = _.random(1, 4);
            }
    }

    public currentLevel(): Level {
        return this.levels[this.currentLevelX][this.currentLevelY];
    }

    public update(): void {
        this.checkTankPosition();
    }

    private checkTankPosition(): void {
        const xCoord = this.currentLevel().getTankPosition().x / 16;
        const yCoord = this.currentLevel().getTankPosition().y / 16;

        if (15 <= xCoord && xCoord <= 16 && 0 <= yCoord && yCoord <= 1) {
            this.moveLevel(Config.DIRECTIONS.TOP);
        }

        if (15 <= xCoord && xCoord <= 16 && 30 <= yCoord && yCoord <= 31) {
            this.moveLevel(Config.DIRECTIONS.BOTTOM);
        }

        if (0 <= xCoord && xCoord <= 1 && 15 <= yCoord && yCoord <= 16) {
            this.moveLevel(Config.DIRECTIONS.LEFT);
        }

        if (30 <= xCoord && xCoord <= 31 && 15 <= yCoord && yCoord <= 16) {
            this.moveLevel(Config.DIRECTIONS.RIGHT);
        }
    }

    private finish(): void {
        this.game.state.start('ChooseName');
        Sound.play();
    }

    private moveLevel(direction: number): void {
        const xCoordPrecise = this.currentLevel().getTankPosition().x;
        const yCoordPrecise = this.currentLevel().getTankPosition().y;

        if (this.currentLevelX === this.winLevelX && this.currentLevelY === this.winLevelY
            && this.winDirection === direction) {
                this.finish();
            }

        const nextLevelX = this.currentLevelX + dx[direction];
        const nextLevelY = this.currentLevelY + dy[direction];
        if (this.levels[nextLevelX][nextLevelY]) {
            this.currentLevel().stop();
            this.currentLevelX = nextLevelX;
            this.currentLevelY = nextLevelY;
            let nextXCoordPrecise, nextYCoordPrecise;
            // todo
            // if (direction === DIRECTIONS.LEFT || direction === DIRECTIONS.RIGHT) {
            //     nextXCoordPrecise = 486 - xCoordPrecise;
            //     nextYCoordPrecise = yCoordPrecise;
            // } else {
            //     nextXCoordPrecise = xCoordPrecise;
            //     nextYCoordPrecise = 486 - yCoordPrecise;
            // }
            this.currentLevel().start();
        }
    }
}
