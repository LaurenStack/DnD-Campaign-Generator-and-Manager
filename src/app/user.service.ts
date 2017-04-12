import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';



@Injectable()
export class UserService {
  users: FirebaseListObservable<any[]>;
  monsters: FirebaseListObservable<any[]>;
  terrainArray: FirebaseListObservable<any[]>;
  items: FirebaseListObservable<any[]>;
  loggedInUser: any;

  constructor(private angularFire: AngularFire) {
    this.users = angularFire.database.list('users');
    this.monsters = angularFire.database.list('monsters');
    this.terrainArray = angularFire.database.list('terrain');
  }

  getUsers() {
    return this.users;
  }
  getTerrain() {
    return this.terrainArray;
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

  findUserMonsters() {
    this.getUserByEmail(this.loggedInUser).subscribe(res => {
      console.log(res[0].monsters);
      return res[0].monsters;
      // return this.getUserById(user.$key);
    })
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

  saveMap(name,rooms, grid){
    var hasRun = false;
    var map = {
      name: name,
      rooms: rooms,
      grid: grid
    }
    var user;
    var findUser;
    var subscription = this.getUserByEmail(this.loggedInUser).subscribe(response=>{
      findUser = response[0];
      user = this.getUserById(findUser.$key);
      if(findUser.maps[0] === ""){
        findUser.maps = [];
      }
      findUser.maps.push(map);
      user.update({maps:findUser.maps});
      subscription.unsubscribe();
    });
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
      username: "",
      charOne: {
        name: "",
        type: "",
        health: 10,
        description: "",
        armorWeapons: "",
        copper: 0,
        silver: 0,
        gold: 0,
        platinum: 0
      },
      charTwo: {
        name: "",
        type: "",
        health: 10,
        description: "",
        armorWeapons: "",
        copper: 0,
        silver: 0,
        gold: 0,
        platinum: 0
      },
      charThree: {
        name: "",
        type: "",
        health: 10,
        description: "",
        armorWeapons: "",
        copper: 0,
        silver: 0,
        gold: 0,
        platinum: 0
      },
      charFour: {
        name: "",
        type: "",
        health: 10,
        description: "",
        armorWeapons: "",
        copper: 0,
        silver: 0,
        gold: 0,
        platinum: 0
      }
    })
  }

  createMonster(newMonster) {
    this.getUserByEmail(this.loggedInUser).subscribe(res=>{

      newMonster.creator = res[0].displayName;
      this.monsters.push(newMonster);
    })
  }

  createItem(newItem) {
    this.getUserByEmail(this.loggedInUser).subscribe(res=>{

      newItem.creator = res[0].displayName;
      this.items.push(newItem);
    })
  }

  updateCharOne(characterObject) {
    this.getUserByEmail(this.loggedInUser).subscribe(res => {
      var userInFirebase = res[0];
      var currentUser = this.getUserById(userInFirebase.$key);
      currentUser.update({
        charOne: characterObject
      });

    });
  }
  updateCharTwo(characterObject) {
    this.getUserByEmail(this.loggedInUser).subscribe(res => {
      var userInFirebase = res[0];
      var currentUser = this.getUserById(userInFirebase.$key);
      currentUser.update({
        charTwo: characterObject
      });

    });
  }
  updateCharThree(characterObject) {
    this.getUserByEmail(this.loggedInUser).subscribe(res => {
      var userInFirebase = res[0];
      var currentUser = this.getUserById(userInFirebase.$key);
      currentUser.update({
        charThree: characterObject
      });

    });
  }
  updateCharFour(characterObject) {
    this.getUserByEmail(this.loggedInUser).subscribe(res => {
      var userInFirebase = res[0];
      var currentUser = this.getUserById(userInFirebase.$key);
      currentUser.update({
        charFour: characterObject
      });

    });
  }

  updateMonster(monstersArray, userKey) {
    var subscription = this.getUserByEmail(this.loggedInUser).subscribe(res => {
      var userInFirebase = res[0];
      var currentUser = this.getUserById(userKey);
      currentUser.update({
        monsters: monstersArray
      });

      subscription.unsubscribe();
    });
  }

  updateItem(itemsArray, userKey) {
    var subscription = this.getUserByEmail(this.loggedInUser).subscribe(res => {
      var userInFirebase = res[0];
      var currentUser = this.getUserById(userKey);
      currentUser.update({
        treasure: itemsArray
      });

      subscription.unsubscribe();
    });
  }

}
