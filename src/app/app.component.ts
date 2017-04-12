import { Component } from '@angular/core';
import { MapComponent } from './map/map.component';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'D&D Campaign Generator and Manager';
  diceRoll: number;

  private isLoggedIn: Boolean;
  private user_displayName: String;
  private user_email: String;
  constructor(public authService: AuthService, public userService: UserService, private router: Router) {
    this.authService.af.auth.subscribe(
      (auth) => {
        if (auth == null) {
          console.log("Logged out");
          this.isLoggedIn = false;
          this.user_displayName = '';
          this.user_email = '';
          this.router.navigate(['login']);
        } else {
          this.isLoggedIn = true;
          console.log(auth);
          this.userService.setLoggedInUser(auth.google.email);
          this.user_displayName = auth.google.displayName;
          this.user_email = auth.google.email;
          console.log("Logged in");
          // this.router.navigate(['']);
        }
      }
    );
  }

  onRoll(diceType) {
    var min;
    var max;
    var roll;
    if(diceType == "4"){
      min = 1;
      max = 4;
    }else if(diceType == "6"){
      min = 1;
      max = 6;
    }else if(diceType == "8"){
      min = 1;
      max = 8;
    }else if(diceType == "10" || diceType == "00"){
      min = 0;
      max = 9;
    }else if(diceType == "12"){
      min = 1;
      max = 12;
    }else if(diceType == "20"){
      min = 1;
      max = 20;
    }
    this.diceRoll = Math.round(Math.random() * (max - min)) + min;
    if(diceType == "00"){
      this.diceRoll = this.diceRoll * 10;
    }
    return this.diceRoll;
  }

  logout() {
    this.router.navigate(['login']);
    this.authService.logout();
  }
}
