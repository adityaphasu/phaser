let foxGirl;
let cursors;
let speed = 3;
let currentState;

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#002fa7",
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
const game = new Phaser.Game(config);

const states = {
  idle: {
    onEnter() {
      foxGirl.anims.stop();
    },
    onUpdate() {
      if (cursors.shift.isDown) {
        if (cursors.left.isDown) return "run-left";
        if (cursors.right.isDown) return "run-right";
        if (cursors.up.isDown) return "run-up";
        if (cursors.down.isDown) return "run-down";
      } else {
        if (cursors.left.isDown) return "walk-left";
        if (cursors.right.isDown) return "walk-right";
        if (cursors.up.isDown) return "walk-up";
        if (cursors.down.isDown) return "walk-down";
      }
      return "idle";
    },
    onExit() {},
  },
  "walk-left": {
    onEnter() {
      foxGirl.anims.play("walk-left", true);
    },
    onUpdate() {
      foxGirl.x -= speed;
      if (cursors.shift.isDown) return "run-left";
      if (!cursors.left.isDown) return "idle";
      return "walk-left";
    },
    onExit() {},
  },
  "walk-right": {
    onEnter() {
      foxGirl.anims.play("walk-right", true);
    },
    onUpdate() {
      foxGirl.x += speed;
      if (cursors.shift.isDown) return "run-right";
      if (!cursors.right.isDown) return "idle";
      return "walk-right";
    },
    onExit() {},
  },
  "walk-down": {
    onEnter() {
      foxGirl.anims.play("walk-down", true);
    },
    onUpdate() {
      foxGirl.y += speed;
      if (cursors.shift.isDown) return "run-down";
      if (!cursors.down.isDown) return "idle";
      return "walk-down";
    },
    onExit() {},
  },
  "walk-up": {
    onEnter() {
      foxGirl.anims.play("walk-up", true);
    },
    onUpdate() {
      foxGirl.y -= speed;
      if (cursors.shift.isDown) return "run-up";
      if (!cursors.up.isDown) return "idle";
      return "walk-up";
    },
    onExit() {},
  },
  "run-left": {
    onEnter() {
      foxGirl.anims.play("walk-left", true);
    },
    onUpdate() {
      foxGirl.x -= speed + 3;
      if (!cursors.left.isDown) return "idle";
      if (cursors.shift.isDown) return "walk-left";
      return "run-left";
    },
    onExit() {},
  },
  "run-right": {
    onEnter() {
      foxGirl.anims.play("walk-right", true);
    },
    onUpdate() {
      foxGirl.x += speed + 3;
      if (!cursors.right.isDown) return "idle";
      if (!cursors.shift.isDown) return "walk-right";
      return "run-right";
    },
    onExit() {},
  },
  "run-up": {
    onEnter() {
      foxGirl.anims.play("walk-up", true);
    },
    onUpdate() {
      foxGirl.y -= speed + 3;
      if (!cursors.up.isDown) return "idle";
      if (!cursors.shift.isDown) return "walk-up";
      return "run-up";
    },
    onExit() {},
  },
  "run-down": {
    onEnter() {
      foxGirl.anims.play("walk-down", true);
    },
    onUpdate() {
      foxGirl.y += speed + 3;
      if (!cursors.down.isDown) return "idle";
      if (!cursors.shift.isDown) return "walk-down";
      return "run-down";
    },
    onExit() {},
  },
};

function preload() {
  this.load.spritesheet("foxGirl", "assets/foxgirl.png", {
    frameWidth: 120,
    frameHeight: 120,
  });
  this.load.image("sky", "assets/sky.png");
}

function create() {
  const width = this.sys.game.config.width;
  const height = this.sys.game.config.height;
  sky = this.add.tileSprite(0, 0, width, height, "sky").setOrigin(0, 0);
  sky.setDisplaySize(width, height);

  foxGirl = this.add.sprite(width / 2, height / 2, "foxGirl");
  cursors = this.input.keyboard.createCursorKeys();

  this.anims.create({
    key: "walk-left",
    frames: this.anims.generateFrameNumbers("foxGirl", { start: 18, end: 23 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "walk-right",
    frames: this.anims.generateFrameNumbers("foxGirl", { start: 12, end: 17 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "walk-up",
    frames: this.anims.generateFrameNumbers("foxGirl", { start: 6, end: 11 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "walk-down",
    frames: this.anims.generateFrameNumbers("foxGirl", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });

  currentState = "idle";
  states[currentState].onEnter();

  currentState = "idle";
  states[currentState].onEnter();
}

function update() {
  let prevX = foxGirl.x;
  let prevY = foxGirl.y;

  const nextState = states[currentState].onUpdate();
  if (nextState !== currentState) {
    states[currentState].onExit();
    currentState = nextState;
    states[nextState].onEnter();
  }

  const width = foxGirl.scene.sys.game.config.width;
  const height = foxGirl.scene.sys.game.config.height;
  const halfW = foxGirl.width / 2;
  const halfH = foxGirl.height / 2;
  foxGirl.x = Phaser.Math.Clamp(foxGirl.x, halfW, width - halfW);
  foxGirl.y = Phaser.Math.Clamp(foxGirl.y, halfH, height - halfH);

  const bgScrollFactor = 0.2;
  sky.tilePositionX += (foxGirl.x - prevX) * bgScrollFactor;
  sky.tilePositionY += (foxGirl.y - prevY) * bgScrollFactor;
}
