import { Config } from '../config';
import { GameState } from '../states/game';

const Phaser = require('phaser-ce/build/custom/phaser-arcade-physics');

export class Player {

  public sprite: Phaser.Sprite;

  private game: Phaser.Game;

  private bulletTime: number = 0;

  private bulletsGroup: Phaser.Group;

  constructor(
    private gameState: GameState,
    x: number,
    y: number,
    bulletsGroup: Phaser.Group,
  ) {
    this.sprite = this.gameState.add.sprite(x, y, 'tanks');
    this.sprite.anchor.setTo(0.5, 0.5)

    this.game = gameState.game;

    this.bulletsGroup = bulletsGroup;

    console.log(this.sprite)

    this.init();
  }

  get position(): Phaser.Point {
    return this.sprite.position;
  }

  public debug() {
    this.gameState.game.debug.bodyInfo(this.sprite, 32, 32);
    this.gameState.game.debug.body(this.sprite);
  }

  public init() {
    this.gameState.physics.arcade.enable(this.sprite);
    this.sprite.smoothed = false;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.width = 13;
    this.sprite.body.height = 13;
    this.sprite.body.offset.setTo(2, 2)
    this.sprite.frame = 0;
    this.initAnimations();
  }

  private initAnimations() {
    this.sprite.animations.add('left', [2, 3], 10, true);
    this.sprite.animations.add('right', [6, 7], 10, true);
    this.sprite.animations.add('up', [0, 1], 10, true);
    this.sprite.animations.add('down', [4, 5], 10, true);
  }

  public destroy(destroyChildren?: boolean) {
    this.sprite.destroy(destroyChildren);
  }

  public moveLeft(): Player {
    this.sprite.animations.play('right');
    this.sprite.body.velocity.x = -Config.tankSpeed;
    this.sprite.body.velocity.y = 0;

    this.sprite.rotation = 180 * (Math.PI / 180);

    return this;
  }

  public moveRight(): Player {
    this.sprite.animations.play('right');
    this.sprite.body.velocity.x = Config.tankSpeed;
    this.sprite.body.velocity.y = 0;

    this.sprite.rotation = 0 * (Math.PI / 180);

    return this;
  }

  public moveUp(): Player {
    this.sprite.animations.play('right');
    this.sprite.body.velocity.y = -Config.tankSpeed;
    this.sprite.body.velocity.x = 0;

    this.sprite.rotation = 270 * (Math.PI / 180);

    return this;
  }

  public moveDown(): Player {
    this.sprite.animations.play('right');
    this.sprite.body.velocity.y = Config.tankSpeed;
    this.sprite.body.velocity.x = 0;

    this.sprite.rotation = 90 * (Math.PI / 180);

    return this;
  }

  public setZeroVelocity(): Player {
    this.sprite.animations.stop();
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;

    return this;
  }

  private createBullet(position: Phaser.Point): Phaser.Sprite {
    const bullet = this.bulletsGroup.create(this.position.x, this.position.y, 'tiles8x16', 343);
    bullet.anchor.set(0.5, 0.5)
    this.gameState.physics.arcade.enable(bullet);

    const rotation = this.sprite.rotation / (Math.PI / 180);

    bullet.rotation = rotation;

    console.log(rotation);

    switch (rotation) {
      case 0:
        bullet.body.velocity.x = 100;
        break;
      case 90:
        bullet.body.velocity.y = 100;
        break;
      case 180:
      case -180:
        bullet.body.velocity.x = -100;
        break;
      case -90:
      case 270:
        bullet.body.velocity.y = -100;
        break;
      default:
        bullet.body.velocity.x = 0;
        bullet.body.velocity.y = 0;
        break;
    }

    return bullet;
  }

  public shoot(): void {
    if (this.game.time.now > this.bulletTime)
    {
      const bullet = this.createBullet(this.position);
      this.bulletTime = this.game.time.now + 250;
    }
  }
}