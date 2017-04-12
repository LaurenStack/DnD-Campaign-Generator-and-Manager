import { Component, OnInit } from '@angular/core';
import{ UserService } from '../user.service';
import { AuthService } from './../auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
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

  updateCount(item, amount) {
    var updated = false;
    var user = this.userService.getUserById(this.loggedInUser.$key);
    user.subscribe(res => {
      var itemArray = res.treasure;
      for (var i=0; i < itemArray.length; i++) {
        if (itemArray[i].name == item.name) {
          itemArray[i].count += amount;
          if (itemArray[i].count == 0) {
            itemArray.splice(i, 1);
            if (itemArray.length == 0) {
              itemArray = [""];
            }
          }
        }
      }
      if(!updated){
        console.log("ran")
        this.userService.updateItem(itemArray, res.$key);
        updated = true
      }
    });
  }

}
