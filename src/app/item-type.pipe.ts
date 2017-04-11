import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemType',
  pure: false
})
export class ItemTypePipe implements PipeTransform {

  transform(input, args) {
    if(input){
      var filtered = [];
      for(var i = 0; i< input.length; i++){
        if(input[i].type === args || args=="all"){
          filtered.push(input[i]);
        }
      }

      return filtered;
    }
  }

}
