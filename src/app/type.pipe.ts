import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {

  transform(input, args) {
    if(input){
      var filtered = [];
      for(var i = 0; i< input.length; i++){
        if(input[i].type === args || args=="All"){
          filtered.push(input[i]);
        }
      }

      return filtered;
    }
  }

}
