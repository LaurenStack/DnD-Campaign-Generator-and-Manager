import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemsAdded',
  pure: false
})
export class ItemsAddedPipe implements PipeTransform {

  transform(input, arg, arg2) {
    if(input){
      var filtered = [];
      for(var i = 0; i< input.length; i++){
        if(arg== false){
          filtered.push(input[i]);
        }else{
          if(arg2[0]){
            for (var j = 0; j < arg2.length;j++) {
              if (arg2[j].name == input[i].name) {
                filtered.push(input[i]);
              }

            }
          }
        }
      }

      return filtered;
    }
  }

}
