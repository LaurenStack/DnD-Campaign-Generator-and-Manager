import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class UserService {
  users: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
    this.users = angularFire.database.list('users');
  }

  getUsers() {
    return this.users;
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

}
