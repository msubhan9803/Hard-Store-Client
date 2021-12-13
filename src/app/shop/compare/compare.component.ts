import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  public products: Product[] = [];
  public imageAddress = "";

  constructor(private router: Router, 
    public productService: ProductService) {
    this.productService.compareItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
    this.imageAddress = this.productService.getImageUrl();
  }

  async addToCart(product: any) {
    let quantity = 1;
    const status = await this.productService.addToCart(product, quantity);
    // if(status) {
    //   this.router.navigate(['/shop/cart']);
    // }
  }

  removeItem(product: any) {
    this.productService.removeCompareItem(product);
  }

}
