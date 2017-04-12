import { Component, OnInit } from '@angular/core';
import{ UserService } from '../user.service';
import { AuthService } from './../auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css']
})
export class MonstersComponent implements OnInit {
  loggedInUser: any;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.authService.af.auth.subscribe(
      (auth) => {
        if (auth) {
          this.userService.getUserByEmail(auth.google.email).subscribe(res => {
            this.loggedInUser = res[0];
          });
        }
      });
  }

  updateCount(monster, amount) {
    var updated = false;
    var user = this.userService.getUserById(this.loggedInUser.$key);
    user.subscribe(res => {
      console.log("sub")
      var monsterArray = res.monsters;
      for (var i=0; i < monsterArray.length; i++) {
        if (monsterArray[i].name == monster.name) {
          monsterArray[i].count += amount;
          if (monsterArray[i].count == 0) {
            monsterArray.splice(i, 1);
            if (monsterArray.length == 0) {
              monsterArray = [""];
            }
          }
        }
      }
      if(!updated){
        console.log("ran")
        this.userService.updateMonster(monsterArray, res.$key);
        updated = true
      }
    });
  }
}
