export default class Preload extends Phaser.Scene {

    constructor() {
        
      super("preload");
    }

    preload() {

      this.load.tilemapTiledJSON("nivel", "./public/tilemaps/nivel.json");

      this.load.image("Background Props", "./public/assets/images/Background Props.png");
      this.load.image("Base Color", "./public/assets/images/Base Color.png");
      this.load.image("Buildings", "./public/assets/images/Buildings.png");
      this.load.image("Frontal Fog", "./public/assets/images/Frontal Fog.png");
      this.load.image("Mid Fog", "./public/assets/images/Mid Fog.png");
      this.load.image("Props-01", "./public/assets/images/Props-01.png");
      this.load.image("Tiles", "./public/assets/images/Tiles.png");



    }

    create(){

      this.scene.start("game");
    }
}