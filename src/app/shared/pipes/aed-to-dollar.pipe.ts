import { CurrencyPipe } from '@angular/common';
import { OnInit, Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../services/user.service';

@Pipe({
  name: 'aedToDollar'
})
export class AedToDollarPipe implements PipeTransform {

  constructor(
    private userService: UserService,
    private currencyPipe: CurrencyPipe
  ) { }

  transform(value: string, conversionRate = 0) {
    let price = "";
    price = value.replace("AED", "");
    if (value.length > 7) {
      price = price.replace(",", "");
    }

    // console.log("with comma: ", this.formatNumberToCurrency((conversionRate * parseFloat(price)).toFixed(2)))

    return conversionRate ? `($${this.formatNumberToCurrency((conversionRate * parseFloat(price)).toFixed(2))})` : " ";
  }

  formatNumberToCurrency(value) {
    // return this.currencyPipe.transform(value, 'Rs');
    return this.currencyPipe.transform(value, 'Rs', "");
  }
}
