import { OnInit, Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../services/user.service';

@Pipe({
  name: 'aedToDollar'
})
export class AedToDollarPipe implements PipeTransform {

  constructor(
    private userService: UserService
  ) { }

  transform(value: string, conversionRate = 0) {
    let price = "";
    price = value.replace("AED", "");
    if (value.length > 7) {
      price = price.replace(",", "");
    }

    return conversionRate ? `($${(conversionRate * parseFloat(price)).toFixed(2)})` : " ";
  }
}
