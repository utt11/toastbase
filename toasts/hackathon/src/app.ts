const PIXI = require('phaser-ce/build/custom/pixi');
const p2 = require('phaser-ce/build/custom/p2');
const Phaser = require('phaser-ce/build/custom/phaser-arcade-physics');

import {Config} from './config';

import {Boot} from './states/boot';
import {Preload} from './states/preload';
import {GameState} from './states/game';
import {Menu} from './states/menu';
import {Hall} from './states/hall';
import {ChooseName} from './states/chooseName';

class Template extends Phaser.Game {

    constructor() {
        super(Config.gameWidth, Config.gameHeight, Phaser.CANVAS, 'content', null);

        this.state.add('Boot', Boot, false);
        this.state.add('Preload', Preload, false);
        this.state.add('Menu', Menu, false);
        this.state.add('Hall', Hall, false);
        this.state.add('Game', GameState, false);
        this.state.add('ChooseName', ChooseName, false);

        this.state.start('Boot');
    }
}

window.onload = () => {
    new Template();
};