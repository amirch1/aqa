import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private firestore: AngularFirestore) {
  }

  getMovies(): Observable<any> {
    return this.firestore.collection('movies').valueChanges();
  }

}
