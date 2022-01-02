import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-header-five',
  templateUrl: './header-five.component.html',
  styleUrls: ['./header-five.component.scss']
})
export class HeaderFiveComponent implements OnInit {
  public searchValueInput = this.getProductTitle();
  public searchValue = new Subject<string>();
  public productList = [];
  public searchValueError = false;

  public productList$ = this.searchValue.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    switchMap(searchValue => this.productService.searchFaq(searchValue))
  );

  constructor(
    private router: Router,
    private productService: ProductService
  ) {
    // this.productService.storageSubObs.subscribe((data: string) => {
    //   console.log("product title: ", this.getProductTitle())
    // })
  }

  ngOnInit(): void {
    this.productList$.subscribe((res: []) => this.productList = res)
  }

  getProductTitle() {
    return JSON.parse(localStorage.getItem("hrdtkr_product_title"));
  }

  setSearchProductTitle(searchValue) {
    this.productService.updateProductTitleFilter(searchValue);
  }

  clearProductTitle() {
    localStorage.setItem("hrdtkr_product_title", JSON.stringify(""));
    this.searchValueInput = this.getProductTitle();
    window.location.reload();
  }

  searchProducts() {
    let pathName = window.location.pathname;
    let searchValue = this.searchValueInput;
    this.setSearchProductTitle(searchValue);

    if (pathName != "/products") {
      this.router.navigate(['/products']);
      return;
    }

    window.location.reload();
  }

  updateProudctList(faqType) {
    this.productService.getFaqsByType(faqType).subscribe(
      (res: []) => {
        this.productList = res;
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  navigateToRoot() {
    this.router.navigate(['/']);
  }
}
