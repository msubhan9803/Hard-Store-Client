import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: Product[] = [];
  public imageAddress = "";
  public parsedProducts = [];
  @Input() currency: any = this.productService.Currency;
  public conversionRate;

  constructor(
    public productService: ProductService,
    public userService: UserService
  ) {
    this.productService.cartItems.subscribe(response => {
      this.imageAddress = this.productService.getImageUrl();

      this.products = response;
      this.recreateParsedProductList();
    });

    this.productService.storageSubObs.subscribe((data: string) => {
      if (localStorage.getItem("cartItems").length == 0) {
        console.log("cartItems: ", localStorage.getItem("cartItems"))
        this.products = [];
        this.parsedProducts = [];
      } else {
        // invokes when the localstorage is changed. 
        this.recreateParsedProductList();
      }
    })
  }

  async ngOnInit() {
    this.imageAddress = this.productService.getImageUrl();
      this.conversionRate = localStorage.getItem("hrdtkr_conversionRate")
  }

  public recreateParsedProductList() {
    console.log("============ recreateParsedProductList ==============")
    this.parsedProducts = []
    for (let index = 0; index < this.products.length; index++) {
      const product: any = this.products[index];
      console.log("product: ", product)
      const variantIndex = product.variantIndex;
      console.log("variantIndex: ", variantIndex)

      let tempProduct = {
        _id: product._id,
        imageAddress: this.imageAddress + product.variants[variantIndex].imagesPreview[product.variants[variantIndex].isThumbnailImageIndex],
        title: product.title,
        sale: product.sale,
        price: product.skuArray.filter(sku => sku.variantIndex == variantIndex)[0].price,
        specialPrice: product.skuArray.filter(sku => sku.variantIndex == variantIndex)[0].specialPrice,
        quantity: product.quantity
      }

      this.parsedProducts.push(tempProduct);
    }
    console.log("this.parsedProducts: ", this.parsedProducts)
  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  public recalculateTotal(index) {
    this.productService.updateCartQuantity(this.products[index], index, this.products[index].quantity);
  }

  // Increament
  // increment(product, qty = 1) {
  //   this.productService.updateCartQuantity(product, qty);
  // }
  increment(index, qty = 1) {
    this.productService.updateCartQuantity(this.products[index], index, qty);
  }

  // Decrement
  // decrement(product, qty = -1) {
  //   this.productService.updateCartQuantity(product, qty);
  // }
  decrement(index, qty = -1) {
    this.productService.updateCartQuantity(this.products[index], index, qty);
  }

  public removeItem(index: any) {
    this.productService.removeCartItem(index);
  }

  getThumbnailImage(product) {
    let url = product.images.find(img => img.IsThmubnail == true).URL;
    return this.imageAddress + url;
  }
}
