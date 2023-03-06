export class Model {
  #defaultState;
  #state;
  #runCounter;

  constructor(defaultState) {
    this.#defaultState = defaultState;
    this.#state = defaultState;
    this.#runCounter = 0;
  }

  set state(state) {
    this.#state = state;
  }

  get state() {
    return this.#state;
  }

  get runCounter() {
    return this.#runCounter;
  }

  #clearRunCounter() {
    this.#runCounter = 0;
  }

  updateRunCounter() {
    this.#runCounter += 1;
  }

  reset() {
    this.#state = this.#defaultState;
    this.#clearRunCounter();
  }

  static init(defaultState) {
    return new this(defaultState);
  }
}
