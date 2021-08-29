import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public checkoutForm: FormGroup;
  public products: Product[] = [];
  public payPalConfig?: IPayPalConfig;
  public payment: string = 'Stripe';
  public amount: any;

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  constructor(
    private fb: FormBuilder,
    public productService: ProductService,
    private orderService: OrderService
  ) {
    this.checkoutForm = this.fb.group({
      first_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      last_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      Email: ['', [Validators.required, Validators.email]],
      Address: ['', [Validators.required, Validators.maxLength(50)]],
      Country: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      postalCode: ['', Validators.required],
      products: [[]]
    })
  }

  ngOnInit(): void {
    this.productService.cartItems.subscribe(response => {
      this.products = response;
    });
    this.getTotal.subscribe(amount => this.amount = amount);
    this.initConfig();
  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  async onSubmit() {
    console.log("payload: ", this.checkoutForm.value)

    if (this.checkoutForm.invalid) return;

    for (let index = 0; index < this.products.length; index++) {
      let currentProduct = this.products[index];

      let product = {
        product_name: currentProduct.title,
        product_Id: currentProduct._id,
        unit_Cost: currentProduct.skuArray[0].price,
        quantity: currentProduct.quantity,
        discount: currentProduct.skuArray[0].specialPrice,
        amount: currentProduct.quantity * currentProduct.skuArray[0].price
      }

      this.checkoutForm.value.products.push(product)
    }

    let payload = this.checkoutForm.value;
    await this.getTotal.subscribe(res => payload.totalAmount = res);

    this.orderService.createOrderAPI(this.checkoutForm.value).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Placed Order',
          showConfirmButton: false,
          timer: 1500
        });
        this.checkoutForm.reset();
        this.products = [];
        this.productService.emptyCartAndProducts();
        // window.location.reload();
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Internal Server Error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    )
  }

  // Stripe Payment Gateway
  stripeCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripe_token, // publishble key
      locale: 'auto',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        this.orderService.createOrder(this.products, this.checkoutForm.value, token.id, this.amount);
      }
    });
    handler.open({
      name: 'Multikart',
      description: 'Online Fashion Store',
      amount: this.amount * 100
    })
  }

  // Paypal Payment Gateway
  private initConfig(): void {
    this.payPalConfig = {
      currency: this.productService.Currency.currency,
      clientId: environment.paypal_token,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: this.productService.Currency.currency,
            value: this.amount,
            breakdown: {
              item_total: {
                currency_code: this.productService.Currency.currency,
                value: this.amount
              }
            }
          }
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        size: 'small', // small | medium | large | responsive
        shape: 'rect', // pill | rect
      },
      onApprove: (data, actions) => {
        this.orderService.createOrder(this.products, this.checkoutForm.value, data.orderID, this.getTotal);
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }

}
