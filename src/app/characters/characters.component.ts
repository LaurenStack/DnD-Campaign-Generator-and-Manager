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
            this.loggedInUser = res[0];
          });

        }
      });
    }

    charOneClicked(charObject) {
      this.editOneFormShown = false;
      this.userService.updateCharOne(charObject);
    }
    charTwoClicked(charObject) {
      this.editTwoFormShown = false;
      this.userService.updateCharTwo(charObject);
    }
    charThreeClicked(charObject) {
      this.editThreeFormShown = false;
      this.userService.updateCharThree(charObject);
    }
    charFourClicked(charObject) {
      this.editFourFormShown = false;
      this.userService.updateCharFour(charObject);
    }

    editCharOne() {
      this.editOneFormShown = true;
    }
    charOneCancel() {
      this.editOneFormShown = false;
    }
    editCharTwo() {
      this.editTwoFormShown = true;
    }
    charTwoCancel() {
      this.editTwoFormShown = false;
    }
    editCharThree() {
      this.editThreeFormShown = true;
    }
    charThreeCancel() {
      this.editThreeFormShown = false;
    }
    editCharFour() {
      this.editFourFormShown = true;
    }
    charFourCancel() {
      this.editFourFormShown = false;
    }

}
