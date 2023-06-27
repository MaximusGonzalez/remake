export default class GameOver extends Phaser.Scene {
    constructor(){
        super("Win")
    }
    create(){
        this.add.image(115, 160,"win")
        .setScale(1)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('game')); ;
        this.scoreText = this.add.text(45, 240, "Haz clic para", {
            fontSize: "20px",
            fontStyle: "bold",
            fill: "#FFFFFF",
          });
          this.scoreText2 = this.add.text(35, 260, "volver a jugar.", {
            fontSize: "20px",
            fontStyle: "bold",
            fill: "#FFFFFF",
          });
          this.scoreText3 = this.add.text(60, 160, "GANADOR", {
            fontSize: "26px",
            fontStyle: "bold",
            fill: "#5C4033",
          });
          
    }
}