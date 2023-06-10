export default class Game extends Phaser.Scene {
    constructor() {
      super("game");
    }
    create() {
        const map = this.make.tilemap({ key: "nivel" });

        const tileset1 = map.addTilesetImage("Base Color", "Base Color");
        const tileset2 = map.addTilesetImage("Buildings", "Buildings");
        const tileset3 = map.addTilesetImage("Frontal Fog", "Frontal Fog");
        const tileset4 = map.addTilesetImage("Props-01", "Props-01");
        const tileset5 = map.addTilesetImage("Tiles", "Tiles");

        const backgroundLayer1 = map.createLayer("capa de patrones 1", tileset1, 0, 0);
        const backgroundLayer2 = map.createLayer("capa de patrones 2", tileset2, 0, 0);
        const backgroundLayer3 = map.createLayer("capa de patrones 3", tileset3, 0, 0);
        const backgroundLayer4 = map.createLayer("capa de patrones 4", tileset4, 0, 0);
        const backgroundLayer5 = map.createLayer("capa de patrones 5", tileset5, 0, 0);
    }
}