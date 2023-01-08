import { createHtmlElement } from '../lib/createHtmlElement';
import type { Field } from '~models';

export class View<T extends HTMLElement> {
  private container: HTMLElement;
  private interval: number | null = null;

  constructor(root: T, private model: Field) {
    const controls = createHtmlElement();
    const startButton = createHtmlElement('button', {}, 'Start');
    const clearButton = createHtmlElement('button', {}, 'Clear');

    startButton.onclick = () => {
      this.run();
    };

    clearButton.onclick = () => {
      this.clear();
    };

    controls.append(startButton, clearButton);
    this.container = createHtmlElement();
    root.append(controls, this.container);
  }

  private render() {
    const newContainer = createHtmlElement();

    this.model.field.forEach((rowContent, y) => {
      const row = createHtmlElement('div', { style: 'display:flex' });
      rowContent.forEach((value, x) => {
        const cell = createHtmlElement('div', {
          style: `height:30px;width:30px;margin:2px;background-color:${
            value ? 'black' : 'silver'
          }`,
        });
        cell.onclick = () => {
          this.model.toggleCellValue(y, x);
          this.render();
        };
        row.append(cell);
      });
      newContainer.append(row);
    });

    this.container.innerHTML = '';
    this.container.append(newContainer);
  }

  run() {
    this.interval = window.setInterval(() => {
      this.model.update();
      this.render();
    }, 1000);
  }

  clear() {
    if (!this.interval) {
      return;
    }
    clearInterval(this.interval);
    this.interval = null;
    this.model.clear();
    this.render();
  }

  static init<T extends HTMLElement>(root: T, model: Field) {
    const instance = new this(root, model);
    instance.render();
  }
}
