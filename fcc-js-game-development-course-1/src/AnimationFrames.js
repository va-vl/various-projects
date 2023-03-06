export class AnimationFrames {
  #frames;

  constructor(framesConfig, spriteWidth, spriteHeight) {
    this.#frames = this.#generate(framesConfig, spriteWidth, spriteHeight);
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

  get framesLength() {
    return this.#frames.length;
  }

  getState(state) {
    return this.#frames[state];
  }

  static init(...args) {
    return new this(...args);
  }
}
