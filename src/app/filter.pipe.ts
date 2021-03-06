import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /////////////////////////////////////////////////////////////////////////////////////////////
  // transform(items: any[], searchText: string): any[] {
  //   if (!items) return [];
  //   if (!searchText) return items;
  //   searchText = searchText.toLowerCase();
  //   return items.filter(it => {
  //       return it.toLowerCase().includes(searchText);
  //   });
  // }


  //////////////////////////////////////////////////////////////////////////////////
  // transform(items: any, filter: any, defaultFilter: boolean): any {
  //   if (!filter){
  //     return items;
  //   }

  //   if (!Array.isArray(items)){
  //     return items;
  //   }

  //   if (filter && Array.isArray(items)) {
  //     let filterKeys = Object.keys(filter);

  //     if (defaultFilter) {
  //       return items.filter(item =>
  //           filterKeys.reduce((x, keyName) =>
  //               (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "", true));
  //     }
  //     else {
  //       return items.filter(item => {
  //         return filterKeys.some((keyName) => {
  //           return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
  //         });
  //       });
  //     }
  //   }
  // }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }
    return items.filter(singleItem =>
      singleItem[field].toLowerCase().includes(value.toLowerCase())
    );
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // transform(items: Array<any>, filter: {[key: string]: any }): Array<any> {
  //   return items.filter(item => {
  //       let notMatchingField = Object.keys(filter)
  //                                    .find(key => item[key] !== filter[key]);

  //       return !notMatchingField; // true if matches all fields
  //   });
  //}
}
