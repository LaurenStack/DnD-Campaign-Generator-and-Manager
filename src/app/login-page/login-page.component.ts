import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';




@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  userEmail;
  constructor(public authService: AuthService, public userService: UserService, private router:Router) { }

  ngOnInit() {
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
