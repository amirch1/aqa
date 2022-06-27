import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private firestore: AngularFirestore) {
  }

  getConfig(): Observable<any> {
    return this.firestore.collection('admin').valueChanges();
  }

  setConfig(bugTypes: string[]): void {
    const path = sessionStorage.getItem('aqaUser') === 'aqa_admin' ? 'adminFields' : 'kalturaAdminFields';
    this.firestore.collection('admin').doc(path).set({bugTypes})
  }
}
