import { Component, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { Collections } from '../../data/constants';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  public products: Product[] = [];
  public collapse: boolean = true;

  constructor(public productService: ProductService) { 
    this.productService.getAllProductsAPI().subscribe((product: any) => this.products = product);
  }

  ngOnInit(): void {
  }

  get filterbyCategory() {
    // const category = [...new Set(this.products.map(product => product.collections))]
    const category = Collections;
    return category
  }

}
