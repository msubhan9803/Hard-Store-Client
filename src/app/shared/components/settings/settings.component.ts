import { Component, OnInit, Injectable, PLATFORM_ID, Inject, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../classes/product";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public products: Product[] = [];
  public search: boolean = false;
  public parsedProducts = [];
  public imageAddress = "";
  public conversionRate;
  @Input() currency: any = this.productService.Currency;

  public languages = [{
    name: 'English',
    code: 'en'
  }, {
    name: 'French',
    code: 'fr'
  }];

  public currencies = [{
    name: 'Euro',
    currency: 'EUR',
    price: 0.90 // price of euro
  }, {
    name: 'Rupees',
    currency: 'INR',
    price: 70.93 // price of inr
  }, {
    name: 'Pound',
    currency: 'GBP',
    price: 0.78 // price of euro
  }, {
    name: 'Dollar',
    currency: 'USD',
    price: 1 // price of usd
  }]

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,public userService: UserService,
    public productService: ProductService) {
    this.productService.cartItems.subscribe(response => {
      this.products = response;

      this.imageAddress = this.productService.getImageUrl();

      this.products = response;
      this.recreateParsedProductList();
    });

    this.productService.storageSubObs.subscribe((data: string) => {
      if (localStorage.getItem("cartItems").length == 0) {
        this.products = [];
      }

      // invokes when the localstorage is changed. 
      this.recreateParsedProductList();
    })
  }

  async ngOnInit() {
    await this.userService.getCurrency().toPromise().then((res: any) => {
      this.conversionRate = res.conversionRate;
    })
  }

  public recreateParsedProductList() {
    this.parsedProducts = []
    for (let index = 0; index < this.products.length; index++) {
      const product: any = this.products[index];
      const variantIndex = product.variantIndex;

      let tempProduct = {
        _id: product._id,
        imageAddress: this.imageAddress + product.variants[variantIndex].imagesPreview[product.variants[variantIndex].isThumbnailImageIndex],
        title: product.title,
        price: product.skuArray.filter(sku => sku.variantIndex == variantIndex)[0].price,
        quantity: product.quantity
      }

      this.parsedProducts.push(tempProduct);
    }
  }

  searchToggle() {
    this.search = !this.search;
  }

  changeLanguage(code) {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(code)
    }
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItem(index: any) {
    console.log(`Ts file Delete product at Index ${index}`)
    this.productService.removeCartItem(index);
  }

  changeCurrency(currency: any) {
    this.productService.Currency = currency
  }

}
