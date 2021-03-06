import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'thumb-loader',
  templateUrl: './thumb-loader.component.html',
  styleUrls: ['./thumb-loader.component.scss']
})
export class ThumbLoaderComponent {
  @Input() thumbnailUrl: string | null = null;
  @Input() width = 86;
  @Input() height = 48;
  @Input() disabled = false;
  @Output() onErrror = new EventEmitter<string>();
  @Output() onClick = new EventEmitter();
  @Output() onMouseEnter = new EventEmitter<any>();
  @Output() onMouseLeave = new EventEmitter<any>();

  constructor() {
  }

  public _onError(): void {
    this.onErrror.emit('error');
  }

  public _onClick(): void {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }

  public _onMouseEnter(event: any): void {
    if (!this.disabled) {
      this.onMouseEnter.emit(event);
    }
  }

  public _onMouseLeave(event: any): void {
    if (!this.disabled) {
      this.onMouseLeave.emit(event);
    }
  }

}
