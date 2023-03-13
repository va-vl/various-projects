export class View {
  #canvasHeight;
  #canvasWidth;
  #ctx;

  constructor(node, width, height) {
    node.width = width;
    node.height = height;

    this.#canvasHeight = height;
    this.#canvasWidth = width;
    this.#ctx = node.getContext("2d");
  }

  clear() {
    this.#ctx.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight);
  }

  drawImage(...args) {
    this.#ctx.drawImage(...args);
  }

  scale(x, y) {
    this.#ctx.scale(x, y);
  }
}
