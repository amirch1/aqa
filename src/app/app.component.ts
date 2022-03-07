import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private firestore: AngularFirestore) {
    firestore.collection('admin').valueChanges().subscribe((result: any[]) => {
      console.log("----> result: "+ result[0]['bugTypes']);
    },
      error => {
        console.log("----> error: "+error);
      });
  }
  public update() {
    this.firestore.collection('admin').doc('adminFields').set({bugTypes: []})
  }
}
