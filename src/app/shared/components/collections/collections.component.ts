import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  public collections = [];
  public collapse: boolean = true;

  constructor(
    public productService: ProductService
  ) {
    this.collections = Collections;
  }

  async ngOnInit() {
  }

  appliedFilter(event, collection) {
    this.productService.updateFilterCollection(collection);
  }

  get filterbyCollection() {
    // const collection = [...new Set(this.products.map(product => product.collections))]
    // const collection = Categories;
    const collection = this.collections;
    return collection
  }

  // check if the item are selected
  checked(item: any) {
    let temp = JSON.parse(this.productService.getFilterCollection()) || [];
    return temp.includes(item);
  }
}