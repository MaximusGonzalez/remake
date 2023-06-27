export default class GameOver extends Phaser.Scene {
    constructor(){
        super("GameOver")
    }
    create(){
        this.add.image(135, 160,"gameover")
            .setScale(4)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('game')); ;
        this.scoreText = this.add.text(35, 220, "Haz clic para", {
            fontSize: "20px",
            fontStyle: "bold",
            fill: "#FFFFFF",
          });
          this.scoreText2 = this.add.text(15, 240, "volver a intentar.", {
            fontSize: "20px",
            fontStyle: "bold",
            fill: "#FFFFFF",
          });
          
    }
}