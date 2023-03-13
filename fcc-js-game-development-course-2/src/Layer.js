export class Layer {
  #image;
  #width;
  #height;
  #x;
  #y;
  #speedController;
  #speedModifier;

  constructor(
    url,
    imageWidth,
    imageHeight,
    x,
    y,
    speedController,
    speedModifier
  ) {
    this.#image = new Image();
    this.#image.src = url;
    this.#width = imageWidth;
    this.#height = imageHeight;
    this.#x = x;
    this.#y = y;
    this.#speedController = speedController;
    this.#speedModifier = speedModifier;
  }

  updatePosition() {
    const position = this.#x <= -this.#width ? 0 : this.#x;
    const speed = this.#speedController.speed * this.#speedModifier;
    this.#x = Math.floor(position - speed);
  }

  get image() {
    return this.#image;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  // draw(ctx) {
  //   ctx.drawImage(this.#image, this.#x, this.#y, this.#width, this.#height);
  //   ctx.drawImage(
  //     this.#image,
  //     this.#x + this.#width,
  //     this.#y,
  //     this.#width,
  //     this.#height
  //   );
  // }
}
