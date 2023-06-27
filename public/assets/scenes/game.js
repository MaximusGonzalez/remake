import { SHAPES, POINTS_PERCENTAGE, POINTS_PERCENTAGE_VALUE_START } from '../../../utils.js';
const { TRIANGLE, SQUARE, DIAMOND} = SHAPES;

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {
    this.shapesRecolected = {
      [TRIANGLE]: { count: 0, score: 10},
      [SQUARE]: { count: 0, score: 20 },
      [DIAMOND]: { count: 0, score: 30 },
    };
    console.log(this.shapesRecolected)
  }

  create() {

    this.shapesGroup = this.physics.add.group();
    // this.shapesGroup.create(100, 0, 'diamond');
    // this.shapesGroup.create(200, 0, 'triangle');
    // this.shapesGroup.create(300, 0, 'square');
    // create event to add shapes
    this.time.addEvent({
      delay: 500,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });

    this.physics.world.setBounds(0, 0, 240, 480);
    //creo el mapa nivel
    const map = this.make.tilemap({ key: "nivel" });

    //creo los tilesets y los emparejo con sus respectibas imagenes (nombre de tileset en tiled y nombre de la imagen usada para crearlo)
    const tileset1 = map.addTilesetImage("Base Color", "Base Color");
    const tileset2 = map.addTilesetImage("Buildings", "Buildings");
    const tileset3 = map.addTilesetImage("Frontal Fog", "Frontal Fog");
    const tileset4 = map.addTilesetImage("Props-01", "Props-01");
    const tileset5 = map.addTilesetImage("Tiles", "Tiles");

    //creo backgrounds y los emparejo con sus respectivos tilesets (nombre de capa en tiled, nombre de tiled usado para crearla, x, y)
    //para mantenerlo simple se recomienda usar solo un tileset por capa. Mantener valores de x, y, en 0
    const backgroundLayer1 = map.createLayer("patrones1", tileset1, 0, 0);
    const backgroundLayer2 = map.createLayer("patrones2", tileset3, 0, 0);
    const backgroundLayer3 = map.createLayer("patrones3", tileset2, 0, 0);
    const backgroundLayer4 = map.createLayer("patrones4", tileset2, 0, 0);
    const backgroundLayer5 = map.createLayer("patrones5", tileset2, 0, 0);
    const backgroundLayer6 = map.createLayer("patrones6", tileset5, 0, 0);
    const backgroundLayer7 = map.createLayer("patrones7", tileset4, 0, 0);
    const backgroundLayer8 = map.createLayer("patrones8", tileset4, 0, 0);

    //añado coliders
    backgroundLayer6.setCollisionByProperty({ colider: true });

    //creo spawnpoint de objeto (nombre de capa en la que se encuentra el objeto en tiled, (obj) => obj.name === nombre del objeto en tiled)
    const spawnPoint = map.findObject(
      "objetos1",
      (obj) => obj.name === "personaje"
    );

    let platforms = this.physics.add.staticGroup();
    platforms.create(120, 433, "deleter").setScale(1).refreshBody();

   // const zombieSpawn = map.findObject(
    //  "objetos1",
   //   (obj) => obj.name === "zombie"
    //);

    // creo al jugador (x, y, son tomados del spawnpoint creado con spawnPoint.x, spawnPoint.y, nombre de imagen usada para el personaje)
    this.player = this.physics.add
      .sprite(spawnPoint.x, spawnPoint.y, "dude")
      .setCollideWorldBounds(true)
      .setBounce(0.1);
    //this.zombie = this.physics.add.sprite(
    //  zombieSpawn.x,
     // zombieSpawn.y,
     // "Zombie"
   // );

    this.bullets = this.physics.add.group({
      inmovable: true,
      allowGravity: false,
    });

    //this.zombie.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.player, backgroundLayer6);
    this.physics.add.overlap(
      this.shapesGroup,
      this.bullets,
      this.reduce,
      null,
      this
    );
    this.physics.add.overlap(
      this.shapesGroup,
      platforms,
      this.killshapes,
      null,
      this
    );
    this.physics.add.overlap(
      this.bullets,
      platforms,
      this.killbullet,
      null,
      this
    );
    this.physics.add.overlap(
      this.shapesGroup,
      this.player,
      this.gameover,
      null,
      this
    );

    //this.physics.add.collider(this.zombie, backgroundLayer6);
    //this.physics.add.overlap(
     // this.zombie,
    //  this.bullets,
     // this.dañoZombie,
    //  null,
    //  this
    //);

    this.cameras.main.startFollow(this.player);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cameras.main.setViewport(0, 0, 240, 300);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.input.on("pointerdown", (pointer) => {
      let speed = 350;

      // create bullet
      let bullet = this.physics.add
        .image(this.player.x, this.player.y -18, "Bullet")
        .setScale(1)
        .setCircle(4, 0.5, 0.5);

      // DEMO: to shoot in a straightline, just comment the following line in

      // DEMO: QuickFix to destroy the bullet after 1 Second automatically
      // setTimeout(() => bullet.destroy(), 1000);

      // add bullet to group
      this.bullets.add(bullet);
      this.physics.moveTo(
        bullet,
        this.input.mousePointer.x,
        this.input.mousePointer.y + 180,
        speed
      );
      this.physics.add.overlap(
        this.shapesGroup,
        this.bullets,
        this.reduce,
        null,
        this
      );
      //bullet.body.setVelocity(vector.x, vector.y);
    });

    // add timer
    this.timer = 30;
    this.timerText = this.add.text(20, 250, "Sobrevive otros " + this.timer + " segundos.", {
      fontSize: "12px",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });
  }

  update() {

    if (
      this.timer <= 0
    ) {
      this.scene.start("Win")
    }

    //move left
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.anims.play("left", true);
    }
    //move right
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play("right", true);
    }
    //stop
    else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn", true);
    }

    //jump
    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-500);
      this.player.anims.play("jump", true);
    }
  }

  addShape() {
    // get random shape
    const randomShape = Phaser.Math.RND.pick([DIAMOND, SQUARE, TRIANGLE]);

    // get random position x
    const randomX = Phaser.Math.RND.between(0, 240);

    // add shape to screen
    this.shapesGroup.create(randomX, 0, randomShape)
      .setCircle(16, 0, 0)
      .setBounce(0.8)
      .setData(POINTS_PERCENTAGE, POINTS_PERCENTAGE_VALUE_START);

    console.log("shape is added", randomX, randomShape);
  }

  reduce(shape, bullet){
    const newPercentage = shape.getData(POINTS_PERCENTAGE) - 0.45;
    shape.setData(POINTS_PERCENTAGE, newPercentage);
    if (newPercentage <= 0) {
      shape.destroy(true, true);
      bullet.destroy(true, true);
      return;
    }
    bullet.destroy();
  }
  
  killshapes(shape, platforms) {
  shape.destroy();
  }

  killbullet(bullet, platforms) {
  bullet.destroy();
  }

  gameover(shape, player) {
    this.scene.start("GameOver");
    }

  onSecond(){
    this.timer--;
    this.timerText.setText("Sobrevive otros " + this.timer + " segundos.",);
    if(this.timer <= 0){
    this.scene.start("Win");
    }
  }
  //dañoZombie(zombie, bullet) {
 //   bullet.destroy();
  //}
}
