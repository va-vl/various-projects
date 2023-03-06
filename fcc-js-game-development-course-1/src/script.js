import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  SPRITE_URL,
  SPRITE_WIDTH,
  SPRITE_HEIGHT,
  STAGGER_FRAMES,
  STATE_FRAMES,
  spriteAnimations,
} from "./constants";
import { Model } from "./model";

const model = Model.init(Object.keys(STATE_FRAMES)[0] || "idle");

const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", (event) => {
  model.state = event.target.value;
});

const canvas = document.getElementById("canvas1");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const ctx = canvas.getContext("2d");

const playerImage = new Image();
playerImage.src = SPRITE_URL;

let gameFrame = 0;

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const frames = spriteAnimations[model.state];
  const position = Math.floor(gameFrame / STAGGER_FRAMES) % frames.length;

  ctx.drawImage(
    playerImage,
    SPRITE_WIDTH * position,
    frames[position].y,
    SPRITE_WIDTH,
    SPRITE_HEIGHT,
    0,
    0,
    SPRITE_WIDTH,
    SPRITE_HEIGHT
  );

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
