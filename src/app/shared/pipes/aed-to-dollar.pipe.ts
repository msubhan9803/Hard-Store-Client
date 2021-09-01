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
    let price = parseFloat(value.replace("AED", ""))

    // return conversionRate? `${value} ($${(conversionRate * price).toFixed(2)})` : " ";
    return conversionRate? `($${(conversionRate * price).toFixed(2)})` : " ";
  }
}
