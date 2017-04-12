import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weaponFilter',
  pure: false
})
export class WeaponFilterPipe implements PipeTransform {

  transform(input, args) {
    if(input){
      var filtered = [];
      for(var i = 0; i< input.length; i++){
        if(input[i].category_range === args || args=="All"){
          filtered.push(input[i]);
        }
      }

      return filtered;
    }
  }

}
