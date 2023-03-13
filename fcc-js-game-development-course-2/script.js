import {
  layer1Url,
  layer2Url,
  layer3Url,
  layer4Url,
  layer5Url,
  LAYER_WIDTH,
  LAYER_HEIGHT,
} from "./backgrounds";
import { AnimationSpeed } from "./src/AnimationSpeed";
import { Layer } from "./src/Layer";
import { View } from "./src/View";

const speedController = new AnimationSpeed(5);

const slider = document.getElementById("slider");
slider.value = speedController.speed;
const showGameSpeed = document.getElementById("showGameSpeed");
showGameSpeed.innerHTML = speedController.speed;

slider.addEventListener("change", ({ target: { value } }) => {
  gameSpeed = value;
  showGameSpeed.innerHTML = value;
  speedController.updateSpeed(value);
});

const layers = [layer1Url, layer2Url, layer3Url, layer4Url, layer5Url].map(
  (url, index) =>
    new Layer(
      url,
      LAYER_WIDTH,
      LAYER_HEIGHT,
      0,
      0,
      speedController,
      0.15 * (index + 1)
    )
);

const view = new View(document.getElementById("canvas1"), 800, 800);
view.scale(2, 2);

window.addEventListener("load", () => {
  function animate() {
    view.clear();
    layers.forEach((layer) => {
      view.drawImage(layer.image, layer.x, layer.y, layer.width, layer.height);
      view.drawImage(
        layer.image,
        layer.x + layer.width,
        layer.y,
        layer.width,
        layer.height
      );
      layer.updatePosition();
    });
    requestAnimationFrame(animate);
  }

  animate();
});
