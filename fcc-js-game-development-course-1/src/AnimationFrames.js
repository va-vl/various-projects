export class AnimationFrames {
  #frames;
  #image;
  #spriteHeight;
  #spriteWidth;
  #staggerFrames;

  constructor(
    imageUrl,
    framesConfig,
    spriteWidth,
    spriteHeight,
    staggerFrames
  ) {
    this.#frames = this.#generate(framesConfig, spriteWidth, spriteHeight);
    this.#image = new Image();
    this.#image.src = imageUrl;
    this.#spriteHeight = spriteHeight;
    this.#spriteWidth = spriteWidth;
    this.#staggerFrames = staggerFrames;
  }

  #generate(framesConfig, spriteWidth, spriteHeight) {
    if (!framesConfig) {
      return {};
    }

    return Object.entries(framesConfig).reduce(
      (acc, [state, frameCount], stateIndex) => {
        acc[state] = Array.from({ length: frameCount }).map(
          (_, frameIndex) => ({
            x: frameIndex * spriteWidth,
            y: stateIndex * spriteHeight,
          })
        );
        return acc;
      },
      {}
    );
  }

  getInitialState() {
    return Object.keys(this.#frames)[0];
  }

  getAnimationFramesForState(state) {
    return this.#frames[state];
  }

  get image() {
    return this.#image;
  }

  get spriteHeight() {
    return this.#spriteHeight;
  }

  get spriteWidth() {
    return this.#spriteWidth;
  }

  get staggerFrames() {
    return this.#staggerFrames;
  }

  static init(...args) {
    return new this(...args);
  }
}
