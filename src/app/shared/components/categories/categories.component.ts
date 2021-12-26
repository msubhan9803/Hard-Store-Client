import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  public categories = [];
  public collapse: boolean = true;
  @Input() categoryName;

  @Output() categoriesFilter: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public productService: ProductService
  ) {
    this.productService.getAllProductsAPI().subscribe((product: any) => this.products = product);
    this.productService.getCategories().subscribe((res: []) => {
      this.categories = res;
    });
  }

  async ngOnInit() {
  }

  appliedFilter(event, category) {
    this.productService.updateFilterCategory(category.CategoryName);

    // let index = this.products.indexOf(event.target.value);  // checked and unchecked value
    // if (event.target.checked)
    //   this.products.push(event.target.value); // push in array cheked value
    // else
    //   this.products.splice(index, 1);  // removed in array unchecked value
  }

  get filterbyCategory() {
    // const category = [...new Set(this.products.map(product => product.collections))]
    // const category = Categories;
    const category = this.categories;
    return category
  }

  // check if the item are selected
  checked(item: any) {
    let temp = JSON.parse(this.productService.getFilterCategories()) || [];
    return temp.includes(item.CategoryName);
  }
}