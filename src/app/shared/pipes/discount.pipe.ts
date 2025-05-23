import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const price = args.discount ? args?.price - args?.discount : args.price;
    return price
  }

}
