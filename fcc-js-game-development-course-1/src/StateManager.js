export class StateManager {
  #state;

  constructor(state) {
    this.#state = state;
  }

  getCurrentState() {
    return this.#state;
  }

  updateState(state) {
    this.#state = state;
  }

  static init(state) {
    return new this(state);
  }
}
