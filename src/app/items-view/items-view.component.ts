import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.css']
})
export class ItemsViewComponent implements OnInit {
  items: FirebaseListObservable<any[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.items = this.userService.getAllItems();
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
  }

  goTo(location: string): void{
    window.location.hash = location;
  }

}
