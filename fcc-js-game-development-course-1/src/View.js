export class View {
  #canvasHeight;
  #canvasWidth;
  #ctx;
  #currentFrameIndex;
  #staggerFrames;

  constructor(node, width, height, staggerFrames) {
    this.#canvasHeight = height;
    this.#canvasWidth = width;
    this.#ctx = node.getContext("2d");
    this.#currentFrameIndex = 0;
    this.#staggerFrames = staggerFrames;
  }

  #clear() {
    this.#ctx.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight);
  }

  #drawImage(...args) {
    this.#ctx.drawImage(...args);
  }

  animate(frames, state, image, spriteWidth, spriteHeight) {
    this.#clear();

    const framesState = frames.getState(state);
    const position =
      Math.floor(this.#currentFrameIndex / this.#staggerFrames) %
      framesState.length;

    this.#drawImage(
      image,
      spriteWidth * position,
      framesState[position].y,
      spriteWidth,
      spriteHeight,
      0,
      0,
      spriteWidth,
      spriteHeight
    );

    this.#currentFrameIndex += 1;

    requestAnimationFrame(() => {
      this.animate(frames, state, image, spriteWidth, spriteHeight);
    });
  }

  static init(...args) {
    return new this(...args);
  }
}
