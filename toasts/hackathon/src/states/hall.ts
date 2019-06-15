import {Sound} from '../helpers/sound';
import {Config} from '../config';
import db from '../firebase';

export class Hall extends Phaser.State {
    public create(): void {
        this.game.add.button(250, 350, 'play-button', this.actionOnPlayButton, this, 2, 1, 0);
        db
            .collection('records')
            .orderBy('deaths')
            .limit(Config.recordLimit)
            .get()
            .then(querySnapshot => {
                let index = 0;
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const text = `${data.name} dies ${data.deaths} times`;
                    this.game.add.bitmapText(this.game.width / 2 - 100, index * 30 + 25, 'font', text, 25);
                    index++;
                });
            });
    }

    public actionOnPlayButton(): void {
        this.game.state.start('Game');
    }
}
