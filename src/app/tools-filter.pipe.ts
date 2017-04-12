import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toolsFilter',
  pure: false
})
export class ToolsFilterPipe implements PipeTransform {

  transform(input, args) {
    if(input){
      var filtered = [];
      for(var i = 0; i< input.length; i++){
        if(input[i].subtype === args || args=="All"){
          filtered.push(input[i]);
        }
      }

      return filtered;
    }
  }

}
