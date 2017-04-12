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
  userEmail;
  title = 'D&D Campaign Generator and Manager';

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

  logout() {
    this.router.navigate(['login']);
    this.authService.logout();
  }

  login() {
      var foundUser = false;
      this.authService.loginWithGoogle().then((data) => {
        this.userService.getUsers().subscribe(res=> {
          var len = res.length
          for(var i = 0;i<len;i++){
            if (data.auth.email === res[i].email) {
              this.userEmail = data.auth.email;
              foundUser = true;
            }
          }
          if(!foundUser){
            this.userService.addUser(data.auth.email, data.auth.displayName);
            this.userEmail = data.auth.email;
            foundUser = true;
          }
        })
        this.router.navigate(['']);
      })
    }
}
