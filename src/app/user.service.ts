import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class UserService {
  users: FirebaseListObservable<any[]>;
  monsters: FirebaseListObservable<any[]>;
  items: FirebaseListObservable<any[]>;
  loggedInUser: any;

  constructor(private angularFire: AngularFire) {
    this.users = angularFire.database.list('users');
    this.monsters = angularFire.database.list('monsters');
    this.items = angularFire.database.list('items');
  }

  getUsers() {
    return this.users;
  }

  setLoggedInUser(user) {
    console.log("loggedInUser ran")
    this.loggedInUser = user;
    console.log(this.loggedInUser)
  }

  getUserByEmail(email: string) {
    var user = this.angularFire.database.list('/users/', {
      query: {
        orderByChild: 'email',
        equalTo: email
      }
    })
    return user;
  }

  getUserById(userId: string) {
    return this.angularFire.database.object('/users/' + userId);
  }

  getItemById(itemId: string) {
    return this.angularFire.database.object('/items/' + itemId);
  }

  getAllMonsters() {
    return this.monsters;
  }

  getAllItems() {
    return this.items;
  }

  // scrapeMonsters(monster){
  //   monster.private = false;
  //   monster.creator = "admin";
  //   // console.log(monster);
  //   this.items.push(monster)
  // }

  editItem(item){
    var currentItem = this.getItemById(item.$key);
    console.log(item);
  }

  addMonster(monster) {
    var user;
    var findUser
    var enemyArray=[]
    var addedMonster = false
    var foundMonster = false;
    this.getUserByEmail(this.loggedInUser).subscribe(response=>{
      findUser = response[0]
      this.getUserById(findUser.$key).subscribe(res => {
        if(res.monsters[0]==""){
          monster.count = 1;
          enemyArray = [monster];
        }
        else{
          for (var j = 0; j < res.monsters.length; j++) {
            if (res.monsters[j].name == monster.name) {
              res.monsters[j].count +=1;
              foundMonster = true;
            }
          }
          if (!foundMonster) {
            enemyArray = res.monsters;
            monster.count = 1;
            enemyArray.push(monster);
          } else {
            enemyArray = res.monsters;
          }
        }
        if(!addedMonster){
          user = this.getUserById(findUser.$key);
          user.update({
            monsters: enemyArray
          })
          addedMonster = true;
        }
      });
    });
  }

  addItem(item) {
    var user;
    var findUser
    var itemsArray=[]
    var addedItem = false
    var foundItem = false;
    this.getUserByEmail(this.loggedInUser).subscribe(response=>{
      findUser = response[0]
      this.getUserById(findUser.$key).subscribe(res => {
        if(res.treasure[0]==""){
          item.count = 1;
          itemsArray = [item];
        }
        else{
          for (var j = 0; j < res.treasure.length; j++) {
            if (res.treasure[j].name == item.name) {
              res.treasure[j].count +=1;
              foundItem = true;
            }
          }
          if (!foundItem) {
            itemsArray = res.treasure;
            item.count = 1;
            itemsArray.push(item);
          } else {
            itemsArray = res.treasure;
          }
        }
        if(!addedItem){
          user = this.getUserById(findUser.$key);
          user.update({
            treasure: itemsArray
          })
          addedItem = true;
        }
      });
    });
  }

  addUser(mail, name): void {

    console.log("addUser ran");
    this.users.push({
      displayName: name,
      email: mail,
      maps: [""],
      monsters: [""],
      treasure: [""],
      username: ""
    })


  }

}
