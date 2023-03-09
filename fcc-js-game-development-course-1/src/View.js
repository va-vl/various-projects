export class View {
  #canvasHeight;
  #canvasWidth;
  #ctx;
  #currentFrameIndex;

  constructor(node, width, height) {
    node.width = width;
    node.height = height;

    this.#canvasHeight = height;
    this.#canvasWidth = width;
    this.#ctx = node.getContext("2d");
    this.#currentFrameIndex = 0;
  }

  #clear() {
    this.#ctx.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight);
  }

  clearCurrentFrameIndex() {
    this.#currentFrameIndex = 0;
  }

  #drawImage(...args) {
    this.#ctx.drawImage(...args);
  }

  animate(animationFrames, stateManager) {
    this.#clear();

    const state = stateManager.getCurrentState();
    const framesState = animationFrames.getAnimationFramesForState(state);

    const position =
      Math.floor(this.#currentFrameIndex / animationFrames.staggerFrames) %
      framesState.length;

    this.#drawImage(
      animationFrames.image,
      animationFrames.spriteWidth * position,
      framesState[position].y,
      animationFrames.spriteWidth,
      animationFrames.spriteHeight,
      0,
      0,
      animationFrames.spriteWidth,
      animationFrames.spriteHeight
    );

    this.#currentFrameIndex += 1;

    requestAnimationFrame(() => {
      this.animate(animationFrames, stateManager);
    });
  }

  static init(...args) {
    return new this(...args);
  }
}
