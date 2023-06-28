export default class GameOver extends Phaser.Scene {
    constructor(){
        super("Start")
    }
    create(){
      this.add.image(115, 160,"logo")
      .setScale(1)
      .setInteractive()
      .on('pointerdown', () => this.scene.start('game')); ;
      this.scoreText = this.add.text(35, 240, "Haz clic para", {
      fontSize: "20px",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });
      this.scoreText2 = this.add.text(25, 260, "empezar a jugar.", {
      fontSize: "20px",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });
          
    }
}