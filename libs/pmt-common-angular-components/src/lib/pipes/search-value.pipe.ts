/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pmtSearchValue',
  pure: true,
})
export class PmtSearchValuePipe implements PipeTransform {
  transform(values: any[], searchKey: string, searchValue: string): any[] {
    if (searchValue) {
      return values.filter((value) =>
        `${value[searchKey]}`.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return values;
  }
}
