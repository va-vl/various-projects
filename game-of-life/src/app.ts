// TODO: split code into model and view
// TODO: canvas view implementation
// TODO: controls

// Model
// naive implementation
type FieldValue = 0 | 1;
type FieldContent = FieldValue[][];

class Field {
  newField: FieldContent;

  constructor(public field: FieldContent) {
    this.newField = field;
  }

  calculateNewValue(value: FieldValue, y: number, x: number): FieldValue {
    const liveNeighborsCount = [
      this.lookUpValue(y - 1, x - 1),
      this.lookUpValue(y - 1, x),
      this.lookUpValue(y - 1, x + 1),
      this.lookUpValue(y, x - 1),
      this.lookUpValue(y, x + 1),
      this.lookUpValue(y + 1, x - 1),
      this.lookUpValue(y + 1, x),
      this.lookUpValue(y + 1, x + 1),
    ].reduce((acc: number, i: FieldValue) => acc + Number(!!i), 0);

    const isAlive = value
      ? liveNeighborsCount === 2 || liveNeighborsCount === 3
      : liveNeighborsCount === 3;

    return +isAlive as FieldValue;
  }

  generateNewField() {
    return this.field.map((row, rowIndex) =>
      row.map((value, columnIndex) =>
        this.calculateNewValue(value, rowIndex, columnIndex)
      )
    );
  }

  lookUpValue(y: number, x: number): FieldValue {
    return this.field[y]?.[x];
  }
}

// View
class View<T extends HTMLElement> {
  constructor(private root: T, private model: Field) {}

  run() {
    setInterval(() => {
      const newField = this.model.generateNewField();
      const newView = this.generateView(newField);
      this.appendToRoot(newView);
      this.model.field = newField;
    }, 1000);
  }

  private generateView(field: FieldContent) {
    return `<div>${field
      .map(
        (row) =>
          `<div style="display:flex">${row
            .map(
              (value) =>
                `<div style="height:30px;width:30px;margin:5px;background-color:${
                  value ? 'black' : 'silver'
                }"></div>`
            )
            .join('')}</div>`
      )
      .join('')}</div>`;
  }

  private appendToRoot(html: string) {
    this.root.innerHTML = html;
  }

  static init<T extends HTMLElement>(root: T, model: Field) {
    const instance = new this(root, model);
    const view = instance.generateView(model.field);
    instance.appendToRoot(view);
    return instance;
  }
}

// Controller

// Init
const root = document.getElementById('root') as HTMLDivElement;

const field = new Field([
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]);

const view = View.init(root, field);
view.run();
