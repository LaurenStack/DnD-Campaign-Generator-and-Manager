import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UserService } from './../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  users: FirebaseListObservable<any[]>;
  loggedInUser: any;
  editOneFormShown: boolean = false;
  editTwoFormShown: boolean = false;
  editThreeFormShown: boolean = false;
  editFourFormShown: boolean = false;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.authService.af.auth.subscribe(
      (auth) => {
        if (auth) {
          this.userService.getUserByEmail(auth.google.email).subscribe(res => {
            console.log(res[0])
            this.loggedInUser = res[0];
          });

        }
      });
    }

    editCharOne() {
      this.editOneFormShown = true;
    }

    charOneClicked(charOne) {
      this.editOneFormShown = false;
      this.userService.updateCharOne(charOne);
    }

    charOneCancel() {
      this.editOneFormShown = false;
    }

    editCharTwo() {
      this.editTwoFormShown = true;
    }

    // charTwoClicked(charTwo) {
    //   this.editOneFormShown = false;
    // }

    charTwoCancel() {
      this.editTwoFormShown = false;
    }

    editCharThree() {
      this.editThreeFormShown = true;
    }

    // charThreeClicked(charThree) {
    //   this.editThreeFormShown = false;
    // }

    charThreeCancel() {
      this.editThreeFormShown = false;
    }


    editCharFour() {
      this.editFourFormShown = true;
    }

    // charFourClicked(charFour) {
    //   this.editFourFormShown = false;
    // }

    charFourCancel() {
      this.editFourFormShown = false;
    }

}
