type CellValue = 0 | 1;
type FieldContent = CellValue[][];

export class Field {
  private _field: FieldContent;

  constructor(height: number, width: number);
  constructor(field: FieldContent);
  constructor(...args: [number, number] | [FieldContent]) {
    if (args.length === 2) {
      const [height, width] = args;
      this._field = this.createEmptyField(height, width);
    } else {
      this._field = args[0];
    }
  }

  clear() {
    const height = this.field.length;
    const width = this.field[0]?.length ?? 0;
    this._field = this.createEmptyField(height, width);
  }

  private createEmptyField(y: number, x: number): FieldContent {
    return [...new Array(y)].map(() =>
      [...new Array(x)].map(() => 0 as CellValue)
    );
  }

  get field() {
    return this._field;
  }

  toggleCellValue(y: number, x: number) {
    const value = this.lookUpValue(y, x);
    if (value === undefined) {
      return;
    }
    this._field[y][x] = Number(!value) as CellValue;
  }

  update() {
    this._field = this._field.map((row, rowIndex) =>
      row.map((value, columnIndex) =>
        this.calculateNewValue(value, rowIndex, columnIndex)
      )
    );
  }

  private calculateNewValue(value: CellValue, y: number, x: number): CellValue {
    const liveNeighborsCount = [
      this.lookUpValue(y - 1, x - 1),
      this.lookUpValue(y - 1, x),
      this.lookUpValue(y - 1, x + 1),
      this.lookUpValue(y, x - 1),
      this.lookUpValue(y, x + 1),
      this.lookUpValue(y + 1, x - 1),
      this.lookUpValue(y + 1, x),
      this.lookUpValue(y + 1, x + 1),
    ].reduce((acc: number, i) => acc + (i ?? 0), 0);

    return +(value
      ? liveNeighborsCount === 2 || liveNeighborsCount === 3
      : liveNeighborsCount === 3) as CellValue;
  }

  private lookUpValue(y: number, x: number): CellValue | undefined {
    return this._field[y]?.[x];
  }
}
