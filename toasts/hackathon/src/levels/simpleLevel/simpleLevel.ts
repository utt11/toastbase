import {Level} from '../level';

import {GameState} from '../../states/game';

export class SimpleLevel extends Level {
    tilemap = 'simple-map';

    constructor(game: GameState, name: String) {
        super(game);

        this.levelName = 'Simple Level ' + name;
    }
}
