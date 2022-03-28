import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bullet',
  templateUrl: './bullet.component.html',
  styleUrls: ['./bullet.component.scss']
})
export class BulletComponent {

  public _value = 0;
  public _color = this.getColorPercent(65);

  @Input() formatter: Function = this.significantDigits;
  @Input() animate = true;
  @Input() colorPercent = 65;
  @Input() hideBulletOnTablet = false;

  @Input() set value(value: any) {
    if (this.animate) {
      setTimeout(() => {
        this._setValue(value);
      }, 200);
    } else {
      this._setValue(value);
    }

  }

  @Input() set colorScheme(type: string) {
    this._color = this.getColorPercent(this.colorPercent, type);
  }

  private _setValue(value: any): void {
    this._value = typeof this.formatter === 'function' ? this.formatter(value) : value;
  }

  private significantDigits(number: any, fractions = 1): number {
    number = parseFloat(number) || 0;
    if (number % 1 !== 0) {
      if (number > 0 && number < 1) { // 0.n
        number = Number(number.toFixed(1 - Math.floor(Math.log(number) / Math.log(10))));
      } else { // n.m
        number = Number(number.toFixed(fractions));
      }
    }
    return number;
  }

  private getColorPercent(percent: number, type: string = 'default'): string {
    let index = Math.round(percent / 100 * 8) - 1;
    index = index < 1 ? 1 : index;
    return ['#DFE9FF', '#B5CDFC', '#88ACF6', '#6391ED', '#487ADF', '#3567CA', '#2655B0', '#1D4694'][index];
  }
}
