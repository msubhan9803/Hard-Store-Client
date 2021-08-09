import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: Product[] = [];
  public imageAddress = "";
  public parsedProducts = [];

  constructor(
    public productService: ProductService
  ) {
    this.productService.cartItems.subscribe(response => {
      this.imageAddress = this.productService.getImageUrl();

      this.products = response;
      this.recreateParsedProductList();
    });

    this.productService.storageSubObs.subscribe((data: string) => {
      // invokes when the localstorage is changed. 
      this.recreateParsedProductList();
    })
  }

  ngOnInit(): void {
    this.imageAddress = this.productService.getImageUrl();
  }

  public recreateParsedProductList() {
    this.parsedProducts = []
    for (let index = 0; index < this.products.length; index++) {
      const product: any = this.products[index];
      const variantIndex = product.variantIndex;

      let tempProduct = {
        _id: product._id,
        imageAddress: this.imageAddress + product.variants[index].imagesPreview[product.variants[index].isThumbnailImageIndex | 0],
        title: product.title,
        price: product.skuArray.filter(sku => sku.variantIndex == variantIndex)[0].price,
        quantity: product.quantity
      }

      console.log(tempProduct)

      this.parsedProducts.push(tempProduct);
    }
  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  // Increament
  // increment(product, qty = 1) {
  //   this.productService.updateCartQuantity(product, qty);
  // }
  increment(index, qty = 1) {
    this.productService.updateCartQuantity(this.products[index], qty);
  }

  // Decrement
  // decrement(product, qty = -1) {
  //   this.productService.updateCartQuantity(product, qty);
  // }
  decrement(index, qty = -1) {
    this.productService.updateCartQuantity(this.products[index], qty);
  }

  public removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

}
