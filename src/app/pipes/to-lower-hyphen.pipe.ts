import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toLowerHyphen'
})
export class ToLowerHyphenPipe implements PipeTransform {

  transform(value: string): string {
    if (value !== null) {
      return value.toLowerCase().replace(/\s+/g, '-');
    }
  }
}
