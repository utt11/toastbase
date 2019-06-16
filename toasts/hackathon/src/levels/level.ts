import {Game} from '../states/game';
import {Config} from '../config';

const { defaultStartCoordX, defaultStartCoordY } = Config;

export class Level {
    private game: Game;
    private coordX: number;
    private coordY: number;

    constructor(game: Game) {
        this.game = game;
    }

    start(coordX: number = defaultStartCoordX, coordY: number = defaultStartCoordY) {
        this.coordX = coordX;
        this.coordY = coordY;

        const map = this.game.add.tilemap('tilemap');
        map.addTilesetImage('battlecity','tiles16x16');
     
        const layer = map.createLayer('Ground');
        // layer.scale.set(2);
    }
}
