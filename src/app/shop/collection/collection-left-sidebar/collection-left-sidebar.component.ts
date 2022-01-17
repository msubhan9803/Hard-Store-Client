import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from "../../../shared/services/product.service";
import { Product } from '../../../shared/classes/product';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-collection-left-sidebar',
  templateUrl: './collection-left-sidebar.component.html',
  styleUrls: ['./collection-left-sidebar.component.scss']
})
export class CollectionLeftSidebarComponent implements OnInit, OnDestroy {

  public grid: string = 'col-xl-3 col-md-6';
  public layoutView: string = 'grid-view';
  public products: Product[] = [];
  public brands: any[] = [];
  public colors: any[] = [];
  public size: any[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 100000;
  public tags: any[] = [];
  public categoryName: string;
  public pageNo: number = 1;
  public paginate: any = {}; // Pagination use only
  public sortBy: string; // Sorting Order
  public mobileSidebar: boolean = false;
  public loader: boolean = true;
  public categories = [];
  public selectedCategories = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productService: ProductService
  ) {
    // Get Query params..
    this.route.queryParams.subscribe(params => {
      // this.brands = params.brand ? params.brand.split(",") : [];
      // this.colors = params.color ? params.color.split(",") : [];
      // this.size = params.size ? params.size.split(",") : [];
      // this.minPrice = params.minPrice ? params.minPrice : this.minPrice;
      // this.maxPrice = params.maxPrice ? params.maxPrice : this.maxPrice;
      // this.tags = [...this.brands, ...this.colors, ...this.size]; // All Tags Array

      this.categoryName = params.categoryName ? params.categoryName : null;
      this.sortBy = params.sortBy ? params.sortBy : 'ascending';
      this.pageNo = params.page ? params.page : this.pageNo;

      // Get Filtered Products..
      // this.productService.getAllProductsAPI().subscribe((response: any) => {
      // })

      this.getFilteredProducts().then(filteredProeducts => {
        if (this.productService.getFilterCategories().length > 0) {
          this.products = filteredProeducts;
        }
        this.products = this.productService.sortProducts(this.products, this.sortBy);
        this.paginate = this.productService.getPager(this.products.length, +this.pageNo);     // get paginate object from service
        this.products = this.products.slice(this.paginate.startIndex, this.paginate.endIndex + 1); // get current page of items
      })

      this.productService.storageSubObs.subscribe((data: string) => {
        this.getFilteredProducts().then(res => this.products = res)
      })
    })
  }
  
  ngOnDestroy() {
    this.productService.clearFilterCategories();
    this.productService.clearFilterCollection();
  }

  async ngOnInit() {
    await this.productService.getCategories().subscribe((res: []) => {
      this.categories = res;
    });
  }

  // Append filter value to Url
  updateFilter(tags: any) {
    tags.page = null; // Reset Pagination
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: tags,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Append filter value to Url
  updatePriceFilter(priceObj: any) {
    this.productService.setPriceFilter(priceObj);
  }

  // SortBy Filter
  sortByFilter(value) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortBy: value ? value : null },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Remove Tag
  removeTag(tag) {

    this.brands = this.brands.filter(val => val !== tag);
    this.colors = this.colors.filter(val => val !== tag);
    this.size = this.size.filter(val => val !== tag);

    let params = {
      brand: this.brands.length ? this.brands.join(",") : null,
      color: this.colors.length ? this.colors.join(",") : null,
      size: this.size.length ? this.size.join(",") : null
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Clear Tags
  removeAllTags() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // product Pagination
  setPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Change Grid Layout
  updateGridLayout(value: string) {
    this.grid = value;
  }

  // Change Layout View
  updateLayoutView(value: string) {
    this.layoutView = value;
    if (value == 'list-view')
      this.grid = 'col-lg-12';
    else
      this.grid = 'col-xl-3 col-md-6';
  }

  // Mobile sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

  getCategoryData(categoryName) {
    return this.categories.find(category => category.CategoryName == categoryName);
  }

  getFilteredProducts() {
    return this.productService.getFilterProducts();
  }

  navigateToProductsPage() {
    this.productService.resetFilterLocalStorage();
    window.location.href = "/products";
  }
}