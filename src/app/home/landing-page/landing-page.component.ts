import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  public categories = [];

  constructor(private productService: ProductService) {
    localStorage.setItem("hrdtkr_minPrice_filter", JSON.stringify(0));
    localStorage.setItem("hrdtkr_maxPrice_filter", JSON.stringify(1000));
    localStorage.setItem("hrdtkr_product_title", JSON.stringify(""));
    localStorage.setItem("hrdtkr_collections_filter", JSON.stringify([]));
  }

  ngOnInit(): void {
    this.productService.getCategories().subscribe((res: []) => {
      this.categories = res;
    })
  }

}
