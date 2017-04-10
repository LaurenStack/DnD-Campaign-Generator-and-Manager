import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UserService } from './../user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [UserService]
})
export class HomepageComponent implements OnInit {
  users: FirebaseListObservable<any[]>;
  loggedInUser: any;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.authService.af.auth.subscribe(
      (auth) => {
        if (auth) {
          this.userService.getUserByEmail(auth.google.email).subscribe(res => {
            this.loggedInUser = res[0];
            // this.userService.setLoggedInUser(res[0]);
          });

        }
    }
    )
  }

}
