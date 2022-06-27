import { Output, Component, Input, EventEmitter, OnInit } from '@angular/core';
import { ConfigService } from "../../services/config.service";
import { MessageService } from "primeng/api";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [MessageService]
})
export class SettingsComponent implements OnInit{

  @Input() set show(value: boolean) {
    this._show = value;
    this.loadSettings();
    if (value) {
      setTimeout(() => {
        this.showSettings = true;
      }, 500);
    }
  }

  @Output() onClose = new EventEmitter();

  public _show = false;
  public showSettings = false;
  public closing = false;

  public showBugs = '';
  public selectedBugs: string[] = [];

  constructor(private configService: ConfigService,
              private messageService: MessageService) {

  }

  private loadSettings(): void {
    this.configService.getConfig().pipe(first()).subscribe(
      result => {
        const data = (sessionStorage.getItem('aqaUser') as string).indexOf('aqa') === 0  ? result[0] : result[1];
        this.showBugs = data && data.bugTypes && data.bugTypes.length ? 'yes' : 'no';
        this.selectedBugs = data && data.bugTypes && data.bugTypes.length ? data.bugTypes : [];
      },
      error => {
        console.error(`Error connecting to Firestore: ${error}`);
      });
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  public close(): void {
    this.closing = true;
    this.onClose.emit();
    setTimeout(() => {
      this.closing = false;
      this.showSettings = false;
    }, 500);
  }

  public save(): void {
    this.close();
    const bugTypes = this.showBugs === 'yes' ? this.selectedBugs : [];
    this.configService.setConfig(bugTypes);
    this.messageService.add({severity:'success', detail:'Changes Saved, reloading page...',  closable: false, life: 2500});
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

}
