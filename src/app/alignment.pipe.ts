import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alignment',
  pure: false
})
export class AlignmentPipe implements PipeTransform {

  transform(input, args) {
    if(input){
      var filtered = [];
      for(var i = 0; i< input.length; i++){
        if(input[i].alignment === args.toLowerCase() || args=="All"){
          filtered.push(input[i])
        }
      }

      return filtered;
    }
  }

}
