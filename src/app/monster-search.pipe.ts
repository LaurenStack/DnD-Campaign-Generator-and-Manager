import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monsterSearch'
})
export class MonsterSearchPipe implements PipeTransform {

  transform(input, arg) {
    if(input){
      var filtered = [];
      for(var i = 0; i< input.length; i++){
        var search = arg.toLowerCase();
        var value = input[i].name.toLowerCase()
        if(value.indexOf(search)>=0 || arg == ""){
          filtered.push(input[i]);
        }
      }

      return filtered;
    }
  }

}
