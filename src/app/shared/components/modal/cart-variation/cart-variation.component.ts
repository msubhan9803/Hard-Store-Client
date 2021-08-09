import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from "../../../services/product.service";
import { Product } from "../../../classes/product";

@Component({
  selector: 'app-cart-variation',
  templateUrl: './cart-variation.component.html',
  styleUrls: ['./cart-variation.component.scss']
})
export class CartVariationComponent implements OnInit, OnDestroy {

  @Input() direction: string = 'right'; // Default Direction Right

  public products: Product[] = [];
  public parsedProducts = [];
  public imageAddress = "";

  constructor(public productService: ProductService) {
    this.productService.cartItems.subscribe(response => {
      this.products = response
      this.imageAddress = this.productService.getImageUrl();

      this.products = response;
      this.recreateParsedProductList();
    });
  }

  ngOnInit(): void {
    this.imageAddress = this.productService.getImageUrl();
    this.productService.OpenCart = false;
  }

  public recreateParsedProductList() {
    this.parsedProducts = []
    for (let index = 0; index < this.products.length; index++) {
      const product: any = this.products[index];
      const variantIndex = product.variantIndex;

      let tempProduct = {
        _id: product._id,
        imageAddress: this.imageAddress + product.variants[variantIndex].imagesPreview[product.variants[variantIndex].isThumbnailImageIndex | 0],
        title: product.title,
        price: product.skuArray.filter(sku => sku.variantIndex == variantIndex)[0].price,
        quantity: product.quantity
      }

      console.log(tempProduct)

      this.parsedProducts.push(tempProduct);
    }
  }

  closeCart() {
    this.productService.OpenCart = false;
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  ngOnDestroy(): void {
    this.closeCart();
  }

}
