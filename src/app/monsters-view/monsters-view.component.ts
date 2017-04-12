import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-monsters-view',
  templateUrl: './monsters-view.component.html',
  styleUrls: ['./monsters-view.component.css']
})
export class MonstersViewComponent implements OnInit {
  monsters: FirebaseListObservable<any[]>;
  showDetails: any;
  alignType: string = "All";
  creatureType: string = "All";
  loggedInUser: any;
  createdFilter: boolean = false

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.af.auth.subscribe(
      (auth) => {
        if (auth) {
          this.userService.getUserByEmail(auth.google.email).subscribe(res => {
            this.loggedInUser = res[0];
            this.monsters = this.userService.getAllMonsters();
          });
        }
    })
  }

  addMonster(monster) {
    this.userService.addMonster(monster);
  }

  displayDetails(monster) {
    if (this.showDetails !== monster) {
      this.showDetails = monster;
    } else {
      this.showDetails = null;
    }
  }

  changeAlign(val){
    this.alignType = val;
  }

  changeType(val){
    this.creatureType = val;
  }

  filterCreated(){
    console.log(this.createdFilter)
    if(this.createdFilter == false){
      this.createdFilter = true
    }else{
      this.createdFilter = false;
    }
  }

  findUserMonster(monster) {
    var count;
    for (var i =0; i<this.loggedInUser.monsters.length; i++) {
      if (this.loggedInUser.monsters[i].name == monster.name) {
        count = this.loggedInUser.monsters[i].count;
      }
    }
    return count;
  }



}
