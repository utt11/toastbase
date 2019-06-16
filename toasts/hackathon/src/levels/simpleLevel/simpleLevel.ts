import {Level} from '../level';

import {Game} from '../../states/game';

export class SimpleLevel extends Level {
    tilemap = 'simple-map';

    constructor(game: Game, name: String) {
        super(game);

        this.levelName = 'Simple Level ' + name;
    }
}
