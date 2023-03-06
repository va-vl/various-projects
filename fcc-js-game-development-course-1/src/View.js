class View {
  #canvasHeight;
  #canvasWidth;
  #ctx;
  #position;

  constructor(node, width, height) {
    this.#canvasHeight = height;
    this.#canvasWidth = width;
    this.#ctx = node.getContext("2d");
    this.#currentFrameIndex = 0;
  }

  #clear() {
    this.#ctx.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight);
  }

  #drawImage(...args) {
    this.ctx.drawImage(...args);
  }

  animate(frames, image, spriteWidth, spriteHeight) {
    this.#clear();
  }

  static init(...args) {
    return new this(...args);
  }
}
