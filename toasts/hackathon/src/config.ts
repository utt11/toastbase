export class Config {
    static gameWidth: number = 768;
    static gameHeight: number = 512;
    static recordLimit: number = 10;

    static tankSpeed: number = 66;

    static defaultStartCoordX: number = 12;
    static defaultStartCoordY: number = 13;

    static defaultStartLevelX: number = 2;
    static defaultStartLevelY: number = 2;
    static levelRowLength: number = 5;

    static DIRECTIONS = {
        TOP: 1,
        RIGHT: 2,
        BOTTOM: 3,
        LEFT: 4
    }
}
