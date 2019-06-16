const _ = require('lodash');

import {Level} from './level';
import {SimpleLevel} from './simpleLevel/simpleLevel';
import {Game} from '../states/game';
import {Config} from '../config';

const { DIRECTIONS } = Config;

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
            [null, new SimpleLevel(game), new SimpleLevel(game), null, null],
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
}
