import {Sound} from '../helpers/sound';

export class Menu extends Phaser.State {
    public create(): void {
        this.game.add.tileSprite(0, 0, 768, 512, 'menu');
        this.game.add.button(50, 350, 'play-button', this.actionOnPlayButton, this, 2, 1, 0);
        this.game.add.button(400, 350, 'records-button', this.actionOnRecordButton, this, 2, 1, 0);
    }

    public actionOnPlayButton(): void {
        this.game.state.start('Game');
    }

    public actionOnRecordButton(): void {
        this.game.state.start('Hall');
    }
}