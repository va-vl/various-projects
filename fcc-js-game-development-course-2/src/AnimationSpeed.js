export class AnimationSpeed {
  #speed;

  constructor(speed) {
    this.#speed = speed;
  }

  get speed() {
    return this.#speed;
  }

  updateSpeed(speed) {
    this.#speed = speed;
  }
}
