import { Component } from '@angular/core';
import { UsersService } from "../../services/users.service";
import { first } from 'rxjs/operators'
import { Router } from "@angular/router";

type User = {
  username: string;
  password: string;
  role: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public username = '';
  public password = '';
  public error = '';

  constructor(private usersService: UsersService,
              private router: Router) {}

  login(): void {
    this.error = '';
    this.usersService.getUsers().pipe(first()).subscribe(
      result => {
        const users: User[] = result[0].users;
        let found = false;
        users.forEach((user: User) => {
          if (user.username === this.username && user.password === this.password) {
            sessionStorage.setItem('aqaUser', user.username);
            found = true;
            this.router.navigateByUrl('/movies');
          }
        });
        if (!found) {
          this.error = "Invalid user name or password";
        }
      },
      error => {
        console.error(`Error connecting to Firestore: ${error}`);
      });
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (event.code === "Enter") {
      this.login();
    }
  }

}
