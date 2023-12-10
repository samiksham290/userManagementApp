import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchFilter' })
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], filterQuery: string): any[] {
    if (!items) {
      return [];
    }
    if (!filterQuery) {
      return items;
    }
    return items.filter((item) => {
      return item.name.toLowerCase().includes(filterQuery.toLowerCase());
    });
  }
}