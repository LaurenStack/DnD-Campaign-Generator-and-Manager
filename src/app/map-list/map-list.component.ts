import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.css'],
  providers: [UserService, AuthService]
})
export class MapListComponent implements OnInit {

  constructor(private UserService: UserService, private AuthService: AuthService, private Router:Router) { }
  myMaps;
  ngOnInit() {
    this.AuthService.af.auth.subscribe(
      (auth) => {
        if (auth) {
          this.UserService.getUserByEmail(auth.google.email).subscribe(res => {
            this.myMaps = res[0].maps;
          });
        }
    });
  }

  goToMap(e, i){
    console.log(i);
    e.preventDefault();
    let urlSegment = i.substring(i.lastIndexOf("/")+1);
    this.Router.navigate(['map', urlSegment]);
  }

  classId = -1;
  classIncrement(){
    this.classId++;
    return this.classId;
  }

}
