import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-monsters-view',
  templateUrl: './monsters-view.component.html',
  styleUrls: ['./monsters-view.component.css']
})
export class MonstersViewComponent implements OnInit {
monsters: FirebaseListObservable<any[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.monsters = this.userService.getAllMonsters();
  }

  addMonster(monster) {
    this.userService.addMonster(monster);
  }

  testClick(){
    this.userService.logUser();
  }

}
