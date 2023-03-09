import { StateManager } from "./src/StateManager";
import { View } from "./src/View";
import { AnimationFrames } from "./src/AnimationFrames";
import {
  SPRITE_URL,
  SPRITE_WIDTH,
  SPRITE_HEIGHT,
  ANIMATION_FRAMES,
} from "./sprites/shadow_dog";

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const STAGGER_FRAMES = 4;

const animationFrames = AnimationFrames.init(
  SPRITE_URL,
  ANIMATION_FRAMES,
  SPRITE_WIDTH,
  SPRITE_HEIGHT,
  STAGGER_FRAMES
);

const stateManager = StateManager.init(animationFrames.getInitialState());

const view = View.init(
  document.getElementById("canvas1"),
  CANVAS_WIDTH,
  CANVAS_HEIGHT
);

view.animate(animationFrames, stateManager);

const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", (event) => {
  stateManager.updateState(event.target.value);
});
