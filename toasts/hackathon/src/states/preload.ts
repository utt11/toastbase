import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import { Sound } from '../helpers/sound';

export class Preload extends Phaser.State {
    private ready: boolean;

    public preload(): void {
        // Load awesome fonts
        this.game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');
        this.game.load.image('knightHawks', 'assets/fonts/KNIGHT3.png');

        // Load sprite
        this.game.load.image('menu', 'assets/sprites/menu.png');
        this.game.load.image('play-button', 'assets/sprites/play-button.png');
        this.game.load.image('records-button', 'assets/sprites/records-button.png');
        this.game.load.tilemap('tilemap', 'assets/tilemaps/simple-map.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles16x16', 'assets/tilemaps/battlecity_general.png');

        // Initialize Howler
        Sound.load();

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    }

    public create(): void {

    }

    public update(): void {
        if ( (this.ready === true) && (Sound.loaded === true) ) {
            this.game.state.start('Menu');
            Sound.play();
        }
    }

    private onLoadComplete(): void {
        this.ready = true;
    }
}
