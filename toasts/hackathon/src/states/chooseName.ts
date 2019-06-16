import {Sound} from '../helpers/sound';
import db from '../firebase';

export class ChooseName extends Phaser.State {
    public create(): void {
        this.game.add.tileSprite(0, 0, 768, 512, 'menu');
        const name = prompt("Please enter your name");
        db
            .collection('records')
            .add({ deaths: (window as any).deaths, name })
            .then(() => this.game.state.start('Hall'))
    }
}