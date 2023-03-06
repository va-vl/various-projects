import { Model } from "./Model";
import { View } from "./View";
import { AnimationFrames } from "./AnimationFrames";
import { CANVAS_WIDTH, CANVAS_HEIGHT, STAGGER_FRAMES } from "./constants";
import {
  SPRITE_URL,
  SPRITE_WIDTH,
  SPRITE_HEIGHT,
  ANIMATION_FRAMES,
} from "../sprites/shadow_dog";

const canvas = document.getElementById("canvas1");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const view = View.init(canvas, CANVAS_WIDTH, CANVAS_HEIGHT, STAGGER_FRAMES);
const animationFrames = AnimationFrames.init(
  ANIMATION_FRAMES,
  SPRITE_WIDTH,
  SPRITE_HEIGHT
);
const model = Model.init(Object.keys(ANIMATION_FRAMES)[0] || "idle");

const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", (event) => {
  model.state = event.target.value;
});

const playerImage = new Image();
playerImage.src = SPRITE_URL;

view.animate(
  animationFrames,
  model.state,
  playerImage,
  SPRITE_WIDTH,
  SPRITE_HEIGHT
);

// let gameFrame = 0;

// function animate() {
//   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

//   const frames = spriteAnimations[model.state];
//   const position = Math.floor(gameFrame / STAGGER_FRAMES) % frames.length;

//   ctx.drawImage(
//     playerImage,
//     SPRITE_WIDTH * position,
//     frames[position].y,
//     SPRITE_WIDTH,
//     SPRITE_HEIGHT,
//     0,
//     0,
//     SPRITE_WIDTH,
//     SPRITE_HEIGHT
//   );

//   gameFrame++;
//   requestAnimationFrame(animate);
// }

// animate();
