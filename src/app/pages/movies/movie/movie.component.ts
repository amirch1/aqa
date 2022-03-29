import {Output, Component, Input, EventEmitter} from '@angular/core';
import {Movie} from "../movies.component";
import {environment} from "../../../../environments/environment";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {

  @Input() set movie(value: Movie | null) {
    if (value) {
      this._movie = value;
      this.movieName = value.name;
      this.description = value.description;
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl(environment.kalturaServer.uri+'/p/'+value.pid+'/embedPlaykitJs/uiconf_id/'+environment.kalturaServer.previewUIConf+'?iframeembed=true&entry_id='+value.id);
    }
  }
  @Input() set show(value: boolean) {
    this._show = value;
    if (value) {
      setTimeout(() => {
        this.showMovie = true;
      }, 500);
    }
  }

  @Output() onClose = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  public _show = false;
  public showMovie = false;
  public closing = false;
  public src: SafeUrl | undefined;
  public _movie: Movie | undefined;
  public movieName = '';
  public description = '';

  constructor(private sanitizer: DomSanitizer) {
  }

  public close(): void {
    this.closing = true;
    this.onClose.emit();
    setTimeout(() => {
      this.closing = false;
      this.showMovie = false;
    }, 500);
  }

  public save(): void {
    if (this._movie) {
      this._movie.name = this.movieName;
      this._movie.description = this.description;
      this.close();
    }
  }

  public delete(): void {
    this.onDelete.emit();
  }

}
