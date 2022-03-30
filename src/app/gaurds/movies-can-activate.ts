import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class MoviesCanActivate implements CanActivate {
    constructor(private _router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot): Observable<boolean> {
      return new Observable((observer : any) => {
        const user: string | null = sessionStorage.getItem('aqaUser');
        if (user !== null && user.length) {
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
          this._router.navigate(['/login']);
        }
      });
    }
}
