import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../../classes/product';
import { Categories } from '../../data/constants';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public products: Product[] = [];
  public collapse: boolean = true;

  @Output() categoriesFilter  : EventEmitter<any> = new EventEmitter<any>();

  constructor(public productService: ProductService) {
    this.productService.getAllProductsAPI().subscribe((product: any) => this.products = product);
  }

  ngOnInit(): void {
  }

  appliedFilter(event) {
    let index = this.products.indexOf(event.target.value);  // checked and unchecked value
    if (event.target.checked)
      this.products.push(event.target.value); // push in array cheked value
    else
      this.products.splice(index, 1);  // removed in array unchecked value

    let colors = this.products.length ? { color: this.products.join(",") } : { color: null };
    this.categoriesFilter.emit(colors);
  }

  get filterbyCategory() {
    // const category = [...new Set(this.products.map(product => product.collections))]
    const category = Categories;
    return category
  }

  // check if the item are selected
  checked(item) {
    if (this.products.indexOf(item) != -1) {
      return true;
    }
  }
}