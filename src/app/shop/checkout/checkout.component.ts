import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import Swal from 'sweetalert2';
import { EnvironmentUrlService } from 'src/app/shared/services/enviroment-url.service';
import { UserService } from 'src/app/shared/services/user.service';
import { CheckoutService } from 'src/app/shared/services/checkout.service';

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
  public showSuccess: any;
  public showCancel: any;
  public showError: any;
  public conversionRate;
  public countryList = [];
  public totalAmount = 0;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  protected _env: EnvironmentUrlService;
  selectedItem = [];
  dropdownSettings: any = {};
  closeDropdownSelection = false;
  disabled = false;
  paymentMethodCheckedPaypal = true;

  constructor(
    private fb: FormBuilder,
    public productService: ProductService,
    injector: Injector,
    public userService: UserService,
    private orderService: OrderService,
    private checkoutService: CheckoutService
  ) {
    this.checkoutForm = this.fb.group({
      first_Name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      last_Name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Address: ['', [Validators.required, Validators.maxLength(50)]],
      Country: ['United Arab Emirates', Validators.required],
      DailCode: ['+971'],
      City: ['', Validators.required],
      State: ['', Validators.required],
      postalCode: ['', Validators.required],
      products: [[]]
    })

    this._env = injector.get(EnvironmentUrlService);
  }

  async ngOnInit() {
    await this.productService.cartItems.toPromise().then(response => {
      this.products = response;
    });
    await this.userService.getCurrency().toPromise().then((res: any) => {
      this.conversionRate = res.conversionRate;
    })
    await this.getTotal.toPromise().then(amount => {
      this.amount = amount;
      this.totalAmount = amount;
    });
    this.initConfig(this.totalAmount, this.products);
    this.countryList = this.checkoutService.countryList.filter(item => item.name);

    this.selectedItem = ['Pune'];
    this.dropdownSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownSelection
    };
  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  async onSubmit(orderDetails?, paymentStatus?) {
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
    let checkoutFormValue = this.checkoutForm.value;
    checkoutFormValue.phone = this.checkoutForm.value.DailCode + this.checkoutForm.value.phone;
    checkoutFormValue.Country = this.checkoutForm.value.Country.name ? this.checkoutForm.value.Country.name : this.checkoutForm.value.Country;

    // Checking if Payment is Paid by Paypal and sending Order Details in payload
    if (paymentStatus) {
      checkoutFormValue.paymentStatus = paymentStatus;
      checkoutFormValue.orderDetails = orderDetails;
    }

    // Setting Source
    checkoutFormValue.source = "web";

    this.orderService.createOrderAPI(checkoutFormValue).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Placed Order',
          showConfirmButton: false,
          timer: 1500
        });
        this.products = [];
        this.resetForm();
        this.productService.emptyCartAndProducts();
        window.location.reload();
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

  onPaymentMethodChange(value) {
    this.paymentMethodCheckedPaypal = !this.paymentMethodCheckedPaypal
  }

  telInputObject(obj) {
    console.log(obj);
    obj.setCountry('in');
  }
  onChange($event) {
    console.log({ name: '(change)', value: $event });

    this.checkoutForm.controls['DailCode'].setValue($event.dial_code)
  }

  onCountrySelected(index) {
    console.log("index: ", index)
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

  private initConfig(totalAmount, products): void {
    let items = [];
    for (let index = 0; index < products.length; index++) {
      const product = products[index];
      console.log("product: ", product)
      let template = {
        name: product.title,
        quantity: product.quantity,
        category: 'DIGITAL_GOODS',
        unit_amount: {
          currency_code: 'USD',
          value: product.sale ? product.quantity * product.skuArray[0].specialPrice : product.quantity * product.skuArray[0].price
        }
      };
      // template.unit_amount.value = parseFloat((template.unit_amount.value * this.conversionRate).toFixed(2));
      template.unit_amount.value = 0.50;

      items.push(template)
    }

    let totalAmountConverted = (totalAmount * this.conversionRate).toFixed(2);
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AWgt3OgWP7ItdA_tTGJNehvgTzF8ERGXHxB5ByQw-mQOrogFw6T5pf_EcoyDrfA8C4hl5LyE3HOQKpRc',
      createOrderOnClient: () => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            // This is actual amount
            // value: totalAmountConverted.toString(),
            value: "0.50",
            breakdown: {
              item_total: {
                currency_code: 'USD',
                // value: totalAmountConverted.toString()
                value: "0.50"
              }
            }
          },
          items: items
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
          this.onSubmit(details, true);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.showCancel = true;
      },
      onError: err => {
        console.log('OnError', err);
        this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        // this.resetStatus();
      },
    };
  }

  resetForm() {
    this.checkoutForm.reset();
    this.checkoutForm.controls['Country'].setValue('United Arab Emirates')
    this.checkoutForm.controls['DailCode'].setValue('+971')
  }
}
