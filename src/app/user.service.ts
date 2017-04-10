import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class UserService {
  users: FirebaseListObservable<any[]>;
  monsters: FirebaseListObservable<any[]>;
  loggedInUser: any;

  constructor(private angularFire: AngularFire) {
    this.users = angularFire.database.list('users');
    this.monsters = angularFire.database.list('monsters');
  }

  getUsers() {
    return this.users;
  }

  logUser(){
    console.log(this.loggedInUser)
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

  getAllMonsters() {
    return this.monsters;
  }

  addMonster(monster) {
    var user;
    var findUser
    var enemies
    var enemyArray=[]
    var addedMonster = false
    this.getUserByEmail(this.loggedInUser).subscribe(response=>{
      findUser = response[0]
      this.getUserById(findUser.$key).subscribe(res => {
        if(res.monsters[0]==""){
          enemyArray = [monster];
        }
        else{
          enemyArray = res.monsters;
          enemyArray.push(monster);
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
