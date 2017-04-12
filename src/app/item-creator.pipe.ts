import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemCreator',
  pure: false
})
export class ItemCreatorPipe implements PipeTransform {

  transform(input, arg, arg2) {
    if(input){
      var filtered = [];
      for(var i = 0; i< input.length; i++){
        if(arg==false){
          filtered.push(input[i]);
        }else if(arg == true){
          if(arg2 == input[i].creator){
            filtered.push(input[i]);
          }
        }
      }

      return filtered;
    }
  }

}
