import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UserService } from './../user.service';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  users: FirebaseListObservable<any[]>;
  loggedInUser: any;

  constructor(private http: Http, private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.authService.af.auth.subscribe(
      (auth) => {
        if (auth) {
          this.userService.getUserByEmail(auth.google.email).subscribe(res => {
            this.loggedInUser = res[0];
            // this.userService.setLoggedInUser(res[0]);
          });

        }
        //don't uncomment
        //  this.http.get('http://www.dnd5eapi.co/api/equipment/').subscribe(data =>
        //   {
        //     console.log(data.json());
        //     var obj = data.json();
        //     obj.results.forEach( elem=>{
        //       this.http.get(elem.url).subscribe(data => {
        //         console.log(data.json())
        //         var monster = data.json();
        //         this.userService.scrapeMonsters(monster);
        //       });
        //     })
        //   });


        //don't uncomment


    }
    )
  }

  goTo(location: string): void{
    window.location.hash = location;
  }

}
