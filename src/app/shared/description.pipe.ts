import {Pipe, PipeTransform} from '@angular/core';
import {KeyText} from '../core/models/key-text';

@Pipe({
  name: 'description'
})
export class DescriptionPipe implements PipeTransform {

  transform(id: number, args: KeyText<number>[]): any {
    if (id) {
      const result = args.find(i => i.id === id);
      if (result != null) {
        return result.text;
      }
    }
    return 'Unknown';
  }

}
