let player;
let cursors;

const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 500,
  backgroundColor: "#002fa7",
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
const game = new Phaser.Game(config);

function preload() {
  this.load.image("sky", "assets/sky.png");
  this.load.image("pet", "assets/pet.gif");
  this.load.image("star", "assets/star.gif");
}

function create() {
  const width = this.sys.game.config.width;
  const height = this.sys.game.config.height;

  this.add.image(width / 2, height / 2, "sky");

  player = this.add.image(400, 300, "pet");
  cursors = this.input.keyboard.createCursorKeys();
  this.input.on(
    "pointerdown",
    function (pointer) {
      this.add.image(pointer.x, pointer.y, "star").setScale(0.5);
    },
    this
  );
}

function update() {
  const speed = 3;
  if (cursors.left.isDown) {
    player.x -= speed;
  } else if (cursors.right.isDown) {
    player.x += speed;
  }

  if (cursors.up.isDown) {
    player.y -= speed;
  } else if (cursors.down.isDown) {
    player.y += speed;
  }
}
