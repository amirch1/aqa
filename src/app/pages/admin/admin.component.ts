import { Component, OnInit } from '@angular/core';
import { ConfigService } from "../../services/config.service";
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators'
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [MessageService]
})
export class AdminComponent implements OnInit {

  public showBugs = '';
  public selectedBugs: string[] = [];

  constructor(private configService: ConfigService,
              private messageService: MessageService,
              private router: Router) {}

  ngOnInit(): void {
    this.configService.getConfig().pipe(first()).subscribe(
      result => {
        this.showBugs = result[0].bugTypes && result[0].bugTypes.length ? 'yes' : 'no';
        this.selectedBugs = result[0].bugTypes && result[0].bugTypes.length ? result[0].bugTypes : [];
      },
      error => {
        console.error(`Error connecting to Firestore: ${error}`);
      });
  }

  public updateBugTypes(reload: boolean): void {
    const bugTypes = this.showBugs === 'yes' ? this.selectedBugs : [];
    this.configService.setConfig(bugTypes);
    this.messageService.add({severity:'success', detail:'Changes Saved',  closable: false, life: 2500});
    if (reload) {
      setTimeout(() => {
        this.router.navigateByUrl('/');
      }, 3000);
    }
  }

}
