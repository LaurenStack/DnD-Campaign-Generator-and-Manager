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
  showDetails: any;
  alignType: string = "All";
  creatureType: string = "All";

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.monsters = this.userService.getAllMonsters();
    this.userService.getAllMonsters().subscribe(res=>{
      var array = [];
      for(var i=0;i<res.length;i++){
        if(array.indexOf(res[i].type)==-1){
          array.push(res[i].type)
        }
      }
      console.log(array)
    })
  }

  addMonster(monster) {
    this.userService.addMonster(monster);
  }

  displayDetails(monster) {
    if (this.showDetails == null) {
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



}
