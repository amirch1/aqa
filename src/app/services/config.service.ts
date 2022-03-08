import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

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
    this.firestore.collection('admin').doc('adminFields').set({bugTypes})
  }
}
