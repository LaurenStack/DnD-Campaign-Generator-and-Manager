import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.css']
})
export class ItemsViewComponent implements OnInit {
  items: FirebaseListObservable<any[]>;
  type: string = "all";
  toolsType: string = "All";
  weaponType: string = "All";
  mountsType: string = "All";
  detailsShown: any;
  loggedInUser: any;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userService.getAllItems().subscribe(res=>{
      var array = [];
      for(var i=0;i<res.length;i++){
        // if(array.indexOf(res[i].type)==-1){
        //   array.push(res[i].type)
        // }
        var keys = Object.keys(res[i])
        keys.forEach(elem=>{
          if(array.indexOf(elem)==-1){
            array.push(elem)
          }
        })
      }
      console.log(array)
    })
    this.authService.af.auth.subscribe(
      (auth) => {
        if (auth) {
          this.userService.getUserByEmail(auth.google.email).subscribe(res => {
            this.loggedInUser = res[0];
            this.items = this.userService.getAllItems();
          });
        }
    })
  }

  goTo(location: string): void{
    window.location.hash = location;
  }

  onTypeChange(value) {
    this.type = value;
    this.toolsType = "All";
    this.mountsType = "All";
    this.weaponType = "All";
  }
  onToolsChange(value) {
    this.toolsType = value;
  }
  onWeaponChange(value) {
    this.weaponType = value;
  }
  onMountsChange(value) {
    this.mountsType = value;
  }

  showItemDetails(clickedItem) {
    if (this.detailsShown !== clickedItem) {
      this.detailsShown = clickedItem;
    } else {
      this.detailsShown = null;
    }
  }

  addItem(item) {
    this.userService.addItem(item);
  }

  findUserItems(item) {
    var count;
      for (var i =0; i<this.loggedInUser.treasure.length; i++) {
        if (this.loggedInUser.treasure[i].name== item.name) {
          count = this.loggedInUser.treasure[i].count;
        }
      }
      return count;
  }


}
